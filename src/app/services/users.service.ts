import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { lastValueFrom } from 'rxjs';

type regBody = {
  password: string,
  username: string,
  email: string
}
type loginResponse = {
  success: string,
  token: string
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private httpClient = inject(HttpClient)
  private baseUrl = `${environment.apiUrl}/users`;

  register(body: regBody): Promise<{ message: string }> {
    return lastValueFrom(
      this.httpClient.post<{ message: string }>(`${this.baseUrl}/register`, body)
    )
  }

}
