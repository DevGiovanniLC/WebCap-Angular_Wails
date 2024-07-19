import { Routes } from '@angular/router';

import { HomePageComponent } from './pages/home-page/home-page.component';
import { FormatconverterPageComponent } from './pages/formatconverter-page/formatconverter-page.component';
export const routes: Routes = [
    {path:"", redirectTo:"home", pathMatch:"full"},
    { path: 'home', loadComponent: () => HomePageComponent },
    { path: "formatconverter", loadComponent: () => FormatconverterPageComponent },
];  
