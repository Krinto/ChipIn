import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, MenuController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { HomePage } from '../home/home';
import { SignupPage } from '../signup/signup';
import md5 from 'crypto-md5';

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

  email: string;
  password: string;
  loading: any;
  profilePicture: any = "https://www.gravatar.com/avatar/"

  constructor(public navCtrl: NavController, public navParams: NavParams, public authService: AuthService, public loadingCtrl: LoadingController, public menuCtrl: MenuController) {
    this.menuCtrl.swipeEnable(false);
  }

  ionViewDidLoad() {
    this.showLoader();

    this.authService.checkAuthentication().then((res) => {
      this.loading.dismiss();
      this.navCtrl.setRoot(HomePage);
    }, (err) => {
      this.loading.dismiss();
    });
  }

  login() {
    this.showLoader();

    let credentials = {
      email: this.email,
      password: this.password
    };

    this.authService.login(credentials).then((result) => {
      this.loading.dismiss();
      this.navCtrl.setRoot(HomePage);
    }, (err) => {
      this.loading.dismiss();
    });
  }
  
  launchSignup() {
    this.navCtrl.push(SignupPage);
  }

  showLoader() {
      this.loading = this.loadingCtrl.create({
        content: 'Authenticating...'
      });

      this.loading.present();
    }

    emailChanged(){
        this.profilePicture = "https://www.gravatar.com/avatar/" + md5(this.email.toLowerCase(), 'hex');
    }
}
