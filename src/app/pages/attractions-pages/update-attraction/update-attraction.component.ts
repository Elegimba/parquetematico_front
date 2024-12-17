import { Component, inject, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AttractionsService } from '../../../services/attractions.service';
import { Router, RouterLink } from '@angular/router';
import { IAttraction } from '../../../interfaces/iattraction.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-attraction',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './update-attraction.component.html',
  styleUrl: './update-attraction.component.css'
})
export class UpdateAttractionComponent {

  @Input() attractionId: number = 0;

  arrErrors: { field: string, message: string }[] = [];
  files: any;

  attractionsService = inject(AttractionsService);
  router = inject(Router);

  attraction: IAttraction | null = null;

  async ngOnInit() {
    try {
      this.attraction = await this.attractionsService.getById(this.attractionId);
      this.formulario.setValue({
        name: this.attraction.name,
        capacity: this.attraction.capacity,
        min_height: this.attraction.min_height,
        average_duration: this.attraction.average_duration,
        wait_time: this.attraction.wait_time,
        functional: this.attraction.functional
      });
    } catch (error) {
      console.log(error);
    }
  }

  formulario: FormGroup = new FormGroup({
    name: new FormControl(),
    capacity: new FormControl(),
    min_height: new FormControl(),
    average_duration: new FormControl(),
    wait_time: new FormControl(),
    functional: new FormControl()
  })

  async onSubmit() {
    const confirm = await Swal.fire({ title: 'Confirmar', text: '¿Guardar los cambios?', icon: 'question', confirmButtonText: 'Confirmar', showCancelButton: true });
    if(confirm.isConfirmed) {
      try {
        let fd = new FormData();
        Object.entries(this.formulario.value).forEach(([key, value]) => {
          if(value !== null && value !== undefined) {
            fd.append(key, value.toString());
          }
        });
        if(this.files?.[0]) {
          fd.append('image', this.files[0]);
        }
        const updated = await this.attractionsService.updateById(this.attractionId, fd);
        Swal.fire('Hecho', 'Los datos de la atracción se han actualizado', 'success');
        this.router.navigateByUrl(`attractions/details/${this.attractionId}`);
        console.log(updated)
      } catch ({ error }: any) {
        console.log(error);
        this.arrErrors = error;
      }
    }
  }

  onChange($event: any) {
    this.files = $event.target.files;
  }

}
