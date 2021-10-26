/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DejaMaterialColorsModule, DejaSlimScrollModule, DejaTextMetricsModule, IconModule } from '@deja-js/component/core';
import { DejaSidenavModule } from '@deja-js/component/sidenav';

import { AppComponent } from './app.component';
import { routing } from './app.routes';
import { CountriesService } from './services/countries.service';
import { CountriesListService } from './services/countries-list.service';
import { FoldersService } from './services/folders.service';
import { NewsService } from './services/news.service';
import { PeopleService } from './services/people.service';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        DejaMaterialColorsModule,
        DejaSidenavModule,
        DejaSlimScrollModule,
        DejaTextMetricsModule,
        FormsModule,
        HttpClientModule,
        IconModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatIconModule,
        MatListModule,
        MatMenuModule,
        routing
    ],
    providers: [
        CountriesListService,
        CountriesService,
        FoldersService,
        NewsService,
        PeopleService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
