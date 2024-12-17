import { Component, inject } from '@angular/core';
import { IComment } from '../../../interfaces/icomment.interface';
import { CommentsService } from '../../../services/comments.service';
import { CommentComponent } from '../../../components/comment/comment.component';
import dayjs from 'dayjs';

@Component({
  selector: 'app-all-comments',
  standalone: true,
  imports: [CommentComponent],
  templateUrl: './all-comments.component.html',
  styleUrl: './all-comments.component.css'
})
export class AllCommentsComponent {

  arrComments: IComment[] = [];

  commentsService = inject(CommentsService);

  async ngOnInit() {
    try {
      this.arrComments = await this.commentsService.getAll()
    } catch (error) {
      console.log(error);
    }
  }

  async getCommentsByDate($event: any) {
    console.log($event.target.value);
    const arrCommentsDate = await this.commentsService.getAll()
    const arrfiltrado = arrCommentsDate.filter((comment) => {
      return dayjs(comment.schedule.start_time).format('YYYY-MM-DD') === dayjs($event.target.value).format('YYYY-MM-DD')

    })
    this.arrComments = arrfiltrado
  }
}
