import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DejaDatePickerDemoComponent } from './date-picker-demo';

const routes: Routes = [
    { path: '', component: DejaDatePickerDemoComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' },
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
