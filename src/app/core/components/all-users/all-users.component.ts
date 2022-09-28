import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.scss']
})
export class AllUsersComponent implements OnInit {
  users: any;
  search: any;
  constructor(
    public mainService: MainService,
    private router: Router,
    private ngxService: NgxUiLoaderService
  ) { }

  ngOnInit(): void {
    this.ngxService.start();
    this.mainService.getAllUsers().subscribe((res: any) => {
      if (res.status === 'success') {
        this.ngxService.stop();
        this.users = res.data.users;
      } else {
        this.ngxService.stop();
      }
    }, err => {
      this.ngxService.stop();
    })
  }

  handleSearch(event: any) {
    let search = event.target.value;
    if (search !== '') {
      this.users = this.users?.filter((res: any) => res.email.toLowerCase().includes(search.toLowerCase()));
    }
  }

}
