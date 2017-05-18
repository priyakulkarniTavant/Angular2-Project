/* Defines the employee entity */
export interface IEmployee {
    id: number;
    employeeName: string;
    employeeCode: string;
    department: string;
    tags?: string[];
    joinedOn: string;
    salary: number;
    description: string;
    performance: number;
    imageUrl: string;
}
