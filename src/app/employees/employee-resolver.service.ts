import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { IEmployee } from './employee';
import { EmployeeService } from './employee.service';

@Injectable()
export class EmployeeResolver implements Resolve<IEmployee> {

    constructor(private employeeService: EmployeeService,
                private router: Router) { }

    resolve(route: ActivatedRouteSnapshot,
            state: RouterStateSnapshot): Observable<IEmployee> {
        let id = route.params['id'];
        // let id = route.paramMap.get('id');
        if (isNaN(+id)) {
            console.log(`Employee id was not a number: ${id}`);
            this.router.navigate(['/employees']);
            return Observable.of(null);
        }
        return this.employeeService.getEmployee(+id)
            .map(employee => {
                if (employee) {
                    return employee;
                }
                console.log(`Employee was not found: ${id}`);
                this.router.navigate(['/employees']);
                return null;
            })
            .catch(error => {
                console.log(`Retrieval error: ${error}`);
                this.router.navigate(['/employees']);
                return Observable.of(null);
            });
    }
}
