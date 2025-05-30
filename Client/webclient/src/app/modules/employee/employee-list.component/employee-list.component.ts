import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';
import { formatDate } from '@angular/common';
import { EmployeeFilterComponent } from '../../shared/employee-filter.component/employee-filter.component';
import { Employee } from '../../../core/models/employee.model';
import { Department } from '../../../core/models/department.model';
import { Position } from '../../../core/models/position.model';
import { EmployeeService } from '../../../core/services/employee.service';
import { DepartmentService } from '../../../core/services/department.service';
import { PositionService } from '../../../core/services/position.service';
import { EmployeeFormComponent } from '../employee-form.component/employee-form.component';
import { ConfirmDialogComponent } from '../../shared/confirmation-dialog.component/confirmation-dialog.component';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    EmployeeFilterComponent,
    MatCardModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  displayedColumns: string[] = [
    'lastName', 'firstName', 'middleName', 'department', 'position', 'phone', 'address',
    'salary', 'birthDate', 'hireDate', 'actions'
  ];

  isLoading = false;
  departments: Department[] = [];
  positions: Position[] = [];

  constructor(
    private employeeService: EmployeeService,
    private departmentService: DepartmentService,
    private positionService: PositionService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadDepartments();
    this.loadPositions();
    this.loadAllEmployees();
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

  onFiltersChanged(filteredEmployees: Employee[]): void {
    this.employees = filteredEmployees;
  }

  onFiltersReset(): void {
    this.employees = [];
  }

  onAddEmployee(): void {
    const dialogRef = this.dialog.open(EmployeeFormComponent, {
      data: {
        employee: {
          id: null,
          firstName: '',
          lastName: '',
          middleName: null,
          address: '',
          phone: '',
          birthDate: new Date(),
          hireDate: new Date(),
          salary: 0,
          positionId: null,
          departmentId: null
        },
        departments: this.departments,
        positions: this.positions
      },
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadAllEmployees();
      }
    });
  }

  openEditDialog(employee: Employee): void {
    const dialogRef = this.dialog.open(EmployeeFormComponent, {
      data: {
        employee: { ...employee },
        departments: this.departments,
        positions: this.positions
      },
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadAllEmployees();
      }
    });
  }

  deleteEmployee(employeeId: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirm Delete',
        message: 'Are you sure you want to delete this employee?'
      },
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.employeeService.deleteEmployee(employeeId).subscribe({
          next: () => {
            this.loadAllEmployees();
          },
          error: (err) => {
            console.error('Failed to delete employee', err);
          }
        });
      }
    });
  }

  getDepartmentName(departmentId: number): string {
    return this.departments.find(d => d.id === departmentId)?.name || '-';
  }

  getPositionName(positionId: number): string {
    return this.positions.find(p => p.id === positionId)?.name || '-';
  }

  formatSalary(salary: number): string {
    return salary ? `${salary.toLocaleString()}` : '-';
  }

  formatDate(dateStr: string | null): string {
    if (!dateStr) return '-';
    return formatDate(dateStr, 'mediumDate', 'en-US');
  }
}
