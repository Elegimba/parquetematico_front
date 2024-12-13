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
import { roleGuard } from './guards/role.guard';
import { authGuard } from './guards/auth.guard';
import { MainComponent } from './pages/main/main.component';

export const routes: Routes = [
    { path: '', redirectTo: 'users', pathMatch: 'full' },
    { path: 'main', component: MainComponent },
    { path: 'users', component: WorkerListComponent, canActivate: [authGuard] },
    { path: 'users/:userId', component: DetailsUserComponent, canActivate: [authGuard] },
    { path: 'users/edit/:userId', component: EditUserComponent, canActivate: [authGuard] },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'attractions', component: AttractionsComponent },
    { path: 'attractions/create', component: NewAttractionComponent, canActivate: [roleGuard, authGuard] },
    { path: 'attractions/edit/:attractionId', component: UpdateAttractionComponent, canActivate: [authGuard] },
    { path: 'attractions/details/:attractionId', component: AttractionDetailsComponent },
    { path: 'comments', component: AllCommentsComponent, canActivate: [authGuard] },
    { path: ':userId/schedules', component: ScheduleListComponent, canActivate: [authGuard] },
    { path: 'schedules/create', component: CreateScheduleComponent, canActivate: [roleGuard, authGuard] },
    { path: 'schedules/:scheduleId', component: EditScheduleComponent, canActivate: [authGuard] }
];
