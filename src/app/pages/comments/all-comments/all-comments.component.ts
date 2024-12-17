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

  today = dayjs(new Date()).format('YYYY-MM-DD')

  async ngOnInit() {
    try {
      this.getCommentsByDate(this.today)
    } catch (error) {
      console.log(error);
    }
  }

  async getCommentsByDate(date: any) {

    const arrCommentsDate = await this.commentsService.getAll()
    const arrfiltrado = arrCommentsDate.filter((comment) => {
      return dayjs(comment.schedule.start_time).format('YYYY-MM-DD') === dayjs(date).format('YYYY-MM-DD')
    })
    this.arrComments = arrfiltrado
  }

  onChange($event: any) {
    const eventDate = $event.target.value
    this.getCommentsByDate(eventDate)

  }
}
