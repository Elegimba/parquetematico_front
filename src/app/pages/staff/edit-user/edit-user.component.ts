import { Component, inject, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { StaffService } from '../../../services/staff.service';

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
    email: new FormControl()
  })

  async ngOnInit() {
    try {
      const user = await this.staffServices.getById(this.userId)
      this.formEdit.setValue({
        name: user.name,
        surnames: user.surnames,
        email: user.email

      })
    } catch (error) {
      console.log(error)
    }

  }

  async onSubmit() {
    try {
      await this.staffServices.updateById(this.userId, this.formEdit.value)
      this
      this.router.navigateByUrl('/users')
    } catch (error) {

    }
  }
}
