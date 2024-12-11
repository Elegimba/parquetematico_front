import { Routes } from '@angular/router';
import { WorkerListComponent } from './pages/staff/worker-list/worker-list.component';

import { DetailsUserComponent } from './pages/staff/details-user/details-user.component';
import { EditUserComponent } from './pages/staff/edit-user/edit-user.component';
import { RegisterComponent } from './pages/users/register/register.component';

export const routes: Routes = [
    { path: '', redirectTo: 'users', pathMatch: 'full' },
    { path: 'users', component: WorkerListComponent },
    { path: 'users/:userId', component: DetailsUserComponent },
    { path: 'users/edit/:userId', component: EditUserComponent },
    { path: 'register', component: RegisterComponent }
];
