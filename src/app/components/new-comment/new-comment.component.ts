import { Component, inject, Input } from '@angular/core';
import { CommentsService } from '../../services/comments.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-comment',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './new-comment.component.html',
  styleUrl: './new-comment.component.css'
})
export class NewCommentComponent {

  @Input() userId: string = '';
  @Input() scheduleId: number = 0;
  arrErrors: { field: string, message: string }[] = [];

  commentsService = inject(CommentsService);
  activatedRoute = inject(ActivatedRoute);

  commentForm : FormGroup = new FormGroup({
    comments: new FormControl(),
  })

  ngOnInit() {
    this.commentForm.patchValue({ users_Id: this.userId, schedule_Id: this.scheduleId })
    console.log(this.userId, this.scheduleId)
  }

  async onSubmit() {
    try {
      this.commentForm.value.schedule_id = this.scheduleId
      this.commentForm.value.users_id = this.userId
      console.log(this.commentForm.value)
      const comment = await this.commentsService.createComment(this.commentForm.value);
    } catch ({error}: any) {
      console.log(error);
      this.arrErrors = error;
    }
  }
}
