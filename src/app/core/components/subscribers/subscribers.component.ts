import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-subscribers',
  templateUrl: './subscribers.component.html',
  styleUrls: ['./subscribers.component.scss']
})
export class SubscribersComponent implements OnInit {
  search: any;
  subscriberArray: any;
  pageLoaded: boolean = false;
  showMe: any;
  ellipseIndex: number = 0;
  currentPage: number = 0;
  itemCount: number = 0;
  itemsPerPage: number = 0;
  prevPage: number = 0;
  paginator: number = 1;
  constructor(
    private mainService: MainService,
    private router: Router,
    private ngxService: NgxUiLoaderService
  ) { }

  ngOnInit(): void {
    this.ngxService.start();
    this.mainService.getSubscribers().subscribe((res: any) => {
      this.subscriberArray = res.data;
      this.ngxService.stop();
    }, err => {
      this.ngxService.stop();
      console.log('there was an error', err)
    })
  }

  nextPage(number: number) {
    this.pageLoaded = false;
    this.currentPage = this.currentPage + 1;
    this.mainService.fetchUnapproved(this.currentPage, this.itemCount);
    this.pageLoaded = true;
  }

  previousPage(number: number) {

  }

  toggle(id: number) {
    this.showMe = !this.showMe;
    // this.ellipseIndex = id;
  }

  goToDetails(artwork: any) {
    localStorage.setItem('artwork', JSON.stringify(artwork));
    this.router.navigate(['/details/' + artwork.tokenId])
  }

  handleSearch(event: any) {
    let search = event.target.value;
    if (search !== '') {
      this.subscriberArray = this.subscriberArray?.filter((res: any) => res.email.toLowerCase().includes(search.toLowerCase()));
    } else {
      this.subscriberArray = this.subscriberArray;
    }
  }

}
