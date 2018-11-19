import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';

import { ListChildrenComponent } from './list-children/list-children.component';
import { AddChildComponent } from "./add-child/add-child.component";
import { ViewChildComponent } from "./view-child/view-child.component";
import { SantaService } from './services/santaService.service';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { BingMapComponent } from './bingmap/bigmap.component';

import { MapModule, BingMapAPILoaderConfig, BingMapAPILoader, WindowRef, DocumentRef, MapAPILoader } from 'angular-maps'

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    ListChildrenComponent,
    AddChildComponent,
    ViewChildComponent,
    LoginComponent,
    RegisterComponent,
    BingMapComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MapModule.forRootBing(),

    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'children', component: ListChildrenComponent },
      { path: 'add-child', component: AddChildComponent },
      { path: 'view-child', component: ViewChildComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent }
    ])
  ],
  providers: [SantaService, {
    provide: MapAPILoader, deps: [], useFactory: BingMapServiceProviderFactory }],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function BingMapServiceProviderFactory() {
  let bc: BingMapAPILoaderConfig = new BingMapAPILoaderConfig();
  bc.apiKey = "AqTphCdmSXI_8V-8D2qmRIOcDTguydViea3VQ9gA9gJ_P_kEYp2WBShwR12cPwIX";
  bc.branch = "experimental";
  return new BingMapAPILoader(bc, new WindowRef(), new DocumentRef());
}
