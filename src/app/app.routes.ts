import { Routes } from '@angular/router';
import { AttractionsComponent } from './pages/attractions/attractions.component';
import { AttractionDetailsComponent } from './pages/attraction-details/attraction-details.component';

export const routes: Routes = [
    { path: 'attractions', component: AttractionsComponent },
    { path: 'attractions/:attractionsId', component: AttractionDetailsComponent }
];
