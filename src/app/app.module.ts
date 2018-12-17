import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/core/home/home.component';
import { SharedModule } from './components/shared/shared.module';


@NgModule({
    declarations: [
        AppComponent,
        HomeComponent
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
