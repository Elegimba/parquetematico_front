import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { IUser } from '../interfaces/iuser.interface';
import { lastValueFrom } from 'rxjs';

type editBody = {
  name: string;
  surnames: string;
  email: string;

}

@Injectable({
  providedIn: 'root'
})
export class StaffService {

  private httpClient = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/users`;

  getAll(): Promise<IUser[]> {
    return lastValueFrom(
      this.httpClient.get<IUser[]>(this.baseUrl)
    );
  }

  getById(userId: string): Promise<IUser> {
    return lastValueFrom(
      this.httpClient.get<IUser>(`${this.baseUrl}/${userId}`)
    )
  }

  updateById(userId: string, body: editBody): Promise<IUser> {
    return lastValueFrom(
      this.httpClient.put<IUser>(`${this.baseUrl}/${userId}`, body)
    )
  }

  deleteById(userId: string): Promise<IUser> {
    return lastValueFrom(
      this.httpClient.delete<IUser>(`${this.baseUrl}/${userId}`)
    )
  }


}
