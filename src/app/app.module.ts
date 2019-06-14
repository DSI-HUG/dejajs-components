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
import { MatButtonModule, MatButtonToggleModule, MatIconModule, MatListModule, MatMenuModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DejaSidenavModule } from '@deja-js/component/sidenav';
import { DejaClipboardModule } from '@deja-js/core';
import { DejaMaterialColorsModule, DejaSlimScrollModule, IconModule } from '@deja-js/core';
import { AppComponent } from './app.component';
import { routing } from './app.routes';
import { CountriesListService } from './services/countries-list.service';
import { CountriesService } from './services/countries.service';
import { FoldersService } from './services/folders.service';
import { NewsService } from './services/news.service';
import { PeopleService } from './services/people.service';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        FormsModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatIconModule,
        MatListModule,
        MatMenuModule,
        DejaMaterialColorsModule,
        DejaSidenavModule.forRoot(),
        DejaSlimScrollModule,
        DejaClipboardModule.forRoot(),
        IconModule,
        routing,
    ],
    providers: [
        CountriesListService,
        CountriesService,
        FoldersService,
        NewsService,
        PeopleService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
