import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Employee {
  
  employeeid:    number;
  positionid:    number;
  positionname?: string;         
  employeename:  string;
  contactnumber?: string;
  email?:         string;
}
export type CreateEmployeeReq = Omit<Employee, 'employeeid' | 'positionname'>;


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
private baseUrl = 'http://localhost:3001/api/employees';
  private get httpOptions() {
  return {
    headers: new HttpHeaders({
       Authorization: `Bearer ${localStorage.getItem('authToken') || ''}`
    })
  };
}

  constructor(private http: HttpClient) {}

 
  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.baseUrl, this.httpOptions);
  }

  createEmployee(emp: CreateEmployeeReq): Observable<Employee> {
    return this.http.post<Employee>(this.baseUrl, emp, this.httpOptions);
  }

updateEmployee(id: number, emp: CreateEmployeeReq): Observable<Employee> {
  return this.http.put<Employee>(
    `${this.baseUrl}/${id}`,
    emp,
    this.httpOptions
  );
}


deleteEmployee(id: number): Observable<void> {
  return this.http.delete<void>(
    `${this.baseUrl}/${id}`,
    this.httpOptions
  );
}

}
