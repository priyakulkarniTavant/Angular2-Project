import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEmployee } from './employee';

@Component({
    templateUrl: './app/employees/employee-detail.component.html'
})
export class EmployeeDetailComponent implements OnInit {
    pageTitle: string = 'Employee Detail';
    employee: IEmployee;
    errorMessage: string;

    constructor(private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.employee = this.route.snapshot.data['employee'];
    }
}
