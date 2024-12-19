import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CommentsService } from '../../services/comments.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-comment',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './new-comment.component.html',
  styleUrl: './new-comment.component.css'
})
export class NewCommentComponent {

  @Output() close = new EventEmitter<void>();
  @Output() addedComment = new EventEmitter<void>();

  @Input() userId: string = '';
  @Input() scheduleId: string = '';
  arrErrors: { field: string, message: string }[] = [];

  commentsService = inject(CommentsService);

  commentForm: FormGroup = new FormGroup({
    comments: new FormControl(),
  })

  ngOnInit() {
    this.commentForm.patchValue({ users_Id: this.userId, schedule_Id: this.scheduleId })
  }

  async onSubmit() {
    try {
      this.commentForm.value.schedule_id = this.scheduleId;
      this.commentForm.value.users_id = this.userId;
      await this.commentsService.createComment(this.commentForm.value);
      this.addedComment.emit();
      this.hideComponent();
    } catch ({ error }: any) {
      console.log(error);
      this.arrErrors = error;
    }
  }

  hideComponent() {
    this.close.emit();
    this.commentForm.reset();
  }

}
