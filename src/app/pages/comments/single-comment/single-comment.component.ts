import { Component, inject, Input } from '@angular/core';
import { CommentsService } from '../../../services/comments.service';
import { IComment } from '../../../interfaces/icomment.interface';
import { UpdateCommentComponent } from "../../../components/update-comment/update-comment.component";
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-single-comment',
  standalone: true,
  imports: [UpdateCommentComponent],
  templateUrl: './single-comment.component.html',
  styleUrl: './single-comment.component.css'
})
export class SingleCommentComponent {

  @Input() scheduleId: string = ''

  commentService = inject(CommentsService);
  usersService = inject(UsersService);
  router = inject(Router);

  commentBySchedule: IComment | null = null;
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

  async deleteOnClick(commentId: number) {
    const confirm = await Swal.fire({ title: '¿Seguro que lo quieres borrar?', icon: 'warning', confirmButtonText: 'Confirmar', showCancelButton: true });
    if(confirm.isConfirmed) {
      try {
        await this.commentService.deleteComment(commentId);
        Swal.fire('Borrado', '', 'success');
        const id = this.commentBySchedule?.users_id
        this.router.navigateByUrl(`${id}/schedules`);
      } catch (error) {
        console.log(error);
      }
    }
  }

}
