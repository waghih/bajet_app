import { Component} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DashboardPage } from '../../pages/dashboard/dashboard';

/*
  Generated class for the Home page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	component: DashboardPage;

	constructor(public navCtrl: NavController, public navParams: NavParams) {
		// nav.setRoot(DashboardPage);		
	}

}
