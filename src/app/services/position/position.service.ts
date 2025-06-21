// src/app/services/position/position.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Position {
  positionid: number;
  positionname: string;
}

@Injectable({ providedIn: 'root' })
export class PositionService {
  private baseUrl = 'http://localhost:3001/api/positions';
  constructor(private http: HttpClient) {}
  getAll(): Observable<Position[]> {
    return this.http.get<Position[]>(this.baseUrl);
  }
}
