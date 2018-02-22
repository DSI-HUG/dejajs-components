import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DejaContentEditableDemoComponent } from './content-editable-demo';

const routes: Routes = [
    { path: '', component: DejaContentEditableDemoComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' },
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
