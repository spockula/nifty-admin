import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MainService } from 'src/app/services/main.service';
import { HotToastService } from '@ngneat/hot-toast';
import { Router } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  artwork: any;
  constructor(
    private mainService: MainService, 
    private ngxService: NgxUiLoaderService,
    public toast: HotToastService,
    public router: Router) { }

  ngOnInit(): void {
    this.ngxService.start();
    this.artwork = JSON.parse(localStorage.getItem('artwork') || '{}');
    this.ngxService.stop();
  }

  approveToken(tokenId: number) {
    this.ngxService.start();
    this.mainService.toggleApproved(tokenId).subscribe((res: any) => {
      if (res.status === 'success') {
        this.ngxService.stop();
        this.toast.success('Token successfully approved.')
        this.router.navigate(['/admin'])
      }
    }, err => {
      this.toast.error('There was an error while trying to approve this token.')
      this.ngxService.stop();
    })
  }

  rejectToken(tokenId: number) {
    // this.ngxService.start();
    // this.mainService.toggleApproved(tokenId).subscribe((res: any) => {
    //   if (res.status === 'success') {
    //     this.ngxService.stop();
    //     this.toast.success('Token successfully rejected.')
    //     this.router.navigate(['/admin'])
    //   }
    // }, err => {
    //   this.toast.error('There was an error while trying to reject this token.')
    //   this.ngxService.stop();
    // })
  }

}
