import { Component, inject, Input } from '@angular/core';
import { IAttraction } from '../../interfaces/iattraction.interface';
import { AttractionsService } from '../../services/attractions.service';
import { Router, RouterModule } from '@angular/router';

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

  async ngOnInit() {
    try {
      this.attraction = await this.attractionsService.getById(this.attractionId);
    } catch (error) {
      console.log(error);
    }
  }

  async onClick() {

    try {
      await this.attractionsService.deleteById(this.attraction!.id);
      this.router.navigateByUrl('attractions');
    } catch (error) {
      console.log(error);
    }
  }

}
