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
var router_1 = require("@angular/router");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/catch");
require("rxjs/add/operator/map");
require("rxjs/add/observable/of");
var employee_service_1 = require("./employee.service");
var EmployeeResolver = (function () {
    function EmployeeResolver(employeeService, router) {
        this.employeeService = employeeService;
        this.router = router;
    }
    EmployeeResolver.prototype.resolve = function (route, state) {
        var _this = this;
        var id = route.params['id'];
        // let id = route.paramMap.get('id');
        if (isNaN(+id)) {
            console.log("Employee id was not a number: " + id);
            this.router.navigate(['/employees']);
            return Observable_1.Observable.of(null);
        }
        return this.employeeService.getEmployee(+id)
            .map(function (employee) {
            if (employee) {
                return employee;
            }
            console.log("Employee was not found: " + id);
            _this.router.navigate(['/employees']);
            return null;
        })
            .catch(function (error) {
            console.log("Retrieval error: " + error);
            _this.router.navigate(['/employees']);
            return Observable_1.Observable.of(null);
        });
    };
    return EmployeeResolver;
}());
EmployeeResolver = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [employee_service_1.EmployeeService,
        router_1.Router])
], EmployeeResolver);
exports.EmployeeResolver = EmployeeResolver;
//# sourceMappingURL=employee-resolver.service.js.map