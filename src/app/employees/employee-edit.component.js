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
var message_service_1 = require("../messages/message.service");
var employee_service_1 = require("./employee.service");
var EmployeeEditComponent = (function () {
    function EmployeeEditComponent(route, router, employeeService, messageService) {
        this.route = route;
        this.router = router;
        this.employeeService = employeeService;
        this.messageService = messageService;
        this.pageTitle = 'Employee Edit';
        this.dataIsValid = {};
    }
    Object.defineProperty(EmployeeEditComponent.prototype, "isDirty", {
        get: function () {
            return JSON.stringify(this.originalEmployee) !== JSON.stringify(this.currentEmployee);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EmployeeEditComponent.prototype, "employee", {
        get: function () {
            return this.currentEmployee;
        },
        set: function (value) {
            this.currentEmployee = value;
            // Clone the object to retain a copy
            this.originalEmployee = Object.assign({}, value);
        },
        enumerable: true,
        configurable: true
    });
    EmployeeEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        // Watch for changes to the resolve data
        this.route.data.subscribe(function (data) {
            _this.onEmployeeRetrieved(data['employee']);
        });
    };
    EmployeeEditComponent.prototype.onEmployeeRetrieved = function (employee) {
        this.employee = employee;
        // Adjust the title
        if (this.employee.id === 0) {
            this.pageTitle = 'Add Employee';
        }
        else {
            this.pageTitle = "Edit Employee: " + this.employee.employeeName;
        }
    };
    EmployeeEditComponent.prototype.deleteEmployee = function () {
        var _this = this;
        if (this.employee.id === 0) {
            // Don't delete, it was never saved.
            this.onSaveComplete(this.employee.employeeName + " was deleted");
        }
        else {
            if (confirm("Really delete the employee: " + this.employee.employeeName + "?")) {
                this.employeeService.deleteEmployee(this.employee.id)
                    .subscribe(function () { return _this.onSaveComplete(_this.employee.employeeName + " was deleted"); }, function (error) { return _this.errorMessage = error; });
            }
        }
    };
    EmployeeEditComponent.prototype.isValid = function (path) {
        var _this = this;
        this.validate();
        if (path) {
            return this.dataIsValid[path];
        }
        return (this.dataIsValid &&
            Object.keys(this.dataIsValid).every(function (d) { return _this.dataIsValid[d] === true; }));
    };
    EmployeeEditComponent.prototype.saveEmployee = function () {
        var _this = this;
        if (this.isValid(null)) {
            this.employeeService.saveEmployee(this.employee)
                .subscribe(function () { return _this.onSaveComplete(_this.employee.employeeName + " was saved"); }, function (error) { return _this.errorMessage = error; });
        }
        else {
            this.errorMessage = 'Please correct the validation errors.';
        }
    };
    EmployeeEditComponent.prototype.onSaveComplete = function (message) {
        if (message) {
            this.messageService.addMessage(message);
        }
        this.reset();
        // Navigate back to the employee list
        this.router.navigate(['/employees']);
    };
    // Reset the data
    // Required after a save so the data is no longer seen as dirty.
    EmployeeEditComponent.prototype.reset = function () {
        this.dataIsValid = null;
        this.currentEmployee = null;
        this.originalEmployee = null;
    };
    EmployeeEditComponent.prototype.validate = function () {
        // Clear the validation object
        this.dataIsValid = {};
        // 'info' tab
        if (this.employee.employeeName &&
            this.employee.employeeName.length >= 3 &&
            this.employee.employeeCode) {
            this.dataIsValid['info'] = true;
        }
        else {
            this.dataIsValid['info'] = false;
        }
        // 'tags' tab
        if (this.employee.department &&
            this.employee.department.length >= 3) {
            this.dataIsValid['tags'] = true;
        }
        else {
            this.dataIsValid['tags'] = false;
        }
    };
    return EmployeeEditComponent;
}());
EmployeeEditComponent = __decorate([
    core_1.Component({
        templateUrl: './app/employees/employee-edit.component.html',
        styleUrls: ['./app/employees/employee-edit.component.css']
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute,
        router_1.Router,
        employee_service_1.EmployeeService,
        message_service_1.MessageService])
], EmployeeEditComponent);
exports.EmployeeEditComponent = EmployeeEditComponent;
//# sourceMappingURL=employee-edit.component.js.map