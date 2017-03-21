import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {AngularFire, FirebaseListObservable} from 'angularfire2';


@Component({
  selector: 'page-amount',
  templateUrl: 'amount.html'
})
export class AmountPage {

users: FirebaseListObservable<any>;
billID;
billAmount;
userArray = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, af:AngularFire) {
  	 this.users = af.database.list('/users');
  	 this.billID = navParams.get('param1'); 
	   this.billAmount = navParams.get('param2');
  }

  ionViewDidLoad() {
  	this.users.subscribe((data)=> {
            data.forEach(item => {
                this.userArray.push(data);
            })
        });  
  }

  getPercentage(amt){
    return amt*100;
  }

  getAmount(equity){
    return equity*this.billAmount;
  }


}
