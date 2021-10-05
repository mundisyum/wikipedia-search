import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { WikipediaService } from '../shared/services/wikipedia.service';

@Component({
  selector: 'app-search-articles',
  templateUrl: './search-articles.component.html',
  styleUrls: ['./search-articles.component.scss']
})
export class SearchArticlesComponent implements OnInit {
  articles$: Observable<any> = new Observable<any>();
  searchQuery = new Subject<string>();
  searchForm = new FormGroup({
    searchString: new FormControl('')
  })

  constructor(private wikipediaService: WikipediaService) {
  }

  ngOnInit() {
    this.articles$ = this.searchQuery.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(searchQuery => this.wikipediaService.searchArticles(searchQuery))
    )
  }

  onKey(value: string) {
    this.searchQuery.next(value);
  }

  onSelectArticle(title: string) {
    this.wikipediaService.getArticle(title);
  }
}
