import { Component, inject, Input } from '@angular/core';
import { IAttraction } from '../../interfaces/iattraction.interface';
import { AttractionsService } from '../../services/attractions.service';

@Component({
  selector: 'app-attraction-details',
  standalone: true,
  imports: [],
  templateUrl: './attraction-details.component.html',
  styleUrl: './attraction-details.component.css'
})
export class AttractionDetailsComponent {

  attraction: IAttraction | null = null;

  @Input() attractionId: string = '';

  attractionsService = inject(AttractionsService);

  
}
