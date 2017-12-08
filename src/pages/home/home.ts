import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DetailsPage } from '../details/details';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpParams } from '@angular/common/http';
import { API_key } from '../../app/tmdb';

export interface Result {
  title: string;
  overview:string;
  poster_path: string;
  backdrops_path: string;
  //id: integer;  //?? integer n'est pas accepté
  release_date: string;
}


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  pushPage: any = DetailsPage;

  films: Observable<Result[]> = Observable.of([]);

  constructor(private http_client : HttpClient) {

  }

  getFilms(ev: any) : void {

    // set val to the value of the searchbar
    const val : string = ev.target.value;

    if (val){
      this.films = this.fetchResults(val);
    } else{
      this.films = Observable.of([]);
    }
  }

  fetchResults(val : string): Observable<Result[]>{
    return this.http_client.get<Result[]>('https://api.themoviedb.org/3/search/movie',{
      params: new HttpParams().set('api_key', API_key).set('query',val)
    }).pluck('results');
  }
}
