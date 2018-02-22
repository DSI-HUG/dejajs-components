import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MatButtonModule, MatButtonToggleModule, MatIconModule, MatListModule, MatMenuModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { DejaClipboardModule, DejaMaterialColorsModule, DejaSidenavModule, DejaSlimScrollModule } from '@deja-js/component';
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
        HttpModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatIconModule,
        MatListModule,
        MatMenuModule,
        DejaMaterialColorsModule,
        DejaSidenavModule,
        DejaSlimScrollModule,
        DejaClipboardModule.forRoot(),
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
