import { Component, OnInit, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { HackerNewsService } from 'src/app/services/hacker-news.service';
import { HackerItemModel } from 'src/app/models/hackeritem';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'hacker-news-application';
  take: number;
  skip: number;
  hackerItemList: HackerItemModel[];
  searchValue: string = '';
  searchButtonText: string = 'Search';
  loadingMoreButtonText = 'Load More Articles';

  isSearching: boolean = false;
  isLoadingMore: boolean = false;
  didSearch: boolean = false;

  constructor(private hackerNewsService: HackerNewsService) { }

  ngOnInit() {

    this.hackerItemList = null
    this.take = 10;

    // load the data
    this.loadArticles();
  }

  // load the initial data
  public loadArticles() {

    this.skip = 0;
    this.isSearching = true;
    this.didSearch = false;
    this.hackerItemList = [];

    // Call the service to load the data
    this.hackerNewsService.loadArticles(this.take, this.skip).subscribe((data) => {
      this.isSearching = false;
      this.hackerItemList = data;
    });
  }

  public loadMoreArticles() {

    // skip the latest we got back. Could send in last Id if we wanted to ensure we dont get duplicate data
    this.isLoadingMore = true;
    this.skip = this.skip + 10;
    this.loadingMoreButtonText = 'Loading...'

    // Call the service to load the data
    this.hackerNewsService.loadArticles(this.take, this.skip).subscribe((data) => {
      this.isLoadingMore = false;
      this.loadingMoreButtonText = 'Load More Articles'
      this.hackerItemList.push(...data)
    });
  }

  public searchArticles() {
    this.isSearching = true;
    this.didSearch = true;
    this.searchButtonText = 'Searching...'
    this.hackerItemList = [];

    // Call the service to search the data - Hardcoded to only look at the first 50.  
    this.hackerNewsService.searchArticles(this.searchValue, 50).subscribe((data) => {
      this.hackerItemList = data;
      this.searchButtonText = 'Search'
      this.isSearching = false;
    });
  }
}

