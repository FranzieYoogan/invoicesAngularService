import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ItemsComponent } from './items/items.component';
import { ShowdataComponent } from './showdata/showdata.component';

export const routes: Routes = [

    { path: '', component: HomeComponent },
    { path: 'items', component: ItemsComponent },
    { path: 'showdata', component: ShowdataComponent },

];
