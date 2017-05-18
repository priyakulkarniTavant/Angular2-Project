"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var employee_list_component_1 = require("./employee-list.component");
var employee_detail_component_1 = require("./employee-detail.component");
var employee_edit_component_1 = require("./employee-edit.component");
var employee_edit_info_component_1 = require("./employee-edit-info.component");
var employee_edit_tags_component_1 = require("./employee-edit-tags.component");
var employee_filter_pipe_1 = require("./employee-filter.pipe");
var employee_service_1 = require("./employee.service");
var employee_resolver_service_1 = require("./employee-resolver.service");
var employee_guard_service_1 = require("./employee-guard.service");
var shared_module_1 = require("../shared/shared.module");
var EmployeeModule = (function () {
    function EmployeeModule() {
    }
    return EmployeeModule;
}());
EmployeeModule = __decorate([
    core_1.NgModule({
        imports: [
            shared_module_1.SharedModule,
            router_1.RouterModule.forChild([
                {
                    path: '',
                    component: employee_list_component_1.EmployeeListComponent
                },
                {
                    path: ':id',
                    component: employee_detail_component_1.EmployeeDetailComponent,
                    resolve: { employee: employee_resolver_service_1.EmployeeResolver }
                },
                {
                    path: ':id/edit',
                    component: employee_edit_component_1.EmployeeEditComponent,
                    resolve: { employee: employee_resolver_service_1.EmployeeResolver },
                    canDeactivate: [employee_guard_service_1.EmployeeEditGuard],
                    children: [
                        {
                            path: '',
                            redirectTo: 'info',
                            pathMatch: 'full'
                        },
                        {
                            path: 'info',
                            component: employee_edit_info_component_1.EmployeeEditInfoComponent
                        },
                        {
                            path: 'tags',
                            component: employee_edit_tags_component_1.EmployeeEditTagsComponent
                        }
                    ]
                }
            ])
        ],
        declarations: [
            employee_list_component_1.EmployeeListComponent,
            employee_detail_component_1.EmployeeDetailComponent,
            employee_edit_component_1.EmployeeEditComponent,
            employee_edit_info_component_1.EmployeeEditInfoComponent,
            employee_edit_tags_component_1.EmployeeEditTagsComponent,
            employee_filter_pipe_1.EmployeeFilterPipe
        ],
        providers: [
            employee_service_1.EmployeeService,
            employee_resolver_service_1.EmployeeResolver,
            employee_guard_service_1.EmployeeEditGuard
        ]
    })
], EmployeeModule);
exports.EmployeeModule = EmployeeModule;
//# sourceMappingURL=employee.module.js.map