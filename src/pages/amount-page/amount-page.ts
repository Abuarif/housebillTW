import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the AmountPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-amount-page',
  templateUrl: 'amount-page.html'
})
export class AmountPagePage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello AmountPagePage Page');
  }

}
