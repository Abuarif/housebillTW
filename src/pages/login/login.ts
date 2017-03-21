import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import { Storage } from '@ionic/storage';
import { AuthService } from '../../providers/auth-service';
import { HomePage } from '../home/home';
/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {


  constructor(public alertCtrl: AlertController, public nav: NavController, public af:AngularFire, private _auth: AuthService, public storage: Storage) {
  	this.nav = nav;
  }

  ionViewDidLoad() {
     this.storage.ready().then(() => {

       this.storage.get('logged_in').then((data) => {
         if(data == 'true'){
            this.onSignInStatus('Successfully Logged In', 'Welcome Back!', true);
         }
       })
     });
  }

  userData = {email: '', password: ''}
  login(){
	this.af.auth.login({
	  email: this.userData.email,
	  password: this.userData.password,
	},
	{
	  provider: AuthProviders.Password,
	  method: AuthMethods.Password,
	}).then((success) => {
    this.storage.set('logged_in', 'true');
		this.onSignInStatus('Successfully Logged In', 'Welcome Back!', true);
	}).catch((err) => {
		this.onSignInStatus('Login Failed', 'Please Try Again', false)
	})

  }

  signInWithFacebook(): void {
    this._auth.signInWithFacebook()
      .then(() => this.onSignInStatus('Successfully Logged In', 'Welcome Back!',true));
  }

  private onSignInStatus(titleMsg, subTMsg, status: boolean): void {    
    //console.log("Facebook display name ",this._auth.displayName());
  	let alert = this.alertCtrl.create({
    	title: titleMsg,
    	subTitle: subTMsg,
    	buttons:['OK']
    });

    alert.present();

    if(status){
  	this.nav.push(HomePage);}
    
  }

}
