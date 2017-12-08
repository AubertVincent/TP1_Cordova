import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

export interface Result {
  author: string;
  date: number;
  image: string;
  title: string;
}

const fakeResults: Result[] = [{
  author: 'Vincent AUBERT',
  date: 1996,
  image: 'https://i2.cdscdn.com/pdt2/1/5/3/1/200x200/adi4056558156153/rw/ballon-football-match-homologue-euro-16-omb-pro.jpg',
  title: 'Le but'
},{
    author: 'Bastien AUBERT',
    date: 2015,
    image: 'http://www.designthinking-kids.fr/wp-content/uploads/2016/05/Grenoble-INP-200x200.jpg',//'http://lorempixel.com/200/200/',//'https://www.planete-asm.fr/illustrations/image/Trophees/Coupe_Ligue_Trophee.jpg',
    title: 'INP'
  }, {
    author: 'Julien Courtial',
    date: 2015,
    image: 'http://sf1.viepratique.fr/wp-content/uploads/sites/8/2017/07/comment-filtrer-l-eau-de-pluie-200x200.jpg',//'http://lorempixel.com/200/200/',//'https://www.planete-asm.fr/illustrations/image/Trophees/Coupe_Ligue_Trophee.jpg',
    title: 'La déchéance d\'un major'
  }, {
    author: 'Cédric LAFRASSE',
    date: 2015,
    image: 'http://sf1.sport365.fr/wp-content/uploads/se/2017/04/foot-argent-200x200.jpg',//'http://lorempixel.com/200/200/',//'https://www.planete-asm.fr/illustrations/image/Trophees/Coupe_Ligue_Trophee.jpg',
    title: 'Les dangers des jeux'
  }, {
    author: 'Bastien TERRIER',
    date: 2015,
    image: 'http://www.blognomade.com/wp-content/uploads/sites/15/2017/03/suisse-montagne-200x200.jpg',//'http://lorempixel.com/200/200/',//'https://www.planete-asm.fr/illustrations/image/Trophees/Coupe_Ligue_Trophee.jpg',
    title: 'La montagne, ça vous gagne'
  }, {
    author: 'Servan CHARLOT',
    date: 2015,
    image: 'https://vignette.wikia.nocookie.net/town-of-salem-role-ideas/images/9/93/Troll_face_200x200.png/revision/latest?cb=20151222113400',
    title: 'L\'art du troll'
  }, {
    author: 'Zoran CHANET',
    date: 2015,
    image: 'http://www.nuntisunya.com/wp-content/uploads/2015/12/homme-blanc-face-200x200.jpg',
    title: 'L\'hiver ?'
  }, {
    author: 'Amina BOUCHEfRIMA',
    date: 2015,
    image: 'https://images.freeimages.com/images/premium/large-thumbs/4508/45086422-page-not-found-error-404-polar-bear-concept.jpg',
    title: '404 NOT FOUND'
  }]

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  films: Result[];
  constructor(public navCtrl: NavController) {
    this.films = fakeResults;
  }

  initializeFilms() {
    this.films = fakeResults;
  }

  getFilms(ev: any) {

    this.initializeFilms();
    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.films = this.films.filter((item) => {
        return (item.author.toLowerCase().indexOf(val.toLowerCase()) > -1
              ||item.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

}
