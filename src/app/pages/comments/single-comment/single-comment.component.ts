import { Component, inject, Input } from '@angular/core';
import { CommentsService } from '../../../services/comments.service';
import { IComment } from '../../../interfaces/icomment.interface';
import { UpdateCommentComponent } from "../../../components/update-comment/update-comment.component";

@Component({
  selector: 'app-single-comment',
  standalone: true,
  imports: [UpdateCommentComponent],
  templateUrl: './single-comment.component.html',
  styleUrl: './single-comment.component.css'
})
export class SingleCommentComponent {

  @Input() scheduleId: string = ''

  commentService = inject(CommentsService)

  commentBySchedule: IComment | null = null
  commentBox: boolean = false;

  async ngOnInit() {
    try {
      this.commentBySchedule = await this.commentService.getCommentBySchedule(this.scheduleId)
      console.log(this.commentBySchedule)
    } catch (error) {
      console.log(error)
    }

  }

  async updateComments() {
    try {
      this.commentBySchedule = await this.commentService.getCommentBySchedule(this.scheduleId)
    } catch (error) {
      console.log(error);
    }
  }

  viewCommentBox() {
    this.commentBox = true;
  }
  hiddeCommentBox() {
    this.commentBox = false;
  }

}
