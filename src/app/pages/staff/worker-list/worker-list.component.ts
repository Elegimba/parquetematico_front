import { Component, inject } from '@angular/core';
import { IUser } from '../../../interfaces/iuser.interface';
import { StaffService } from '../../../services/staff.service';
import { RouterLink } from '@angular/router';
import { lastValueFrom } from 'rxjs';


@Component({
  selector: 'app-worker-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './worker-list.component.html',
  styleUrl: './worker-list.component.css'
})
export class WorkerListComponent {

  allStaff: IUser[] = []
  staffService = inject(StaffService)

  async ngOnInit() {
    try {
      this.allStaff = await this.staffService.getAll()
    } catch (error) {
      console.log(error)
    }
  }


}
