import { Component, Input } from '@angular/core';
import { IComment } from '../../interfaces/icomment.interface';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css'
})
export class CommentComponent {

  @Input( {required: true} ) comment: IComment | null = null;

}
