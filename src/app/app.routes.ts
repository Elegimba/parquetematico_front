import { Routes } from '@angular/router';
import { WorkerListComponent } from './pages/staff/worker-list/worker-list.component';
import { DetailsUserComponent } from './pages/staff/details-user/details-user.component';
import { EditUserComponent } from './pages/staff/edit-user/edit-user.component';
import { RegisterComponent } from './pages/users/register/register.component';
import { LoginComponent } from './pages/users/login/login.component';
import { AttractionsComponent } from './pages/attractions-pages/attractions/attractions.component';
import { AttractionDetailsComponent } from './pages/attractions-pages/attraction-details/attraction-details.component';
import { NewAttractionComponent } from './pages/attractions-pages/new-attraction/new-attraction.component';
import { UpdateAttractionComponent } from './pages/attractions-pages/update-attraction/update-attraction.component';
import { ScheduleListComponent } from './pages/schedules_pages/schedule-list/schedule-list.component';

import { AllCommentsComponent } from './pages/comments/all-comments/all-comments.component';
import { CreateScheduleComponent } from './pages/schedules_pages/create-schedule/create-schedule.component';
import { EditScheduleComponent } from './pages/schedules_pages/edit-schedule/edit-schedule.component';

export const routes: Routes = [
    { path: '', redirectTo: 'users', pathMatch: 'full' },
    { path: 'users', component: WorkerListComponent },
    { path: 'users/:userId', component: DetailsUserComponent },
    { path: 'users/edit/:userId', component: EditUserComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'attractions', component: AttractionsComponent },
    { path: 'attractions/create', component: NewAttractionComponent },
    { path: 'attractions/edit/:attractionId', component: UpdateAttractionComponent },
    { path: 'attractions/details/:attractionId', component: AttractionDetailsComponent },
    { path: 'comments', component: AllCommentsComponent },
    { path: ':userId/schedules', component: ScheduleListComponent },
    { path: 'schedules/create', component: CreateScheduleComponent },
    { path: 'schedules/:scheduleId', component: EditScheduleComponent }
];
