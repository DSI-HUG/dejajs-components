import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DejaCircularPickerDemoComponent } from './circular-picker-demo';

const routes: Routes = [
    { path: '', component: DejaCircularPickerDemoComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' },
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
