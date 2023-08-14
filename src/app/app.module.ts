import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/core/home/home.component';
import { SharedModule } from './shared/shared.module';
import { HeaderComponent } from './components/core/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './components/core/footer/footer.component';
import { Home2Component } from './components/core/home-2/home-2.component';


@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        Home2Component
    ],
    imports: [
        CommonModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule
    ],
    providers: []
})
export class AppModule { }
