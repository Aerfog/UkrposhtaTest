export interface Employee {
    id: number | null;
    firstName: string;
    lastName: string;
    middleName: string | null;
    address: string;
    phone: string;
    birthDate: Date;
    hireDate: Date;
    salary: number;
    positionId: number | null;
    departmentId: number | null;
}
