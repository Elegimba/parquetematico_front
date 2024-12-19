import { Component, inject } from '@angular/core';
import { ScheduleService } from '../../../services/schedule.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IAttraction } from '../../../interfaces/iattraction.interface';
import { IUser } from '../../../interfaces/iuser.interface';
import { AttractionsService } from '../../../services/attractions.service';
import { StaffService } from '../../../services/staff.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-schedule',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-schedule.component.html',
  styleUrl: './create-schedule.component.css'
})
export class CreateScheduleComponent {

  scheduleService = inject(ScheduleService)
  attractionService = inject(AttractionsService)
  staffServices = inject(StaffService)
  router = inject(Router)

  arrAttractions: IAttraction[] = []
  arrWorkers: IUser[] = []

  newSchedule: FormGroup = new FormGroup({
    start_time: new FormControl(Validators.required),
    end_time: new FormControl(Validators.required),
    attractions_id: new FormControl(Validators.required),
    users_id: new FormControl(Validators.required)
  })

  async ngOnInit() {
    try {
      this.arrAttractions = await this.attractionService.getAll()
      this.arrWorkers = await this.staffServices.getAll()
    } catch (error) {
      console.log(error)
    }
  }

  async onSubmit() {
    try {
      const schedule = await this.scheduleService.createSchedule(this.newSchedule.value)
      Swal.fire('Hecho', 'El horario se ha añadido', 'success');
      this.router.navigateByUrl('/users')
    } catch (error) {
      console.log(error)
    }
  }
}
