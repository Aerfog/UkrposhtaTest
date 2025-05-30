export interface EmployeeFilter {
  departmentIds?: number[] | null;
  positionIds?: number[] | null;
  lastName?: string | null;
  firstName?: string | null;
  middleName?: string | null;
  address?: string | null;
  phone?: string | null;
  birthDateFrom?: Date | null;
  birthDateTo?: Date | null;
  hireDateFrom?: Date | null;
  hireDateTo?: Date | null;
  salaryFrom?: number | null;
  salaryTo?: number | null;
}
