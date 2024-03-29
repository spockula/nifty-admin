import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { IArtwork } from 'src/app/interfaces/presentation.interface';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-approval',
  templateUrl: './approval.component.html',
  styleUrls: ['./approval.component.scss']
})
export class ApprovalComponent implements OnInit {
  pageLoaded: boolean = false;
  showMe: any;
  ellipseIndex: number = 0;
  currentPage: number = 0;
  itemCount: number = 0;
  itemsPerPage: number = 0;
  prevPage: number = 0;
  paginator: number = 1;
  unApproved: IArtwork [] | undefined;
  artworks: IArtwork [] | undefined;
  search: any;
  artworkArray: IArtwork [] | undefined;
  constructor(
    private mainService: MainService,
    private router: Router,
    private ngxService: NgxUiLoaderService
    ) { }

  ngOnInit(): void {
    this.mainService.returnArtwork().subscribe((res: any) => {
      if (res !== null) {
        this.unApproved = res;
      }
    }, err => {
      this.ngxService.stop();
    });
  }

  ngOnChanges(changes:SimpleChanges) {
    if (changes['artworkArray'] && this.artworkArray !== undefined) {
      this.ngxService.start();
      if (this.artworkArray !== undefined) {
        this.unApproved = this.artworkArray;
        this.ngxService.stop();
      }
    }
    this.mainService.getMeta().subscribe(res => {
      if (res !== null) {
        this.currentPage = res.currentPage;
        this.itemCount = res.itemCount;
        this.itemsPerPage = res.itemsPerPage
      }
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

  byId(index: any, item: { id: any; }) {
    return item.id;
  }

  toggle(id: number) {
    this.showMe = !this.showMe;
    // this.ellipseIndex = id;
  }

  approveToken(tokenId: number) {
    this.ngxService.start();
    this.mainService.toggleApproved(tokenId).subscribe((res: any) => {
      if (res.status === 'success') {
        this.ngxService.stop();
      }
    }, err => {
      this.ngxService.stop();
    })
  }

  goToDetails(artwork: any) {
    localStorage.setItem('artwork', JSON.stringify(artwork));
    this.router.navigate(['/details/' + artwork.tokenId])
  }

  handleSearch(event: any) {
    let search = event.target.value;
    if (search !== '') {
      this.unApproved = this.artworkArray?.filter((res: any) => res.symbol.toLowerCase().includes(search.toLowerCase()));
    }
  }


  switchChain(chain: string) {
    localStorage.setItem('currentChain', chain);
    window.location.reload();
  }


}
