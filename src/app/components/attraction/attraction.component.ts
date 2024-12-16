import { Component, Input } from '@angular/core';
import { IAttraction } from '../../interfaces/iattraction.interface';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-attraction',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './attraction.component.html',
  styleUrl: './attraction.component.css'
})
export class AttractionComponent {

  @Input( {required: true} ) attraction: IAttraction | null = null;

  imageUrl = environment.imagesUrl;

}
