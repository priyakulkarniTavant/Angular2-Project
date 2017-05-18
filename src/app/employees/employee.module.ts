import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EmployeeListComponent } from './employee-list.component';
import { EmployeeDetailComponent } from './employee-detail.component';
import { EmployeeEditComponent } from './employee-edit.component';
import { EmployeeEditInfoComponent } from './employee-edit-info.component';
import { EmployeeEditTagsComponent } from './employee-edit-tags.component';

import { EmployeeFilterPipe } from './employee-filter.pipe';
import { EmployeeService } from './employee.service';
import { EmployeeResolver } from './employee-resolver.service';
import { EmployeeEditGuard } from './employee-guard.service';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: EmployeeListComponent
      },
      {
        path: ':id',
        component: EmployeeDetailComponent,
        resolve: { employee: EmployeeResolver }
      },
      {
        path: ':id/edit',
        component: EmployeeEditComponent,
        resolve: { employee: EmployeeResolver },
        canDeactivate: [EmployeeEditGuard],
        children: [
          {
            path: '',
            redirectTo: 'info',
            pathMatch: 'full'
          },
          {
            path: 'info',
            component: EmployeeEditInfoComponent
          },
          {
            path: 'tags',
            component: EmployeeEditTagsComponent
          }
        ]
      }
    ])
  ],
  declarations: [
    EmployeeListComponent,
    EmployeeDetailComponent,
    EmployeeEditComponent,
    EmployeeEditInfoComponent,
    EmployeeEditTagsComponent,
    EmployeeFilterPipe
  ],
  providers: [
    EmployeeService,
    EmployeeResolver,
    EmployeeEditGuard
  ]
})
export class EmployeeModule { }
