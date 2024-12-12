import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { IComment } from '../interfaces/icomment.interface';
import { lastValueFrom } from 'rxjs';

type createComment = {  }

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

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

  /* getCommentByUser(userId: number) {
    return lastValueFrom(
      this.httpClient.get<>(`this`)
    )
  } */

  /* create(body: createComment) */
}
