import { HttpClient } from "@angular/common/http";
import { environment } from "../../environment";
import { Observable } from "rxjs";
import { Department } from "../models/department.model";
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  private apiUrl = `${environment.apiUrl}/department`;

  constructor(private http: HttpClient) { }

  getDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(this.apiUrl);
  }

  getDepartment(id: number): Observable<Department> {
    return this.http.get<Department>(`${this.apiUrl}/${id}`);
  }

  createDepartment(department: { name: string }): Observable<Department> {
    return this.http.post<Department>(this.apiUrl, department);
  }

  updateDepartment(department: { name: string }): Observable<Department> {
    return this.http.put<Department>(`${this.apiUrl}`, department);
  }

  deleteDepartment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }}
