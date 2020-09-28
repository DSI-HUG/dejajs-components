import { ModuleWithProviders } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';
import { DejaIframeDemoComponent } from './iframe-demo/iframe-demo.component';

const routes: Routes = [
    { path: '', component: DejaIframeDemoComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' },
];

export const routing: ModuleWithProviders<Route> = RouterModule.forChild(routes);
