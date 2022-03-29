import { Component, OnInit } from '@angular/core';
import { WikipediaService } from '../shared/services/wikipedia.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(public wikipediaService: WikipediaService) {
  }

  ngOnInit(): void {
  }

}
