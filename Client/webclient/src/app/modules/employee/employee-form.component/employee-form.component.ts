import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Employee } from '../../../core/models/employee.model';
import { Position } from '../../../core/models/position.model';
import { Department } from '../../../core/models/department.model';

import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatNativeDateModule } from '@angular/material/core';
import { EmployeeService } from '../../../core/services/employee.service';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatIconModule
  ],
})
export class EmployeeFormComponent implements OnInit {
  employeeForm!: FormGroup;
  isEditMode = false;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    public dialogRef: MatDialogRef<EmployeeFormComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      employee: Employee;
      departments: Department[];
      positions: Position[];
    }
  ) {
    this.isEditMode = data.employee.id !== null;
  }

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      lastName: [this.data.employee.lastName || '', Validators.required],
      firstName: [this.data.employee.firstName || '', Validators.required],
      middleName: [this.data.employee.middleName || ''],
      birthDate: [this.data.employee.birthDate || '', Validators.required],
      hireDate: [this.data.employee.hireDate || '', Validators.required],
      salary: [this.data.employee.salary || 0, [Validators.required, Validators.min(0)]],
      phone: [this.data.employee.phone || ''],
      address: [this.data.employee.address || '', Validators.required],
      departmentId: [this.data.employee.departmentId || null],
      positionId: [this.data.employee.positionId || null],
    });
  }

  onSubmit(): void {
    if (this.employeeForm.invalid) return;

    this.isLoading = true;
    const formData: Employee = {
      ...this.data?.employee,
      ...this.employeeForm.value,
    };

    if (this.isEditMode) {
      this.employeeService.updateEmployee(formData).subscribe({
        next: () => {
          this.isLoading = false;
          this.dialogRef.close({ action: 'edit', employee: formData });
        },
        error: (err) => {
          this.isLoading = false;
          console.error('Error updating employee:', err);
        },
      });
    } else {
      formData.id = 0;
      this.employeeService.createEmployee(formData).subscribe({
        next: (newEmployee) => {
          this.isLoading = false;
          this.dialogRef.close({ action: 'add', employee: newEmployee });
        },
        error: (err) => {
          this.isLoading = false;
          console.error('Error adding employee:', err);
        },
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close(null);
  }
}
