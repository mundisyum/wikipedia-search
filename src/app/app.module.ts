import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { TuiRootModule } from "@taiga-ui/core";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TuiInputModule } from '@taiga-ui/kit';

import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { SearchArticlesComponent } from './search-articles/search-articles.component';
import { HeaderComponent } from './header/header.component';
import { AboutComponent } from './about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    ArticleDetailComponent,
    SearchArticlesComponent,
    HeaderComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    // BrowserAnimationsModule,
    TuiRootModule,
    TuiInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
