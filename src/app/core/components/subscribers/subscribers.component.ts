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
  @Input() public subscriberArray: any;
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
  }

  ngOnChanges(changes:SimpleChanges) {
    if (changes['messagesArray'] && this.subscriberArray !== undefined) {
      this.ngxService.start();
      if (this.subscriberArray !== undefined) {
        this.ngxService.stop();
      }
    }
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
      // this.unApproved = this.artworkArray?.filter((res: any) => res.symbol.toLowerCase().includes(search.toLowerCase()));
    }
  }

}
