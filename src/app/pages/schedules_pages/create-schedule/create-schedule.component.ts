import { Component, inject } from '@angular/core';
import { ScheduleService } from '../../../services/schedule.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IAttraction } from '../../../interfaces/iattraction.interface';
import { IUser } from '../../../interfaces/iuser.interface';
import { AttractionsService } from '../../../services/attractions.service';
import { StaffService } from '../../../services/staff.service';

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

  arrAttractions: IAttraction[] = []
  arrWorkers: IUser[] = []

  newSchedule: FormGroup = new FormGroup({
    start_time: new FormControl(),
    end_time: new FormControl(),
    attractions_id: new FormControl(),
    users_id: new FormControl()
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
    } catch (error) {
      console.log(error)
    }
  }
}
