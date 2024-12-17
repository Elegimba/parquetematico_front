import { Component, Input } from '@angular/core';
import { IComment } from '../../interfaces/icomment.interface';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css'
})
export class CommentComponent {

  @Input({ required: true }) comment: IComment | null = null;



}
