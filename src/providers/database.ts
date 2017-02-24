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
            	// this.storage.executeSql("DROP TABLE reception",[]);
                this.storage.executeSql("CREATE TABLE IF NOT EXISTS transaction (id INTEGER PRIMARY KEY AUTOINCREMENT, amount REAL, category TEXT, monthly_repeat BOOLEAN, created_at NUMERIC, month TEXT, day INTEGER, year INTEGER)", []);
                this.storage.executeSql("CREATE TABLE IF NOT EXISTS category (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, color TEXT)", []).then((data) => {
                	this.storage.executeSql("INSERT INTO category (name, color) VALUES (?, ?)", ["Food & Beverage","#2662c1"]);
                	this.storage.executeSql("INSERT INTO category (name, color) VALUES (?, ?)", ["Home Appliance","#c64d51"]);
                	this.storage.executeSql("INSERT INTO category (name, color) VALUES (?, ?)", ["Fuel","#53a054"]);
                	this.storage.executeSql("INSERT INTO category (name, color) VALUES (?, ?)", ["Transportation","#53a089"]);
                	this.storage.executeSql("INSERT INTO category (name, color) VALUES (?, ?)", ["Car","#5953a0"]);
                	this.storage.executeSql("INSERT INTO category (name, color) VALUES (?, ?)", ["Grocery","#9953a0"]);
                	this.storage.executeSql("INSERT INTO category (name, color) VALUES (?, ?)", ["Loan","#a07053"]);
                	this.storage.executeSql("INSERT INTO category (name, color) VALUES (?, ?)", ["Tax","#e89696"]);
                	this.storage.executeSql("INSERT INTO category (name, color) VALUES (?, ?)", ["Insurance","#96dbe8"]);
                });
                this.isOpen = true;
            });
        }
	}

	public getCategory() {
        return new Promise((resolve, reject) => {
            this.storage.executeSql("SELECT * FROM category ORDER BY name", []).then((data) => {
                let category = [];
                if(data.rows.length > 0) {
                    for(let i = 0; i < data.rows.length; i++) {
                        category.push({
                            id: data.rows.item(i).id,
                            name: data.rows.item(i).name,
                            color: data.rows.item(i).color
                        });
                    }
                }
                resolve(category);
            }, (error) => {
                reject(error);
            });
        });
    }

	public createTransaction(transaction) {
        return new Promise((resolve, reject) => {
            this.storage.executeSql("INSERT INTO transaction (amount, category, monthly_repeat, created_at, month, day, year) VALUES (?, ?, ?, ?, ?, ?, ?)", [transaction.amount, transaction.category, transaction.monthly_repeat, transaction.created_at, transaction.month, transaction.day, transaction.year]).then((data) => {
                resolve(data);
            }, (error) => {
                reject(error);
            });
        });
    }

    public createCategory(category) {
        return new Promise((resolve, reject) => {
            this.storage.executeSql("INSERT INTO category (name, color) VALUES (?, ?)", [category.name, category.color]).then((data) => {
                resolve(data);
            }, (error) => {
                reject(error);
            });
        });
    }

    public deleteTransaction(id) {
    	let sql = 'DELETE FROM transaction WHERE id = (?)';
    	return new Promise((resolve, reject) => {
            this.storage.executeSql(sql,[id]).then((data) => {
                resolve(data);
            }, (error) => {
                reject(error);
            });
        });
    }

    public deleteCategory(id) {
    	let sql = 'DELETE FROM category WHERE id = (?)';
    	return new Promise((resolve, reject) => {
            this.storage.executeSql(sql,[id]).then((data) => {
                resolve(data);
            }, (error) => {
                reject(error);
            });
        });
    }

}
