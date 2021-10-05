import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss']
})
export class ArticleDetailComponent implements OnInit {
  article$: Observable<any> | undefined;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.article$ = this.route.data.pipe(
      map(data => {
        const article = Object.values(data.article.query.pages)[0];

        return article;
      })
    )
  }

}
