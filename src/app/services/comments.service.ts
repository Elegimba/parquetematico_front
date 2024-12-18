import { HttpClient } from '@angular/common/http';
import { inject, Injectable, Input } from '@angular/core';
import { environment } from '../../environments/environment';
import { IComment } from '../interfaces/icomment.interface';
import { lastValueFrom } from 'rxjs';


type createComment = { comments: string, users_id: number; schedule_id: number }

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  @Input() userId: string = ''
  @Input() scheduleId: string = ''


  private httpClient = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/comments`

  getAll(): Promise<IComment[]> {
    return lastValueFrom(
      this.httpClient.get<IComment[]>(this.baseUrl)
    )
  }

  getById(commentId: number): Promise<IComment> {
    return lastValueFrom(
      this.httpClient.get<IComment>(`${this.baseUrl}/${commentId}`)
    )
  }

  getCommentByUser(userId: string) {
    return lastValueFrom(
      this.httpClient.get<IComment>(`${this.baseUrl}/${userId}/comments`)
    )
  }

  getCommentBySchedule(scheduleId: string) {
    return lastValueFrom(
      this.httpClient.get<IComment>(`${this.baseUrl}/schedule/${scheduleId}/comment`)
    )
  }

  createComment(body: createComment) {
    return lastValueFrom(
      this.httpClient.post<IComment>(this.baseUrl, body)
    )
  }


}
