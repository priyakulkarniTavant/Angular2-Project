import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { IEmployee } from './employee';

@Injectable()
export class EmployeeService {
    private baseUrl = 'api/employees';

    constructor(private http: Http) { }

    getEmployees(): Observable<IEmployee[]> {
        return this.http.get(this.baseUrl)
            .map(this.extractData)
            .do(data => console.log('getEmployees: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    getEmployee(id: number): Observable<IEmployee> {
        if (id === 0) {
            return Observable.of(this.initializeEmployee());
        };
        const url = `${this.baseUrl}/${id}`;
        return this.http.get(url)
            .map(this.extractData)
            .do(data => console.log('getEmployee: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    deleteEmployee(id: number): Observable<Response> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        const url = `${this.baseUrl}/${id}`;
        return this.http.delete(url, options)
            .do(data => console.log('deleteEmployee: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    saveEmployee(employee: IEmployee): Observable<IEmployee> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        if (employee.id === 0) {
            return this.createEmployee(employee, options);
        }
        return this.updateEmployee(employee, options);
    }

    private createEmployee(employee: IEmployee, options: RequestOptions): Observable<IEmployee> {
        employee.id = undefined;
        return this.http.post(this.baseUrl, employee, options)
            .map(this.extractData)
            .do(data => console.log('createEmployee: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    private updateEmployee(employee: IEmployee, options: RequestOptions): Observable<IEmployee> {
        const url = `${this.baseUrl}/${employee.id}`;
        return this.http.put(url, employee, options)
            .map(() => employee)
            .do(data => console.log('updateEmployee: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    private extractData(response: Response) {
        let body = response.json();
        return body.data || {};
    }

    private handleError(error: Response): Observable<any> {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

    initializeEmployee(): IEmployee {
        // Return an initialized object
        return {
            id: 0,
            employeeName: null,
            employeeCode: null,
            department: null,
            tags: [],
            joinedOn: null,
            salary: null,
            description: null,
            performance: null,
            imageUrl: null
        };
    }
}
