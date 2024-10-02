import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent {
  constructor() {}

  tab: string = 'home';

  setSelectedTab(event: any) {
    this.tab = event.tab;
  }

}