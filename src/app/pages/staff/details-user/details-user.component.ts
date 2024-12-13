import { Component, inject, Input } from '@angular/core';
import { StaffService } from '../../../services/staff.service';
import { IUser } from '../../../interfaces/iuser.interface';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-details-user',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './details-user.component.html',
  styleUrl: './details-user.component.css'
})
export class DetailsUserComponent {

  @Input() userId: string = ''

  staffServices = inject(StaffService)
  userServices = inject(UsersService)
  router = inject(Router)

  user: IUser | null = null

  async ngOnInit() {
    try {
      this.user = await this.staffServices.getById(this.userId)
    } catch (error) {
      console.log(error)
    }
  }

  deleteUser(userId: string) {
    try {
      Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esta acción no se puede deshacer',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            '¡Eliminado!',
            'El usuario ha sido eliminado correctamente.',
            'success'
          ).then(async () => {
            await this.staffServices.deleteById(userId);
            this.router.navigateByUrl('/users');
          });
        } else if (result.isDismissed) {
          console.log('Acción cancelada');
        }
      });

    } catch (error) {
      console.log(error)
    }
  }

}
