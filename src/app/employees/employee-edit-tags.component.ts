import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEmployee } from './employee';

@Component({
    templateUrl: './app/employees/employee-edit-tags.component.html'
})
export class EmployeeEditTagsComponent implements OnInit {
    errorMessage: string;
    newTags = '';
    employee: IEmployee;

    constructor(private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.route.parent.data.subscribe(data => {
            this.employee = data['employee'];
        });
    }

    // Add the defined tags
    addTags(): void {
        let tagArray = this.newTags.split(',');
        this.employee.tags = this.employee.tags ? this.employee.tags.concat(tagArray) : tagArray;
        this.newTags = '';
    }

    // Remove the tag from the array of tags.
    removeTag(idx: number): void {
        this.employee.tags.splice(idx, 1);
    }
}
