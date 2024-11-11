import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './users/dashboard/dashboard.component';
import { LogoutComponent } from './logout/logout.component';
import { AddComponent } from './users/add/add.component';
import { EditComponent } from './users/edit/edit.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'logout', component: LogoutComponent },
    { path: 'customer/add', component: AddComponent },
    { path: 'customer/edit/:id', component: EditComponent },
];


