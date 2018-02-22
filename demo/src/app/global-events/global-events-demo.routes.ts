import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DejaGlobalEventsDemoComponent } from './global-events-demo';

const routes: Routes = [
    { path: '', component: DejaGlobalEventsDemoComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' },
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
