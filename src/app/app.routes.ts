import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                pathMatch: 'full',
                loadComponent() {
                    return import('./components/landing/landing.component').then(m => m.LandingComponent);
                }
            },
            {
                path: 'home',
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
        ]
    },
    
];
