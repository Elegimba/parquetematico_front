import { Component, inject, Input } from '@angular/core';
import { CommentsService } from '../../../services/comments.service';
import { IComment } from '../../../interfaces/icomment.interface';

@Component({
  selector: 'app-single-comment',
  standalone: true,
  imports: [],
  templateUrl: './single-comment.component.html',
  styleUrl: './single-comment.component.css'
})
export class SingleCommentComponent {

  @Input() scheduleId: string = ''

  commentService = inject(CommentsService)

  commentBySchedule: IComment | null = null

  async ngOnInit() {
    try {
      this.commentBySchedule = await this.commentService.getCommentBySchedule(this.scheduleId)
      console.log(this.commentBySchedule)
    } catch (error) {
      console.log(error)
    }

  }
}
