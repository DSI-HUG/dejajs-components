import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DejaColorSelectorDemoComponent } from './color-selector-demo';

const routes: Routes = [
    { path: '', component: DejaColorSelectorDemoComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' },
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
