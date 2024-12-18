import { Component, inject } from '@angular/core';
import { IAttraction } from '../../../interfaces/iattraction.interface';
import { AttractionsService } from '../../../services/attractions.service';
import { AttractionComponent } from "../../../components/attraction/attraction.component";
import { RouterLink } from '@angular/router';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-attractions',
  standalone: true,
  imports: [AttractionComponent, RouterLink],
  templateUrl: './attractions.component.html',
  styleUrl: './attractions.component.css'
})
export class AttractionsComponent {

  arrAttractions: IAttraction[] = [];

  attractionsService = inject(AttractionsService);
  usersService = inject(UsersService);

  async ngOnInit() {
    try {
      this.arrAttractions = await this.attractionsService.getAll()
    } catch (error) {
      console.log(error);
    }
  }

}
