import { Injectable } from '@angular/core';
import { SQLite } from 'ionic-native';

/*
  Generated class for the Database provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Database {

	private storage: SQLite;
	private isOpen: boolean;

	constructor() {
		if(!this.isOpen) {
            this.storage = new SQLite();
            this.storage.openDatabase({name: "data.db", location: "default"}).then(() => {
            	// this.storage.executeSql("DROP TABLE IF EXISTS record", []);
            	this.storage.executeSql("CREATE TABLE IF NOT EXISTS account (id INTEGER PRIMARY KEY AUTOINCREMENT, monthly_income REAL, account_balance REAL, current_month INTEGER)", []).then((data) => {
            		this.storage.executeSql("SELECT * FROM account", []).then((data) => {
            			if(data.rows.length == 0) {
            				var current_month = new Date().getMonth()+1;
            				this.storage.executeSql("INSERT INTO account (monthly_income, account_balance, current_month) VALUES (?, ?, ?)", [0.0,0.0,current_month]);
            			}
            		});
            	});
                this.storage.executeSql("CREATE TABLE IF NOT EXISTS record (id INTEGER PRIMARY KEY AUTOINCREMENT, amount REAL, transaction_type TEXT, category TEXT, description TEXT, repeated INTEGER, created_at TEXT, day INTEGER, month INTEGER, year INTEGER)", []);
                this.storage.executeSql("CREATE TABLE IF NOT EXISTS category (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, color TEXT, icon TEXT)", []).then((data) => {
                	this.storage.executeSql("SELECT * FROM category ORDER BY name", []).then((data) => {
	                	if(data.rows.length == 0) {
		                	this.storage.executeSql("INSERT INTO category (name, color, icon) VALUES (?, ?, ?)", ["Food & Beverage","#2662c1","restaurant"]);
		                	this.storage.executeSql("INSERT INTO category (name, color, icon) VALUES (?, ?, ?)", ["Home","#c64d51","home"]);
		                	this.storage.executeSql("INSERT INTO category (name, color, icon) VALUES (?, ?, ?)", ["Fuel","#53a054","water"]);
		                	this.storage.executeSql("INSERT INTO category (name, color, icon) VALUES (?, ?, ?)", ["Transportation","#53a089","subway"]);
		                	this.storage.executeSql("INSERT INTO category (name, color, icon) VALUES (?, ?, ?)", ["Car","#5953a0","car"]);
		                	this.storage.executeSql("INSERT INTO category (name, color, icon) VALUES (?, ?, ?)", ["Grocery","#9953a0","cart"]);
		                	this.storage.executeSql("INSERT INTO category (name, color, icon) VALUES (?, ?, ?)", ["Loan","#a07053","card"]);
		                	this.storage.executeSql("INSERT INTO category (name, color, icon) VALUES (?, ?, ?)", ["Tax","#e89696","logo-usd"]);
                            this.storage.executeSql("INSERT INTO category (name, color, icon) VALUES (?, ?, ?)", ["Insurance","#96dbe8","lock"]);                        
                            this.storage.executeSql("INSERT INTO category (name, color, icon) VALUES (?, ?, ?)", ["Bills","#96dbe8","paper"]);                        
                            this.storage.executeSql("INSERT INTO category (name, color, icon) VALUES (?, ?, ?)", ["Clothes","#96dbe8","shirt"]);                        
                            this.storage.executeSql("INSERT INTO category (name, color, icon) VALUES (?, ?, ?)", ["Entertainment","#96dbe8","film"]);                        
                            this.storage.executeSql("INSERT INTO category (name, color, icon) VALUES (?, ?, ?)", ["Personal","#96dbe8","bowtie"]);                        
                            this.storage.executeSql("INSERT INTO category (name, color, icon) VALUES (?, ?, ?)", ["Travel","#96dbe8","plane"]);                        
                            this.storage.executeSql("INSERT INTO category (name, color, icon) VALUES (?, ?, ?)", ["Medical","#96dbe8","medkit"]);                        
		                	this.storage.executeSql("INSERT INTO category (name, color, icon) VALUES (?, ?, ?)", ["Others","#96dbe8","pricetags"]);                		
	                	}                		
                	});
                });
                this.isOpen = true;
            });
        }
	}

	// public openDb() {
	// 	return this.isOpen;
	// }

	public getCategory() {
        return new Promise((resolve, reject) => {
            this.storage.executeSql("SELECT * FROM category ORDER BY name", []).then((data) => {
                let category = [];
                if(data.rows.length > 0) {
                    for(let i = 0; i < data.rows.length; i++) {
                        category.push({
                            id: data.rows.item(i).id,
                            name: data.rows.item(i).name,
                            color: data.rows.item(i).color,
                            icon: data.rows.item(i).icon
                        });
                    }
                }
                resolve(category);
            }, (error) => {
                reject(error);
            });
        });
    }

    public getAccount() {
        return new Promise((resolve, reject) => {
            this.storage.executeSql("SELECT * FROM account", []).then((data) => {
                let account = [];
                if(data.rows.length > 0) {
                    for(let i = 0; i < data.rows.length; i++) {
                        account.push({
                            monthly_income: data.rows.item(i).monthly_income,
                            account_balance: data.rows.item(i).account_balance,
                            current_month: data.rows.item(i).current_month,
                        });
                    }
                }
                resolve(account);
            }, (error) => {
                reject(error);
            });
        });
    }

    public getCurrentExpense(month) {
        return new Promise((resolve, reject) => {
            this.storage.executeSql("SELECT * FROM record WHERE month=(?)", [month]).then((data) => {
                let current_expense = [];
                if(data.rows.length > 0) {
                    for(let i = 0; i < data.rows.length; i++) {
                        current_expense.push({
                            id: data.rows.item(i).id,
                            amount: data.rows.item(i).amount,
                            transaction_type: data.rows.item(i).transaction_type,
                        });
                    }
                }
                resolve(current_expense);
            }, (error) => {
                reject(error);
            });
        });
    }

    public createAccount(account) {
    	return new Promise((resolve, reject) => {
    		var current_month = new Date().getMonth();
            this.storage.executeSql("INSERT INTO account (monthly_income, account_balance, current_month) VALUES (?,?,?)", [account.monthly_income, account.account_balance, current_month]).then((data) => {
                resolve(data);
            }, (error) => {
                reject(error);
            });
        });
    }

    public updateAccount(account) {
    	return new Promise((resolve, reject) => {
            this.storage.executeSql("UPDATE account SET monthly_income=?, account_balance=?, current_month=?", [account.monthly_income, account.account_balance, account.current_month]).then((data) => {
                resolve(data);
            }, (error) => {
                reject(error);
            });
        });
    }

	public createTransaction(transaction) {
        return new Promise((resolve, reject) => {
            this.storage.executeSql("INSERT INTO record (amount, transaction_type, category, description, monthly_repeat, created_at, month, day, year) VALUES (?,?,?,?,?,?,?,?,?)", [transaction.amount, transaction.type, transaction.category, transaction.monthly_repeat, transaction.created_at, transaction.month, transaction.day, transaction.year]).then((data) => {
                resolve(data);
            }, (error) => {
                reject(error);
            });
        });
    }

    // public createCategory(category) {
    //     return new Promise((resolve, reject) => {
    //         this.storage.executeSql("INSERT INTO category (name, color) VALUES (?, ?)", [category.name, category.color]).then((data) => {
    //             resolve(data);
    //         }, (error) => {
    //             reject(error);
    //         });
    //     });
    // }

    public deleteTransaction(id) {
    	let sql = 'DELETE FROM record WHERE id = (?)';
    	return new Promise((resolve, reject) => {
            this.storage.executeSql(sql,[id]).then((data) => {
                resolve(data);
            }, (error) => {
                reject(error);
            });
        });
    }

    // public deleteCategory(id) {
    // 	let sql = 'DELETE FROM category WHERE id = (?)';
    // 	return new Promise((resolve, reject) => {
    //         this.storage.executeSql(sql,[id]).then((data) => {
    //             resolve(data);
    //         }, (error) => {
    //             reject(error);
    //         });
    //     });
    // }

}
