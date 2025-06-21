import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
export interface Applicant {
  positionId: number;
  name: string;
  email?: string;
  contactNumber?: string;
  resume: string;
}
@Injectable({
  providedIn: 'root'
})
export class JobApplicationService {

  private baseUrl = 'http://localhost:3001/api/jobs';

  constructor(private http: HttpClient) {}

  apply(applicant: Applicant): Observable<Applicant> {
    return this.http.post<Applicant>(`${this.baseUrl}`, applicant);
}
}