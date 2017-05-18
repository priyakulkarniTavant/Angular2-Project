import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

import { IEmployee } from './employee';

@Component({
    templateUrl: './app/employees/employee-edit-info.component.html'
})
export class EmployeeEditInfoComponent implements OnInit {
    @ViewChild(NgForm) employeeForm: NgForm;

    errorMessage: string;
    employee: IEmployee;

    constructor(private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.route.parent.data.subscribe(data => {
            this.employee = data['employee'];

            if (this.employeeForm) {
                this.employeeForm.reset();
            }
        });
    }
}
