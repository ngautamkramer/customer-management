import { Routes } from '@angular/router';
import { authGuard } from './services/auth-guard.service';


export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./home/home.component').then((m) => m.HomeComponent),
        data: {
            title: 'Home',
            description: 'Welcome to our homepage',
            keywords: 'home, seo'
        }
    },
    {
        path: 'login',
        loadComponent: () => import('./login/login.component').then((m) => m.LoginComponent),
        data: {
            title: 'Login',
            description: 'Welcome to our login page',
            keywords: 'login, seo'
        }
    },
    {
        path: 'register',
        loadComponent: () => import('./register/register.component').then((m) => m.RegisterComponent),
        data: {
            title: 'Register',
            description: 'Welcome to our register page',
            keywords: 'register, seo'
        }
    },
    {
        path: 'customer/list',
        loadComponent: () => import('./users/list/list.component').then((m) => m.ListComponent),
        canActivate: [authGuard],
        data: {
            title: 'Customer List',
            description: 'Welcome to our customer list',
            keywords: 'customer list, seo'
        }
    },
    {
        path: 'logout',
        loadComponent: () => import('./logout/logout.component').then((m) => m.LogoutComponent),
        data: {
            title: 'Logout',
            description: 'Welcome to our logout',
            keywords: 'logout, seo'
        }
    },
    {
        path: 'customer/add',
        loadComponent: () => import('./users/add/add.component').then((m) => m.AddComponent),
        canActivate: [authGuard],
        data: {
            title: 'Add New Customer',
            description: 'Welcome to our add customer oage',
            keywords: 'add customer, seo'
        }
    },
    {
        path: 'customer/edit/:id',
        loadComponent: () => import('./users/edit/edit.component').then((m) => m.EditComponent),
        canActivate: [authGuard],
        data: {
            title: 'Edit Customer',
            description: 'Welcome to our edit customer page',
            keywords: 'edit customer, seo'
        }
    },
    {
        path: 'change-password',
        loadComponent: () => import('./change-password/change-password.component').then((m) => m.ChangePasswordComponent),
        canActivate: [authGuard],
        data: {
            title: 'Change Password',
            description: 'Welcome to our change password page',
            keywords: 'change password, seo'
        }
    },
    {
        path: 'dashboard',
        loadComponent: () => import('./users/dashboard/dashboard.component').then((m) => m.DashboardComponent),
        canActivate: [authGuard],
        data: {
            title: 'dashboard',
            description: 'Welcome to our dashboard page',
            keywords: 'change password, seo'
        },
        children: [
            { path: '', redirectTo: 'stats', pathMatch: 'full' },
            {
                path: 'stats',
                loadComponent: () => import('./users/dashboard-charts/dashboard-charts.component').then((m) => m.DashboardChartsComponent),
            },
            {
                path: 'location',
                loadComponent: () => import('./users/dashboard-curr-location/dashboard-curr-location.component').then((m) => m.DashboardCurrLocationComponent),
            },
            {
                path: 'weather',
                loadComponent: () => import('./users/dashboard-curr-weather/dashboard-curr-weather.component').then((m) => m.DashboardCurrWeatherComponent),
            }
        ]
    },
    {
        path: 'customer/chats',
        loadComponent: () => import('./chat/chat.component').then((m) => m.ChatComponent),
        canActivate: [authGuard],
        data: {
            title: 'Chat',
            description: 'Welcome to our chat page',
            keywords: 'Chat page, seo'
        }
    }

];