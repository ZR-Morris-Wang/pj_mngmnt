import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'projects',
        pathMatch: 'full',
    },
    {
        path: 'projects',
        children: [{
            path: '',
            pathMatch: 'full',
            loadComponent() {
                return import('./components/landing/landing.component').then(m => m.LandingComponent);
            },
            outlet: "abc"
        },
        {
            path: 'home',
            loadComponent() {
                return import('./components/home/home.component').then(m => m.HomeComponent);
            },
            outlet: "abc"
        },
        {
            path: 'about',
            loadComponent() {
                return import('./components/about/about.component').then(m => m.AboutComponent);
            },
            outlet: "abc"
        },
        {
            path: 'contact',
            loadComponent() {
                return import('./components/contact/contact.component').then(m => m.ContactComponent);
            },
            outlet: "abc"
        },
        {
            path: 'contact',
            loadComponent() {
                return import("./components/header/header.component").then(m => m.HeaderComponent);
            },
            outlet: "primary"
        }
        ],
    }];
