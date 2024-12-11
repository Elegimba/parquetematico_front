import { Routes } from '@angular/router';
import { AttractionsComponent } from './pages/attractions/attractions.component';
import { AttractionDetailsComponent } from './pages/attraction-details/attraction-details.component';
import { NewAttractionComponent } from './pages/new-attraction/new-attraction.component';

export const routes: Routes = [
    { path: 'attractions', component: AttractionsComponent },
    { path: 'attractions/create', component: NewAttractionComponent },
    { path: 'attractions/details/:attractionId', component: AttractionDetailsComponent }
];
