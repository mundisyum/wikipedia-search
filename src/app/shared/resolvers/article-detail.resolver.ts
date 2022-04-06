import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { WikipediaService } from '../services/wikipedia.service';

@Injectable({
  providedIn: 'root'
})
export class ArticleDetailResolver implements Resolve<any> {
  constructor(private wikipediaService: WikipediaService) {
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    const title = route.paramMap.get('title') as string;

    return this.wikipediaService.getArticle(title);
  }
}
