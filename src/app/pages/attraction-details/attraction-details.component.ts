import { Component, inject, Input } from '@angular/core';
import { IAttraction } from '../../interfaces/iattraction.interface';
import { AttractionsService } from '../../services/attractions.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

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

  attractionsService = inject(AttractionsService);

  async ngOnInit() {
    try {
      this.attraction = await this.attractionsService.getById(this.attractionId);
    } catch (error) {
      console.log(error);
    }
  }

}
