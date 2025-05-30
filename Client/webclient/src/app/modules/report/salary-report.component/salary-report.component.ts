import { Component, OnInit } from '@angular/core';
import { EmployeeFilterComponent } from '../../shared/employee-filter.component/employee-filter.component';
import { Employee } from '../../../core/models/employee.model';
import { Department } from '../../../core/models/department.model';
import { Position } from '../../../core/models/position.model';
import { PositionService } from '../../../core/services/position.service';
import { DepartmentService } from '../../../core/services/department.service';
import { EmployeeService } from '../../../core/services/employee.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-salary-report.component',
  imports: [CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    EmployeeFilterComponent,
    MatCardModule,
    MatProgressSpinnerModule,CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatProgressSpinnerModule,],
  standalone: true,
  templateUrl: './salary-report.component.html',
  styleUrl: './salary-report.component.scss'
})
export class SalaryReportComponent implements OnInit{
  employees: Employee[] = [];
  calculationType: string = 'total';
  result: string | null = null;
  departments: Department[] = [];
  positions: Position[] = [];
  isLoading = false;

  constructor(
    private employeeService: EmployeeService,
    private departmentService: DepartmentService,
    private positionService: PositionService,
  ) {}

  handleFilteredEmployees(filteredEmployees: Employee[]): void {
    this.employees = filteredEmployees;
    this.calculateMetric();
  }

  ngOnInit(): void {
    this.loadDepartments();
    this.loadPositions();
    this.loadAllEmployees();
  }

  calculateMetric(): void {
    if (this.employees.length === 0) {
      this.result = null;
      return;
    }

    const salaries = this.employees.map(emp => emp.salary);

    switch (this.calculationType) {
      case 'total':
        this.result = salaries.reduce((sum, salary) => sum + salary, 0).toFixed(2);
        break;
      case 'average':
        this.result = (salaries.reduce((sum, salary) => sum + salary, 0) / salaries.length).toFixed(2);
        break;
      case 'median':
        const sortedSalaries = [...salaries].sort((a, b) => a - b);
        const mid = Math.floor(sortedSalaries.length / 2);
        this.result =
          sortedSalaries.length % 2 === 0
            ? ((sortedSalaries[mid - 1] + sortedSalaries[mid]) / 2).toFixed(2)
            : sortedSalaries[mid].toFixed(2);
        break;
    }
  }

  exportToTxt(): void {
    const headers = 'ID, Name, Department, Position, Salary';

    const rows = this.employees.map(emp =>
      `${emp.id}, ${emp.firstName} ${emp.lastName}, ${emp.departmentId? this.getDepartmentName(emp.departmentId) : "-"}, ${emp.positionId? this.getPositionName(emp.positionId) : "-"}, ${emp.salary}`
    );

    const footer = `Calculation Type: ${this.calculationType.toUpperCase()}\nResult: ${this.result}`;

    const fileContent = [headers, ...rows, '', footer].join('\n');
    const blob = new Blob([fileContent], {type: 'text/plain'});
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'salary_report.txt';
    link.click();
  }

  private getDepartmentName(departmentId: number): string {
    return this.departments.find(d => d.id === departmentId)?.name || '-';
  }

  private getPositionName(positionId: number): string {
    return this.positions.find(p => p.id === positionId)?.name || '-';
  }

  private loadDepartments(): void {
    this.departmentService.getDepartments().subscribe(depts => this.departments = depts);
  }

  private loadPositions(): void {
    this.positionService.getPositions().subscribe(pos => this.positions = pos);
  }

  private loadAllEmployees(): void {
    this.isLoading = true;
    this.employeeService.getFilteredEmployees({}).subscribe({
      next: employees => {
        this.employees = employees;
        this.isLoading = false;
      },
      error: () => {
        this.employees = [];
        this.isLoading = false;
      }
    });
  }
}
