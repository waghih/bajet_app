import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Database } from '../../providers/database';
import { Chart } from 'chart.js';
import { AlertController } from 'ionic-angular';
import { AddTransactionPage } from '../add-transaction/add-transaction';


/*
  Generated class for the Dashboard page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html'
})
export class DashboardPage {

	@ViewChild('lineCanvas') lineCanvas;
	@ViewChild('doughnutCanvas') doughnutCanvas;
	lineChart: any;
	doughnutChart: any;

	account: any;
	wallet_balance: number;
	wallet_spent: number;
	current_expense: any;

	constructor(public navCtrl: NavController, 
				public navParams: NavParams, 
				public dataService: Database, 
				public alertCtrl: AlertController) {}
	
	public onPageDidEnter() {
		this.loadAccount();
		this.loadExpense();
	}

	ionViewWillLoad() {
		this.loadAccount();
		this.loadExpense();
	}

	loadExpense() {
		let current_month = new Date().getMonth();
		this.dataService.getCurrentExpense(current_month).then((result) => {
			this.current_expense = <Array<Object>> result;
			console.log(this.current_expense);
		}, (error) => {
			console.log("Error: ", error);			
		});
	}

	loadAccount() {
		this.dataService.getAccount().then((result) => {
		this.account = <Array<Object>> result;
			console.log("after load");
			if(this.account[0].monthly_income == 0 || this.account.length == 0) {
				this.showPrompt(this.account[0]);
			}
			console.log(this.account);
			this.wallet_balance = this.account[0].account_balance;
			this.wallet_spent = (this.account[0].monthly_income - this.account[0].account_balance);
		}, (error) => {
			console.log("Error: ", error);
		});
	}


	showPrompt(account) {
		let prompt = this.alertCtrl.create({
		title: 'Zero income!',
		message: "Opss! We need your monthly income to track your spending",
		inputs: [
			{
			  name: 'income',
			  type: 'number',
			  placeholder: 'Income'
			},
		],
		buttons: [
			{
			  text: 'Cancel',
			  handler: data => {
			    console.log(data);
			  }
			},
			{
			  text: 'Save',
			  handler: data => {
			  	let income = Number(data.income);
			  	if (income == 0) {
			  		this.showPrompt(account);
			  	} else {
				  	let account_info = {
				  		monthly_income: income,
				  		account_balance: account.account_balance+income,
				  		current_month: account.current_month
				  	}
				  	this.dataService.updateAccount(account_info).then((data) => {
				  		this.loadAccount();
				  	});
				    console.log(account_info);			  		
			  	}
			  }
			}
		]
		});
		prompt.present();
	}

	ionViewDidLoad() {

		let day = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];

		// this.lineChart = new Chart(this.lineCanvas.nativeElement, {
  //           type: 'line',
  //           data: {
  //               labels: day,
  //               datasets: [
  //                   {
  //                       label: "My First dataset",
  //                       fill: false,
  //                       lineTension: 0.1,
  //                       backgroundColor: "rgba(75,192,192,0.4)",
  //                       borderColor: "rgba(75,192,192,1)",
  //                       borderCapStyle: 'butt',
  //                       borderWidth: 3,
  //                       borderDash: [],
  //                       borderDashOffset: 0.0,
  //                       borderJoinStyle: 'miter',
  //                       pointBorderColor: "rgba(75,192,192,1)",
  //                       pointBackgroundColor: "#fff",
  //                       pointBorderWidth: 3,
  //                       pointHoverRadius: 5,
  //                       pointHoverBackgroundColor: "rgba(75,192,192,1)",
  //                       pointHoverBorderColor: "rgba(220,220,220,1)",
  //                       pointHoverBorderWidth: 2,
  //                       pointRadius: 3,
  //                       pointHitRadius: 10,
  //                       data: [65, 59, 80, 81, 0, 55, 40,0],
  //                       spanGaps: true,
  //                   }
  //               ]
  //           },
  //           options: {
  //           	scaleShowVerticalLines: false,
  //           	scales: {
		// 		    xAxes: [{
		// 		                gridLines: {
		// 		                    display:false
		// 		                }
		// 		            }],
		// 		    yAxes: [{
		// 		                gridLines: {
		// 		                    display:false,
		// 		                }
		// 		            }]
		// 		}
  //           }
 
  //       });

        this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
 
            type: 'doughnut',
            data: {
                labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
                datasets: [{
                    label: '# of Votes',
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    hoverBackgroundColor: [
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56",
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56"
                    ]
                }]
            },
            options: {
            	responsive: true
            }
 
        });
	}

	addTransaction(transaction_type) {
		this.navCtrl.push(AddTransactionPage, {
			type: {
				'transaction_type': transaction_type
			}
		})
	}

	calculateExpense() {

	}
}
