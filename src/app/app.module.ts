import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/core/home/home.component';
import { SharedModule } from './shared/shared.module';
import { HeaderComponent } from './components/core/header/header.component';


@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        HeaderComponent
    ],
    imports: [
        CommonModule,
        AppRoutingModule,
        HttpClientModule,
        SharedModule
    ],
    providers: []
})
export class AppModule { }
