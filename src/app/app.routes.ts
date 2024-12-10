import { Routes } from '@angular/router';
import { WorkerListComponent } from './pages/staff/worker-list/worker-list.component';

import { DetailsUserComponent } from './pages/staff/details-user/details-user.component';
import { EditUserComponent } from './pages/staff/edit-user/edit-user.component';

export const routes: Routes = [
    { path: 'users', component: WorkerListComponent },
    { path: 'users/:userId', component: DetailsUserComponent },
    { path: 'users/edit/:userId', component: EditUserComponent },
];
