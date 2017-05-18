import { Component, OnInit }  from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEmployee } from './employee';
import { EmployeeService } from './employee.service';

@Component({
    templateUrl: './app/employees/employee-list.component.html',
    styleUrls: ['./app/employees/employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
    pageTitle: string = 'Employee List';
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean = false;
    listFilter: string;
    errorMessage: string;

    employees: IEmployee[];

    constructor(private employeeService: EmployeeService,
                private route: ActivatedRoute) { }

    toggleImage(): void {
        this.showImage = !this.showImage;
    }

    ngOnInit(): void {
        this.listFilter = this.route.snapshot.queryParams['filterBy'] || '';
        this.showImage = (this.route.snapshot.queryParams['showImage'] === 'true');
        // console.log(this.route.snapshot.queryParamMap.get('filterBy'));            

        this.employeeService.getEmployees()
                .subscribe(employees => this.employees = employees,
                           error => this.errorMessage = <any>error);
    }
}
