import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AuthService } from '../providers/auth-service';
import { IonicStorageModule } from '@ionic/storage';

//import pages
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { EquityPage } from '../pages/equity/equity';
import { AmountPage } from '../pages/amount/amount';

//import angularfire2
import { AngularFireModule } from 'angularfire2';

export const firebaseConfig = {
  	apiKey: "AIzaSyDJveZmSWNG8nMBPveLX92xMFPwwDPAAh8",
    authDomain: "studentapp-580ae.firebaseapp.com",
    databaseURL: "https://studentapp-580ae.firebaseio.com",
    storageBucket: "studentapp-580ae.appspot.com",
    messagingSenderId: "1089826302598"

};

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    RegisterPage,
    EquityPage,
    AmountPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    RegisterPage,
    EquityPage,
    AmountPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, AuthService]
})
export class AppModule {}

