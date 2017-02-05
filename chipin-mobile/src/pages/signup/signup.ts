import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { HomePage } from '../home/home';

/*
  Generated class for the Signup page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {

  email: string;
  password: string;
  passwordConfirm: string;
  loading: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public authService: AuthService, public loadingCtrl: LoadingController) {}

  ionViewDidLoad() {
    
  }

  register() {
    if(this.password != this.passwordConfirm){
      console.log("passwords don't match");
      return;
    }
    this.loading = this.loadingCtrl.create({
      content: 'Registering...'
    });
 
    this.loading.present();

    let details = {
      email: this.email,
      password: this.password
    };

    this.authService.createAccount(details).then((result) => {
      this.loading.dismiss();
      this.navCtrl.setRoot(HomePage);
    }, (err) =>{
      this.loading.dismiss();
    });
  }
}
