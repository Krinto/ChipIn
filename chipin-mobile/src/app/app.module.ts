import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SignupPage } from '../pages/signup/signup';
import { LoginPage } from '../pages/login/login';
import { AuthService } from '../providers/auth-service';
import { RecipeService } from '../providers/recipe-service'; 

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SignupPage,
    LoginPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SignupPage,
    LoginPage
  ],
  providers: [
      {provide: ErrorHandler, useClass: IonicErrorHandler},
      Storage,
      AuthService,
      RecipeService
    ]
})
export class AppModule {}
