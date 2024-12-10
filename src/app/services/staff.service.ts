import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { IUser } from '../interfaces/iuser.interface';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StaffService {

  private httpClient = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}`;

  getAll(): Promise<IUser[]> {
    return lastValueFrom(
      this.httpClient.get<IUser[]>(`${this.baseUrl}/users`)
    );
  }


}
