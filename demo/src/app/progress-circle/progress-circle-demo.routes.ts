import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DejaProgressCircleDemoComponent } from './progress-circle-demo';

const routes: Routes = [
    { path: '', component: DejaProgressCircleDemoComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' },
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
