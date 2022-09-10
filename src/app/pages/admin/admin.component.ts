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
  constructor(private mainService: MainService, private ngxService: NgxUiLoaderService) { }

  ngOnInit(): void {
    this.mainService.fetchUnapproved(1, 16)
    this.mainService.returnArtwork().subscribe((res: any) => {
      if (res !== null) {
        this.artworks = res;
      }
    }, err => {
      this.ngxService.stop();
    });
    this.mainService.getContactUs().subscribe((res: any) => {
      console.log('here we are', res)
    })
  }

  switchTabs(selectedTab: string) {
    this.selectedTab = selectedTab;
  }

}
