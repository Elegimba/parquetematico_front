import { Component, inject, Input } from '@angular/core';
import { AttractionsService } from '../../services/attractions.service';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

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
    try {

      const newAtt = await this.attractionsService.create(this.formulario.value);      
      this.router.navigateByUrl(`attractions/details/${newAtt.id}`);      
    } catch ({error}: any) {
      console.log(error);
      this.arrErrors = error;
    }
  }

}
