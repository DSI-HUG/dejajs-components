import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelectDemoComponent } from './select-demo';

const routes: Routes = [
    { path: '', component: SelectDemoComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' },
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
