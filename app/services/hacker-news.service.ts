import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HackerItemModel } from 'src/app/models/hackeritem';
import { HttpClient, HttpParams } from '@angular/common/http';

// should move to some app settings
const endpoint = 'http://localhost:63286';

@Injectable()
export class HackerNewsService {

  constructor(private http: HttpClient) { }

  // get all the latest news
  public loadArticles(take: number, skip: number): Observable<HackerItemModel[]> {
    let httpParams = new HttpParams()
      .set('take', take.toString())
      .set('skip', skip.toString());

    return this.http.get<HackerItemModel[]>(endpoint + '/HackerNews', {
      headers:
        { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }, params: httpParams
    }
    )
  }

  // search the the latest news
  public searchArticles(search: string, take: number): Observable<HackerItemModel[]> {
    let httpParams = new HttpParams()
      .set('searchString', search)
      .set('take', take.toString());

    return this.http.get<HackerItemModel[]>(endpoint + '/HackerNews/search', {
      headers:
        { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }, params: httpParams
    }
    )
  }
}
