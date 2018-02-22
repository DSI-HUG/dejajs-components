import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DejaIntervalSelectorDemoComponent } from './interval-selector-demo';

const routes: Routes = [
    { path: '', component: DejaIntervalSelectorDemoComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' },
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
