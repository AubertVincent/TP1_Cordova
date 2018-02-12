import { Component } from '@angular/core';
import { DetailsPage } from '../details/details';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpParams } from '@angular/common/http';
import { API_key } from '../../app/tmdb';
import 'rxjs/add/operator/switchMap';
import { AlertController, NavController, Platform } from 'ionic-angular';
import { Shake } from '@ionic-native/shake';
import { Subscription } from 'rxjs/Subscription';


export interface Result {
  title: string;
  overview:string;
  poster_path: string;
  backdrop_path: string;
  id: number;
  release_date: string;
  vote_average:number;
  original_title: string;
  original_language: string;
}


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  pushPage: any = DetailsPage;

  films: Observable<Result[]> = Observable.of([]);
  shakeSubscription: Subscription;

  constructor(
    private http_client: HttpClient,
    private platform: Platform,
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private shake: Shake) {
  }


  private discoverMovies() : Observable<Result[]> {
    return this.http_client.get<Result[]>('https://api.themoviedb.org/3/discover/movie',{
      params: new HttpParams().set('api_key', API_key).set('primary_release_year','2018')}).pluck('results');
  }


  private showRandomMovieAlert(movies: Result[]): void{
    let i = movies[Math.floor(Math.random() * movies.length)];

    let confirm = this.alertCtrl.create({
          title: i.title,
          message: i.overview,
          buttons: [
            {
              text: 'Cancel'
            },
            {
              text: 'Details',
              handler: () => {
                this.navCtrl.push(DetailsPage,i);
                console.log('Agree clicked');
              }
            }
          ]
    });
    confirm.present();
  }

 ionViewDidEnter():void{

  // this.shakeSubscription = this.shake.startWatch().switchMap(() => this.discoverMovies()).subscribe(movies => this.showRandomMovieAlert(movies));
   //this.shakeSub = Observable.fromPromise(this.platform.ready()).switchMap(() => this.shake.startWatch();
   this.shakeSubscription = Observable.fromPromise(this.platform.ready())
       .switchMap(() => this.shake.startWatch())
       .switchMap(() => this.discoverMovies())
       .subscribe(movies => this.showRandomMovieAlert(movies));
 }

 ionViewWillLeave():void{

   this.shakeSubscription.unsubscribe();

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
      params: new HttpParams().set('api_key', API_key).set('query',val).set('language','fr-FR')
    }).pluck('results');
  }
}
