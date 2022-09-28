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
  messagesArray: any;
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
    this.mainService.getContactUs().subscribe((res: any) => {
      if (res.status === 'success') {
        this.messagesArray = res.data
        this.ngxService.stop();
      } else {
        this.ngxService.stop();
      }

    }, err => {
      this.ngxService.stop();
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
      this.messagesArray = this.messagesArray?.filter((res: any) => res.email.toLowerCase().includes(search.toLowerCase()));
    }
  }

}
