"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/do");
require("rxjs/add/operator/catch");
require("rxjs/add/observable/throw");
require("rxjs/add/operator/map");
require("rxjs/add/observable/of");
var EmployeeService = (function () {
    function EmployeeService(http) {
        this.http = http;
        this.baseUrl = 'api/employees';
    }
    EmployeeService.prototype.getEmployees = function () {
        return this.http.get(this.baseUrl)
            .map(this.extractData)
            .do(function (data) { return console.log('getEmployees: ' + JSON.stringify(data)); })
            .catch(this.handleError);
    };
    EmployeeService.prototype.getEmployee = function (id) {
        if (id === 0) {
            return Observable_1.Observable.of(this.initializeEmployee());
        }
        ;
        var url = this.baseUrl + "/" + id;
        return this.http.get(url)
            .map(this.extractData)
            .do(function (data) { return console.log('getEmployee: ' + JSON.stringify(data)); })
            .catch(this.handleError);
    };
    EmployeeService.prototype.deleteEmployee = function (id) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        var url = this.baseUrl + "/" + id;
        return this.http.delete(url, options)
            .do(function (data) { return console.log('deleteEmployee: ' + JSON.stringify(data)); })
            .catch(this.handleError);
    };
    EmployeeService.prototype.saveEmployee = function (employee) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        if (employee.id === 0) {
            return this.createEmployee(employee, options);
        }
        return this.updateEmployee(employee, options);
    };
    EmployeeService.prototype.createEmployee = function (employee, options) {
        employee.id = undefined;
        return this.http.post(this.baseUrl, employee, options)
            .map(this.extractData)
            .do(function (data) { return console.log('createEmployee: ' + JSON.stringify(data)); })
            .catch(this.handleError);
    };
    EmployeeService.prototype.updateEmployee = function (employee, options) {
        var url = this.baseUrl + "/" + employee.id;
        return this.http.put(url, employee, options)
            .map(function () { return employee; })
            .do(function (data) { return console.log('updateEmployee: ' + JSON.stringify(data)); })
            .catch(this.handleError);
    };
    EmployeeService.prototype.extractData = function (response) {
        var body = response.json();
        return body.data || {};
    };
    EmployeeService.prototype.handleError = function (error) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable_1.Observable.throw(error.json().error || 'Server error');
    };
    EmployeeService.prototype.initializeEmployee = function () {
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
    };
    return EmployeeService;
}());
EmployeeService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], EmployeeService);
exports.EmployeeService = EmployeeService;
//# sourceMappingURL=employee.service.js.map