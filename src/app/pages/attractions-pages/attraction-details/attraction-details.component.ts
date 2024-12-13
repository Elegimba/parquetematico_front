import { Component, inject, Input } from '@angular/core';
import { IAttraction } from '../../../interfaces/iattraction.interface';
import { AttractionsService } from '../../../services/attractions.service';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-attraction-details',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './attraction-details.component.html',
  styleUrl: './attraction-details.component.css'
})
export class AttractionDetailsComponent {

  attraction: IAttraction | null = null;

  @Input() attractionId: number = 0;
  router = inject(Router)

  attractionsService = inject(AttractionsService);
  usersService = inject(UsersService);

  async ngOnInit() {
    try {
      this.attraction = await this.attractionsService.getById(this.attractionId);
    } catch (error) {
      console.log(error);
    }
  }

  async onClick() {
    const confirm = await Swal.fire({ title: 'Confirmar', text: 'Estás a punto de borrar tanto los datos como la atracción en sí misma', icon: 'warning', confirmButtonText: 'Confirmar', showCancelButton: true });
    if (confirm.isConfirmed) {
      try {
        await this.attractionsService.deleteById(this.attraction!.id);
        Swal.fire('Borrado', 'La atracción ha sido eliminada por completo y para siempre', 'success');
        this.router.navigateByUrl('attractions');
      } catch (error) {
        console.log(error);
      }
    }
  }

}
