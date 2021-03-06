import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { CategoryPage } from '../pages/category/category';
import { Database } from '../providers/database';

@NgModule({
  declarations: [
    MyApp,
    Page1,
    Page2,
    DashboardPage,
    CategoryPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Page1,
    Page2,
    DashboardPage,
    CategoryPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, Database]
})
export class AppModule {}
