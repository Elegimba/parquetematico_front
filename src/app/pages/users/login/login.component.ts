import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { UsersService } from '../../../services/users.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  usersServices = inject(UsersService)
  router = inject(Router)

  arrErrores: { field: string, message: string }[] = []

  errorLogin: string = ''

  logForm: FormGroup = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),

  })

  async onSubmit() {
    try {
      const response = await this.usersServices.login(this.logForm.value)
      Swal.fire(
        {
          title: 'Bienvenid@',
          text: response.message,
          icon: 'success'
        }
      )
      localStorage.setItem('aptk', response.token)
      this.router.navigateByUrl('/users')

    } catch ({ error }: any) {
      this.errorLogin = error.message
    }
  }
}

