import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DejaAccordionDemoComponent } from './accordion-demo.component';

const routes: Routes = [
    { path: '', component: DejaAccordionDemoComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' },
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
