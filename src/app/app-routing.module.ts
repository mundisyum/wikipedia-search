import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { SearchArticlesComponent } from './search-articles/search-articles.component';
import { ArticleDetailResolver } from './shared/resolvers/article-detail.resolver';
import { AboutComponent } from "./about/about.component";

const routes: Routes = [
  {
    path: '', component: SearchArticlesComponent
  },
  {
    path: 'about', component: AboutComponent
  },
  {
    path: 'articles/:title',
    component: ArticleDetailComponent,
    resolve: {
      article: ArticleDetailResolver
    }
  },
  {
    path: '**',
    redirectTo: '',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
