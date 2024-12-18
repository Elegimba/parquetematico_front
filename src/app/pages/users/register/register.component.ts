import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { UsersService } from '../../../services/users.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  userService = inject(UsersService)
  router = inject(Router)

  passwordValidator(form: AbstractControl) {
    const passwordControl = form.get('password')
    const repitePasswordControl = form.get('confirmPassword');

    if (passwordControl?.value !== repitePasswordControl?.value) {
      repitePasswordControl?.setErrors({ passwordvalidator: true });
      return { passwordvalidator: true };
    }

    return null;
  }


  refForm: FormGroup = new FormGroup({

    name: new FormControl('', [Validators.required]),
    surnames: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,5}$/)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required, this.passwordValidator]),

  }, {
    validators: this.passwordValidator
  });

  checkError(fieldName: string, errorName: string) {
    return this.refForm.get(fieldName)?.hasError(errorName) && this.refForm.get(fieldName)?.touched;
  }
  async register() {
    try {
      if (this.refForm.valid) {
        const response = await this.userService.register(this.refForm.value)
        Swal.fire({
          title: 'Bienvenido!',
          text: response.message,
          icon: 'success',
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/login']);
          }
        })

      } else {
        Swal.fire({
          title: 'Error!',
          text: 'Algun campo no es valido',
          icon: 'error',
          confirmButtonText: 'Ok!',
        })
      };
    } catch (error: any) {
      console.log(error)
      if (error.error.name === 'SequelizeUniqueConstraintError') {
        Swal.fire({
          title: 'Error!',
          text: 'El email ya esta registrado',
          icon: 'error',
          confirmButtonText: 'Ok!',
        })
      } else {
        Swal.fire({
          title: 'Error!',
          text: 'Algo salio mal',
          icon: 'error',
          confirmButtonText: 'Ok!',
        })
      }
    }
  }
}
