import { Component, OnInit, SimpleChanges, Input } from '@angular/core';
import { MainService } from 'src/app/services/main.service';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-contact-messages',
  templateUrl: './contact-messages.component.html',
  styleUrls: ['./contact-messages.component.scss']
})
export class ContactMessagesComponent implements OnInit {
  search: any;
  @Input() public messagesArray: any;
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
    if (changes['messagesArray'] && this.messagesArray !== undefined) {
      this.ngxService.start();
      if (this.messagesArray !== undefined) {
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
