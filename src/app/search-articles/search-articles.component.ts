import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, map, mapTo, take, tap, withLatestFrom } from 'rxjs/operators';

import { WikipediaService } from '../shared/services/wikipedia.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search-articles',
  templateUrl: './search-articles.component.html',
  styleUrls: ['./search-articles.component.scss']
})
export class SearchArticlesComponent implements OnInit {
  searchForm = new FormGroup({
    searchString: new FormControl('')
  })

  constructor(public wikipediaService: WikipediaService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.queryParamMap.pipe(
      map(params => params.get('query') ?? ''),
      tap(query => {
        const searchInputValue = this.searchForm.get('searchString')?.value;
        if (searchInputValue !== query) {
          this.searchForm.patchValue({searchString:  query})
        }
      }),
      withLatestFrom(this.wikipediaService.latestQuery$),
      filter(([routerQuery, latestQuery]) => routerQuery !== latestQuery),
      map(([query, _]) => query),
      debounceTime(250),
      distinctUntilChanged(),
      tap(searchString => this.wikipediaService.searchArticles(searchString))
    ).subscribe()

    this.searchForm.valueChanges.pipe(
      map(data => data.searchString),
      tap(searchString => this.setQueryParams(searchString))
    ).subscribe()
  }

  setQueryParams(searchString: string) {
    const queryParams = {query: searchString === '' ? null : searchString};
    this.router.navigate([''], {queryParams, relativeTo: this.route})
  }
}
