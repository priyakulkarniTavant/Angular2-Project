import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthGuard } from './user/auth-guard.service';
import { SelectiveStrategy } from './selective-strategy.service';

import { WelcomeComponent } from './home/welcome.component';
import { PageNotFoundComponent } from './page-not-found.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            { path: 'welcome', component: WelcomeComponent },
            {
                path: 'employees',
                canActivate: [ AuthGuard ],
                data: { preload: true },
                loadChildren: 'app/employees/employee.module#EmployeeModule'
            },
            { path: '', redirectTo: 'welcome', pathMatch: 'full' },
            { path: '**', component: PageNotFoundComponent }
        ], { preloadingStrategy: SelectiveStrategy }) // , { enableTracing: true })
    ],
    providers: [ SelectiveStrategy ],
    exports: [ RouterModule ]
})
export class AppRoutingModule { }
