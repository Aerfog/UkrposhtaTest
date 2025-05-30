import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, Observable } from 'rxjs';
import { Company } from '../models/company.model';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private apiUrl = `${environment.apiUrl}/company`;

  constructor(private http: HttpClient) { }

  getCompanyInfo(): Observable<Company> {
    return this.http.get<Company[]>(this.apiUrl).pipe(
        map(companies => companies[0])
    );
  }
}
