import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  selectedTab: string = 'approval';
  artworks: any;
  loggedInUser: any;
  constructor(private mainService: MainService, private ngxService: NgxUiLoaderService) { }

  ngOnInit(): void {
    this.mainService.fetchUnapproved(1, 16)
    this.loggedInUser = this.mainService.getLoggedInUserData()
    console.log(this.mainService.getLoggedInUserData());
  }

  switchTabs(selectedTab: string) {
    this.selectedTab = selectedTab;
  }

}
