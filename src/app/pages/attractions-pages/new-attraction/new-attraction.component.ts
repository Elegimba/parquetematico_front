import { Component, inject, Input } from '@angular/core';
import { AttractionsService } from '../../../services/attractions.service';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
  files: any = [];

  attractionsService = inject(AttractionsService);

  router = inject(Router);

  formulario: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    capacity: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
    min_height: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
    average_duration: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
    wait_time: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
    functional: new FormControl(false)
  })

  async onSubmit() {
    if (this.formulario.valid && this.files.length > 0) {
      const confirm = await Swal.fire({ title: 'Confirmar', text: 'Se añadirá una nueva atracción a la base de datos', icon: 'info', confirmButtonText: 'Confirmar', showCancelButton: true });

      try {

        if (confirm.isConfirmed) {
          let fd = new FormData();
          fd.append('image', this.files[0]);
          fd.append('name', this.formulario.value.name);
          fd.append('capacity', this.formulario.value.capacity);
          fd.append('min_height', this.formulario.value.min_height);
          fd.append('average_duration', this.formulario.value.average_duration);
          fd.append('wait_time', this.formulario.value.wait_time);
          fd.append('functional', this.formulario.value.functional);
          const newAtt = await this.attractionsService.create(fd);
          Swal.fire('Hecho', 'La nueva atracción se ha añadido al parque', 'success');
          this.router.navigateByUrl(`attractions/details/${newAtt.id}`);
        }
      }
      catch (error: any) {
        console.log(error)
        this.arrErrors = error;
        Swal.fire('Error', 'Algo ha salido mal', 'error');
      }
    } else {
      if (this.files.length === 0) {
        this.arrErrors.push({ field: 'imagen', message: 'Debes incluir una imagen' })
      }
      Swal.fire('Error', 'Comprueba los datos', 'error');
    }
  }

  onChange($event: any) {
    this.files = $event.target.files;
  }
}


