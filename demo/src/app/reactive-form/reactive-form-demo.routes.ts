import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DejaReactiveFormDemoComponent } from './reactive-form-demo';

const routes: Routes = [
    { path: '', component: DejaReactiveFormDemoComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' },
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
