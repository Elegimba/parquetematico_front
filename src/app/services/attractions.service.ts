import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { IAttraction } from '../interfaces/iattraction.interface';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

type createAttraction = { capacity: number, min_height: string, average_duration: string, wait_time: string, functional: boolean, name: string }

@Injectable({
  providedIn: 'root'
})
export class AttractionsService {

  private httpClient = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/attractions`;

  getAll(): Promise<IAttraction[]> {
    return lastValueFrom(
      this.httpClient.get<IAttraction[]>(this.baseUrl)
    );
  }

  getById(attractionId: number): Promise<IAttraction> {
    return lastValueFrom(
      this.httpClient.get<IAttraction>(`${this.baseUrl}/${attractionId}`)
    )
  }

  create(body: createAttraction) {
    return lastValueFrom(
      this.httpClient.post<IAttraction>(this.baseUrl, body)
    )
  }

  updateById(attractionId: number, body: createAttraction) {
    return lastValueFrom(
      this.httpClient.put<IAttraction>(`${this.baseUrl}/${attractionId}`, body)
    );
  }

  deleteById(attractionId: number) {
    return lastValueFrom(
      this.httpClient.delete<IAttraction>(`${this.baseUrl}/${attractionId}`)
    );
  }
}
