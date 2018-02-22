import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DejaMessageBoxDemoComponent } from './message-box-demo';

const routes: Routes = [
    { path: '', component: DejaMessageBoxDemoComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' },
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
