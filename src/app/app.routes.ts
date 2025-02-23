import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'home',
        // pathMatch: 'full',
        loadComponent() {
            return import('./components/home/home.component').then(m => m.HomeComponent);
        }
    },
    {
        path: 'about',
        loadComponent() {
            return import('./components/about/about.component').then(m => m.AboutComponent);
        }
    },
    {
        path: 'contact',
        loadComponent() {
            return import('./components/contact/contact.component').then(m => m.ContactComponent);
        }
    }
];
