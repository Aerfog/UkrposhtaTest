import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { CompanyService } from '../../core/services/company.service';
import { Company } from '../../core/models/company.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatIconModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  company: Company | null = null;
  isLoading = true;

  constructor(private companyService: CompanyService) {}

  ngOnInit(): void {
    this.loadCompanyInfo();
  }

  loadCompanyInfo(): void {
    this.companyService.getCompanyInfo().subscribe({
      next: (data) => {
        this.company = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading company info', error);
        this.isLoading = false;
      }
    });
  }
}
