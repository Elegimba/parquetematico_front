
import { Component, inject, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ScheduleService } from '../../../services/schedule.service';
import { IAttraction } from '../../../interfaces/iattraction.interface';
import { AttractionsService } from '../../../services/attractions.service';
import dayjs, { Dayjs } from 'dayjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-schedule',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-schedule.component.html',
  styleUrl: './edit-schedule.component.css'
})
export class EditScheduleComponent {

  @Input() scheduleId: string = ''

  scheduleService = inject(ScheduleService)
  attractionService = inject(AttractionsService)

  arrAttractions: IAttraction[] = []



  editSchForm: FormGroup = new FormGroup({
    start_time: new FormControl(),
    end_time: new FormControl(),
    attractions_id: new FormControl()
  })

  async ngOnInit() {
    try {
      this.arrAttractions = await this.attractionService.getAll()
      const schedule = await this.scheduleService.getScheduleById(this.scheduleId)
      console.log(schedule)
      //const attraction = await this.attractionService.getById(schedule.attraction.id)

      this.editSchForm.setValue({
        start_time: dayjs(schedule.start_time).format('YYYY-MM-DD HH:mm'),
        end_time: dayjs(schedule.end_time).format('YYYY-MM-DD HH:mm'),
        attractions_id: schedule.attraction.id
      });
    } catch (error) {
      console.log(error)
    }
  }
  async onSubmit() {

    try {
      Swal.fire({
        title: '¿Seguro que quieres editar el horario?',
        showDenyButton: true,
        confirmButtonText: `Si`,
        denyButtonText: `No`,
      }).then(async (result) => {
        if (result.isConfirmed) {
          await this.scheduleService.editScheduleById(this.scheduleId, this.editSchForm.value)
          Swal.fire('Cambio realizado', '', 'success')
        } else if (result.isDenied) {
          Swal.fire('Cambio cancelado', '', 'info')
        }
      })

    } catch (error) {
      console.log(error)
    }
  }

}
