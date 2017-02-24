import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Database } from '../../providers/database';

/*
  Generated class for the Category page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-category',
  templateUrl: 'category.html'
})
export class CategoryPage {

	category = [];

	constructor(public navCtrl: NavController, public navParams: NavParams, public dataService: Database) {}

	public load() {
		this.dataService.getCategory().then((result) => {
		this.category = <Array<Object>> result;
			console.log("after load");
			console.log(this.category);
		}, (error) => {
			console.log("Error: ", error);
		});
	}

	ionViewWillEnter() {
		this.load()
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad CategoryPage');
	}

}
