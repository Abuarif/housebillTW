import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import { Storage } from '@ionic/storage';
import { EquityPage } from '../equity/equity';
import { AmountPage } from '../amount/amount';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

bills: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, af:AngularFire, public alertCtrl: AlertController, public storage: Storage) {
  	this.bills = af.database.list('/bills');
  }

  logout(){
    console.log("signed out");
    this.storage.set('logged_in', 'false');
    this.navCtrl.popToRoot();
  }

  addBill(){
  	var date = new Date();
  	let prompt = this.alertCtrl.create({
  		title: 'Bill Title',
  		message: "Enter a title for your bill",
  		inputs: [
  			{
  				name: 'title',
  				placeholder: 'Title'

  			},
  			{
  				name: 'amount',
  				placeholder: 'Amount (RM)'
  			},
  		],
  		buttons: [
  			{
  				text: 'Cancel',
  				handler: data => {
  					console.log('Cancel clicked');
  				}
  			},
  			{
  				text: 'Save',
  				handler: data => {
            let month = date.getMonth() + 1;
  					this.bills.push({
  						title: data.title,
  						amount: data.amount,
  						timestamp: date.getDate() + "-" + month + "-" + date.getFullYear()
  					});
  				}
  			}
  		]
  	});
  	prompt.present();
  }

  equity(){

  	this.navCtrl.push(EquityPage);

  }

  showEquity(billID, billAmount){
    this.navCtrl.push(AmountPage, {
      param1: billID, param2: billAmount
    });
  }




}
