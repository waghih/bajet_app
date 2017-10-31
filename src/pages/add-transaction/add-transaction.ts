import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder } from '@angular/forms';
import { Database } from '../../providers/database';

/*
  Generated class for the AddTransaction page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-add-transaction',
  templateUrl: 'add-transaction.html'
})
export class AddTransactionPage {

	transaction_form = {};
	categories = [];
	transaction_type;

	constructor(public navCtrl: NavController, 
				public navParams: NavParams, 
				public dataService: Database, 
				public formBuilder: FormBuilder) {

		this.transaction_form = this.formBuilder.group({
			category: '',
			amount: '',
			description:'',
			monthly_repeat: false
		});

	}

	public loadCategories() {
		this.dataService.getCategory().then((result) => {
		this.categories = <Array<Object>> result;
			console.log("after load");
			console.log(this.categories);
		}, (error) => {
			console.log("Error: ", error);
		});
	}

	ionViewWillEnter() {
		this.loadCategories()
	}

	ionViewDidLoad() {
		this.transaction_type = this.navParams.get('type').transaction_type;
		console.log(this.transaction_type);
	}

	saveTransaction(transaction) {
		var created_at = new Date();
		var month = created_at.getMonth()+1;
		var day = created_at.getDate();
		var year = created_at.getFullYear();
		transaction.created_at = created_at;
		transaction.day = day;
		transaction.month = month;
		transaction.year = year;
		console.log(transaction);
	}

}
