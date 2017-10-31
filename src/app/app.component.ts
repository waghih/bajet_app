import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { CategoryPage } from '../pages/category/category';
import { Database } from '../providers/database';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public database: Database) {
    this.initializeApp();
    // used for an example of ngFor and navigation

  }

  initializeApp() {
    this.platform.ready().then(() => {
    this.rootPage = DashboardPage;
      this.pages = [
        { title: 'Dashboard', component: DashboardPage },
        { title: 'Category', component: CategoryPage },
      ];
      // this.nav.setRoot(DashboardPage);
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
