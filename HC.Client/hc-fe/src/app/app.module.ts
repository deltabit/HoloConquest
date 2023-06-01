import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { HomeModule } from './modules/home/home.module';
import { AuthModule } from './modules/auth/auth.module';
import { GameReadyComponent } from './modules/game-ready/game-ready.component';
import { SmartContractService } from './services/smart-contract.service';

@NgModule({
    declarations: [
        AppComponent,
        GameReadyComponent,
    ],
    providers: [
        SmartContractService
    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        SharedModule,
        HomeModule,
        AuthModule
    ]
})
export class AppModule { }
