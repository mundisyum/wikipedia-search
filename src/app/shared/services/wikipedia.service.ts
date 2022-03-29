import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class WikipediaService {
  private readonly _searchQuery = new BehaviorSubject<string>('');
  private readonly _searchResult = new BehaviorSubject<any[] | undefined | null>(null);
  readonly searchQuery$ = this._searchQuery.asObservable();
  readonly searchResult$ = this._searchResult.asObservable();
  isLoading: boolean = false;

  constructor(private http: HttpClient) {
  }

  searchArticles(searchString: string) {
    this._searchQuery.next(searchString);

    const params = new HttpParams()
      .set('action', 'query')
      .set('list', 'search')
      .set('srsearch', searchString)
      .set('format', 'json')
      .set('origin', '*')

    this.http.get<any>('https://en.wikipedia.org/w/api.php', {params}).pipe(
      map((response: any) => response?.query?.search),
      tap(search => this._searchResult.next(search))
    ).subscribe()
  }

  getArticle(title: string) {
    this.isLoading = true;

    const params = new HttpParams()
      .set('action', 'query')
      .set('titles', title)
      .set('prop', 'extracts')
      .set('exintro', 'true')
      .set('explaintext',  'true')
      .set('format', 'json')
      .set('origin', '*')

    return this.http.get<any>('https://en.wikipedia.org/w/api.php', {params}).pipe(
      tap((data) => {
        console.log(data);
        this.isLoading = false;
      })
    )
  }
}
