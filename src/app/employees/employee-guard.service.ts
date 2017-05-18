import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';

import { EmployeeEditComponent } from './employee-edit.component';

@Injectable()
export class EmployeeEditGuard implements CanDeactivate<EmployeeEditComponent> {

    canDeactivate(component: EmployeeEditComponent): boolean {
        if (component.isDirty) {
            let employeeName = component.employee.employeeName || 'New Employee';
            return confirm(`Navigate away and lose all changes to ${employeeName}?`);
        }
        return true;
    }
}
