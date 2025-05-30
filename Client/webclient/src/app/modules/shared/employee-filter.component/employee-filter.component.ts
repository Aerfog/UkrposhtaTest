import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {DepartmentService} from '../../../core/services/department.service';
import {PositionService} from '../../../core/services/position.service';
import {Department} from '../../../core/models/department.model';
import {Position} from '../../../core/models/position.model';
import {CommonModule} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatButtonModule} from '@angular/material/button';
import {Employee} from '../../../core/models/employee.model';
import {EmployeeService} from '../../../core/services/employee.service';
import { EmployeeFilter } from '../../../core/models/employee-filter.model';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-employee-filter',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './employee-filter.component.html',
  styleUrls: ['./employee-filter.component.scss']
})
export class EmployeeFilterComponent implements OnInit {
  filterForm: FormGroup;
  departments: Department[] = [];
  positions: Position[] = [];

  @Output() filteredEmployees = new EventEmitter<Employee[]>();

  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private departmentService: DepartmentService,
    private positionService: PositionService,
    private employeeService: EmployeeService
  ) {
    this.filterForm = this.fb.group({
      lastName: [''],
      firstName: [''],
      middleName: [''],
      address: [''],
      phone: [''],
      departments: [[]],
      positions: [[]],
      birthDateFrom: [null],
      birthDateTo: [null],
      hireDateFrom: [null],
      hireDateTo: [null],
      salaryFrom: [null],
      salaryTo: [null]
    });
  }

  ngOnInit(): void {
    this.loadDepartments();
    this.loadPositions();
  }

  private loadDepartments(): void {
    this.departmentService.getDepartments().subscribe(depts => this.departments = depts);
  }

  private loadPositions(): void {
    this.positionService.getPositions().subscribe(pos => this.positions = pos);
  }

  applyFilters(): void {
    if (this.filterForm.invalid) {
      return;
    }

    this.isLoading = true;

    const rawFilters = this.filterForm.value;

    const filters: EmployeeFilter = {
      ...rawFilters,
      departmentIds: rawFilters.departments.length ? rawFilters.departments.map((d: Department) => d.id) : null,
      positionIds: rawFilters.positions.length ? rawFilters.positions.map((p: Position) => p.id) : null
    };

    this.employeeService.getFilteredEmployees(filters).subscribe({
      next: (employees: Employee[]) => {
        this.filteredEmployees.emit(employees);
        this.isLoading = false;
      },
      error: () => {
        this.filteredEmployees.emit([]);
        this.isLoading = false;
      }
    });
  }

  resetFilters(): void {
    this.filterForm.reset({
      lastName: '',
      firstName: '',
      middleName: '',
      address: '',
      phone: '',
      departments: [],
      positions: [],
      birthDateFrom: null,
      birthDateTo: null,
      hireDateFrom: null,
      hireDateTo: null,
      salaryFrom: null,
      salaryTo: null
    });
    this.employeeService.getFilteredEmployees({}).subscribe({
      next: (employees: Employee[]) => {
        this.filteredEmployees.emit(employees);
        this.isLoading = false;
      },
      error: () => {
        this.filteredEmployees.emit([]);
        this.isLoading = false;
      }
    });
  }
}
