import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { registerLocaleData } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MenuContentComponent } from './menu-content/menu-content.component';
import { MainModuleComponent } from './main-module/main-module.component';

import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    // { path: 'mainmodule', component: MainModuleComponent, canActivate: [authGuard] },
    { path: 'mainmodule', component: MainModuleComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
];