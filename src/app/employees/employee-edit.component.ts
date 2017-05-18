import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MessageService } from '../messages/message.service';

import { IEmployee } from './employee';
import { EmployeeService } from './employee.service';

@Component({
    templateUrl: './app/employees/employee-edit.component.html',
    styleUrls: ['./app/employees/employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit {
    pageTitle: string = 'Employee Edit';
    errorMessage: string;

    private currentEmployee: IEmployee;
    private originalEmployee: IEmployee;
    private dataIsValid: { [key: string]: boolean } = {};

    get isDirty(): boolean {
        return JSON.stringify(this.originalEmployee) !== JSON.stringify(this.currentEmployee);
    }

    get employee(): IEmployee {
        return this.currentEmployee;
    }
    set employee(value: IEmployee) {
        this.currentEmployee = value;
        // Clone the object to retain a copy
        this.originalEmployee = Object.assign({}, value);
    }

    constructor(private route: ActivatedRoute,
        private router: Router,
        private employeeService: EmployeeService,
        private messageService: MessageService) { }

    ngOnInit(): void {
        // Watch for changes to the resolve data
        this.route.data.subscribe(data => {
             this.onEmployeeRetrieved(data['employee']);
        });
    }

    onEmployeeRetrieved(employee: IEmployee): void {
        this.employee = employee;

        // Adjust the title
        if (this.employee.id === 0) {
            this.pageTitle = 'Add Employee';
        } else {
            this.pageTitle = `Edit Employee: ${this.employee.employeeName}`;
        }
    }

    deleteEmployee(): void {
        if (this.employee.id === 0) {
            // Don't delete, it was never saved.
            this.onSaveComplete(`${this.employee.employeeName} was deleted`);
        } else {
            if (confirm(`Really delete the employee: ${this.employee.employeeName}?`)) {
                this.employeeService.deleteEmployee(this.employee.id)
                    .subscribe(
                        () => this.onSaveComplete(`${this.employee.employeeName} was deleted`),
                        (error: any) => this.errorMessage = <any>error
                    );
            }
        }
    }

    isValid(path: string): boolean {
        this.validate();
        if (path) {
            return this.dataIsValid[path];
        }
        return (this.dataIsValid &&
            Object.keys(this.dataIsValid).every(d => this.dataIsValid[d] === true));
    }

    saveEmployee(): void {
        if (this.isValid(null)) {
            this.employeeService.saveEmployee(this.employee)
                .subscribe(
                    () => this.onSaveComplete(`${this.employee.employeeName} was saved`),
                    (error: any) => this.errorMessage = <any>error
                );
        } else {
            this.errorMessage = 'Please correct the validation errors.';
        }
    }

    onSaveComplete(message?: string): void {
        if (message) {
            this.messageService.addMessage(message);
        }
        this.reset();
        // Navigate back to the employee list
        this.router.navigate(['/employees']);
    }

    // Reset the data
    // Required after a save so the data is no longer seen as dirty.
    reset(): void {
        this.dataIsValid = null;
        this.currentEmployee = null;
        this.originalEmployee = null;
    }

    validate(): void {
        // Clear the validation object
        this.dataIsValid = {};

        // 'info' tab
        if (this.employee.employeeName &&
            this.employee.employeeName.length >= 3 &&
            this.employee.employeeCode) {
            this.dataIsValid['info'] = true;
        } else {
            this.dataIsValid['info'] = false;
        }

        // 'tags' tab
        if (this.employee.department &&
            this.employee.department.length >= 3) {
            this.dataIsValid['tags'] = true;
        } else {
            this.dataIsValid['tags'] = false;
        }
    }
}
