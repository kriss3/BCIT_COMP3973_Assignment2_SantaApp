import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';

import { ListChildrenComponent } from './list-children/list-children.component';
import { AddChildComponent } from "./add-child/add-child.component";
import { ViewChildComponent } from "./view-child/view-child.component";
import { SantaService } from './services/santaService.service';
import { DataService } from './shared/dataService';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    ListChildrenComponent,
    AddChildComponent,
    ViewChildComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'children', component: ListChildrenComponent },
      { path: 'add-child', component: AddChildComponent },
      { path: 'view-child', component: ViewChildComponent }  
    ])
  ],
  providers: [SantaService, DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
