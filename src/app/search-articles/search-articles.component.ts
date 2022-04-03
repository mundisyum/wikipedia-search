import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map, take, tap } from 'rxjs/operators';

import { WikipediaService } from '../shared/services/wikipedia.service';

@Component({
  selector: 'app-search-articles',
  templateUrl: './search-articles.component.html',
  styleUrls: ['./search-articles.component.scss']
})
export class SearchArticlesComponent implements OnInit, OnDestroy {
  formSubscription = new Subscription();
  searchForm = new FormGroup({
    searchString: new FormControl('')
  })

  constructor(public wikipediaService: WikipediaService) {
  }

  ngOnInit() {
    this.formSubscription = this.wikipediaService.searchQuery$.pipe(
      take(1),
      tap(searchQuery => this.searchForm.patchValue({
        searchString: searchQuery
      }))
    ).subscribe()

    this.searchForm.valueChanges.pipe(
      map(data => data.searchString),
      debounceTime(500),
      distinctUntilChanged(),
      tap(searchString => this.wikipediaService.searchArticles(searchString))
    ).subscribe()
  }

  onSelectArticle(title: string) {
    this.wikipediaService.getArticle(title);
  }

  ngOnDestroy() {
    this.formSubscription.unsubscribe();
  }
}
