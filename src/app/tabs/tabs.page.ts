import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Tab1Page } from '../tab1/tab1.page';
@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor() {}
  public http:any;
    // call the getPosition of the tab1 page

// call the getPosition of the tab1 page
  getPosition() {
    let tab1 = new Tab1Page(this.http);
    tab1.getPosition();
  }
}
