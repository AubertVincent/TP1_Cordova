import { Component } from '@angular/core';
import {NavParams } from 'ionic-angular';
import { Result } from '../home/home';
//import {InAppBrowser} from '@ionic-native/in-app-browser';
/**
 * Generated class for the DetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {
  //url:string;
  item: Result;
  //browser:InAppBrowser;

  constructor(navParams: NavParams, /*public iab: InAppBrowser*/) {
    this.item = navParams.data;
    //this.url = 'https://www.themoviedb.org/movie/' + this.item.id;
  //  this.browser=iab;
  }

  // lien(){
  //   this.iab.create(this.url,'_system');
  // }
}
