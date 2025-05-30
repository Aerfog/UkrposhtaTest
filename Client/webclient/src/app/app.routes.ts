import { Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { EmployeeListComponent } from './modules/employee/employee-list.component/employee-list.component';
import { SalaryReportComponent } from './modules/report/salary-report.component/salary-report.component';

export const routes: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: 'employees', component: EmployeeListComponent },
    { path: 'reports', component: SalaryReportComponent },
];
