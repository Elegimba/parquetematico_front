import { Routes } from '@angular/router';
import { WorkerListComponent } from './pages/staff/worker-list/worker-list.component';
import { EditUserComponent } from './pages/staff/edit-user/edit-user.component';

export const routes: Routes = [
    { path: 'users', component: WorkerListComponent },
    { path: 'users/edit/:userId', component: EditUserComponent }
];
