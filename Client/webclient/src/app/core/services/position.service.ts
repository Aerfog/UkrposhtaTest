import { Injectable } from '@angular/core';
import { environment } from '../../environment';
import { HttpClient } from '@angular/common/http';
import { Position } from '../models/position.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PositionService {
  private apiUrl = `${environment.apiUrl}/position`;

  constructor(private http: HttpClient) { }

  getPositions(): Observable<Position[]> {
    return this.http.get<Position[]>(this.apiUrl);
  }

  getPosition(id: number): Observable<Position> {
    return this.http.get<Position>(`${this.apiUrl}/${id}`);
  }

  createPosition(position: { name: string }): Observable<Position> {
    return this.http.post<Position>(this.apiUrl, position);
  }

  updatePosition(position: { name: string }): Observable<Position> {
    return this.http.put<Position>(this.apiUrl, position);
  }

  deletePosition(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
