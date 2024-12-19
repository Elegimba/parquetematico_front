import { Component, inject, Input } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StaffService } from '../../../services/staff.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent {

  @Input() userId: string = ''

  staffServices = inject(StaffService)
  router = inject(Router)


  formEdit: FormGroup = new FormGroup({
    name: new FormControl(),
    surnames: new FormControl(),
    email: new FormControl(),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required, this.passwordValidator]),
  })

  passwordValidator(form: AbstractControl) {
    const passwordControl = form.get('password')
    const repitePasswordControl = form.get('confirmPassword');

    if (passwordControl?.value !== repitePasswordControl?.value) {
      repitePasswordControl?.setErrors({ passwordvalidator: true });
      return { passwordvalidator: true };
    }

    return null;
  }

  async ngOnInit() {
    try {
      const user = await this.staffServices.getById(this.userId)
      this.formEdit.setValue({
        name: user.name,
        surnames: user.surnames,
        email: user.email,
        password: '',
        confirmPassword: ''

      })
    } catch (error) {
      console.log(error)
    }

  }

  async onSubmit() {
    try {
      if (this.formEdit.valid) {
        await this.staffServices.updateById(this.userId, this.formEdit.value)
        Swal.fire('Hecho', 'Detalles modificados', 'success');
      }
      this.router.navigateByUrl('/users')
    } catch (error) {

    }
  }
}
