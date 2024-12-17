import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import Swal from 'sweetalert2';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  router = inject(Router);
  usersService = inject(UsersService);

  async onClickLogout() {
    const confirm = await Swal.fire({ title: 'Cerrar sesión', text: '¿Quieres continuar?', confirmButtonText: 'Confirmar', showCancelButton: true })

    if (confirm.isConfirmed) {
      localStorage.removeItem('aptk');
      this.router.navigateByUrl('/main');
    }
  }
}
