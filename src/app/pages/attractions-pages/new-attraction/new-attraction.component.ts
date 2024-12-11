import { Component, inject, Input } from '@angular/core';
import { AttractionsService } from '../../../services/attractions.service';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-attraction',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './new-attraction.component.html',
  styleUrl: './new-attraction.component.css'
})
export class NewAttractionComponent {

  arrErrors: { field: string, message: string }[] = [];

  attractionsService = inject(AttractionsService);

  router = inject(Router);

  formulario: FormGroup = new FormGroup({
    name: new FormControl(),
    capacity: new FormControl(),
    min_height: new FormControl(),
    average_duration: new FormControl(),
    wait_time: new FormControl(),
    functional: new FormControl(false)
  })

  async onSubmit() {
    const confirm = await Swal.fire({ title: 'Confirmar', text: 'Se añadirá una nueva atracción a la base de datos', icon: 'info', confirmButtonText: 'Confirmar', showCancelButton: true });

    if(confirm.isConfirmed) {
      try {
        const newAtt = await this.attractionsService.create(this.formulario.value);
        Swal.fire('Hecho', 'La nueva atracción se ha añadido al parque', 'success');
        this.router.navigateByUrl(`attractions/details/${newAtt.id}`);
      } catch ({error}: any) {
        console.log(error);
        this.arrErrors = error;
      }
    }
  }

}
