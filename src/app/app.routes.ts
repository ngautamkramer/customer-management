import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './users/dashboard/dashboard.component';
import { LogoutComponent } from './logout/logout.component';
import { AddComponent } from './users/add/add.component';
import { EditComponent } from './users/edit/edit.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { authGuard } from './services/auth-guard.service';

export const routes: Routes = [
    { path: '', component: HomeComponent, data: { title: 'Home', description: 'Welcome to our homepage', keywords: 'home, seo' }},
    { path: 'login', component: LoginComponent, data: { title: 'Login', description: 'Welcome to our login page', keywords: 'login, seo' }},
    { path: 'register', component: RegisterComponent, data: { title: 'Register', description: 'Welcome to our register page', keywords: 'register, seo' }},
    { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard], data: { title: 'Dashboard', description: 'Welcome to our dashboard', keywords: 'dashboard, seo' }},
    { path: 'logout', component: LogoutComponent, data: { title: 'Logout', description: 'Welcome to our logout', keywords: 'logout, seo' }},
    { path: 'customer/add', component: AddComponent, canActivate: [authGuard], data: { title: 'Add New Customer', description: 'Welcome to our add customer oage', keywords: 'add customer, seo' }},
    { path: 'customer/edit/:id', component: EditComponent, canActivate: [authGuard], data: { title: 'Edit Customer', description: 'Welcome to our edit customer page', keywords: 'edit customer, seo' }},
    { path: 'change-password', component: ChangePasswordComponent, canActivate: [authGuard], data: { title: 'Change Password', description: 'Welcome to our change password page', keywords: 'change password, seo' }},
];