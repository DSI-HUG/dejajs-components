import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DejaSnackbarDemoComponent } from './snackbar-demo';

const routes: Routes = [
    { path: '', component: DejaSnackbarDemoComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' },
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
