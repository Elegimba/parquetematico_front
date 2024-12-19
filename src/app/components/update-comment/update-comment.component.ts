import { Component, EventEmitter, inject, Input, Output, } from '@angular/core';
import { CommentsService } from '../../services/comments.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IComment } from '../../interfaces/icomment.interface';

@Component({
  selector: 'app-update-comment',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './update-comment.component.html',
  styleUrl: './update-comment.component.css'
})
export class UpdateCommentComponent {

  @Output() close = new EventEmitter<void>();
  @Output() editedComment = new EventEmitter<void>();

  @Input() scheduleId: string = '';
  arrErrors: { field: string, message: string }[] = [];

  commentsService = inject(CommentsService);

  comment: IComment | null = null;

  editCommentForm: FormGroup = new FormGroup({
    comments: new FormControl(),
  })

  async ngOnInit() {
    try {
      this.comment = await this.commentsService.getCommentBySchedule(this.scheduleId);
      this.editCommentForm.setValue({
        comments: this.comment.comments
      });
    } catch (error) {
      console.log(error);
    }
  }

  

  async onSubmit() {
    try {
      console.log(this.comment)
      const edited = await this.commentsService.updateComment(this.comment!.id, this.editCommentForm.value);
      this.editedComment.emit();
      this.hideComponent();
      console.log(edited);
    } catch ({error}: any) {
      console.log(error)
      this.arrErrors = error;
    }
  }

  hideComponent() {
    this.close.emit();
    this.editCommentForm.reset();
  }

}
