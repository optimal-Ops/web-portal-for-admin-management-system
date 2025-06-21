// src/app/services/project/project.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Project {
  projectid:    number;
  projectname:  string;
  managedby?:   number;
  startdate?:   string;  
}

export type CreateProjectReq = {
  projectName: string;
  managedBy?:  number;
  startDate?:  string;
};

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private baseUrl = 'http://localhost:3001/api/projects';

  constructor(private http: HttpClient) {}

 
  getAllProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.baseUrl);
  }

  createProject(payload: CreateProjectReq): Observable<Project> {
    return this.http.post<Project>(this.baseUrl, payload);
  }
  deleteProject(id: number) {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
  
  updateProject(id: number, data: any) {
    return this.http.put<Project>(`${this.baseUrl}/${id}`, data);
  }
  
}
