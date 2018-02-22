import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DejaNumericStepperDemoComponent } from './numeric-stepper-demo.component';

const routes: Routes = [
    { path: '', component: DejaNumericStepperDemoComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' },
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
