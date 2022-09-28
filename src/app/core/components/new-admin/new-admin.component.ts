import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-new-admin',
  templateUrl: './new-admin.component.html',
  styleUrls: ['./new-admin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewAdminComponent implements OnInit {
  admins: any[] = [];
  search: any;
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  username: string = ''
  password: string = '';
  confirmPassword: string = '';
  walletAddress: string = ''
  webUrl: string = '';
  about: string = '';
  constructor(
    private mainService: MainService,
    private router: Router,
    private ngxService: NgxUiLoaderService,
    public toast: HotToastService,
  ) { }

  ngOnInit(): void {
  }

  handleSearch(event: any) {
    let search = event.target.value;
    if (search !== '') {
      this.admins = this.admins?.filter((res: any) => res.firstName.toLowerCase().includes(search.toLowerCase()));
    }
  }

  toggleAdminModal() {
    document.getElementById('modal')?.classList.toggle('hidden')
  }

  submitAdmin() {
    if (this.firstName === '' || this.lastName === ''
    || this.username === '' || this.username === ''
    || this.email === '' || this.password === ''
    || this.confirmPassword === '' || this.walletAddress === ''
    || this.webUrl === '' || this.about === '') {
      this.toast.error('Please make sure all fields are filled');
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.toast.error('Passwords do not match');
      return;
    }
    const userData = {
      "firstName": this.firstName,
      "lastName": this.lastName,
      "username": this.username,
      "email": this.email,
      "password": this.password,
      "walletAddress": this.walletAddress,
      "about": this.about,
      "webUrl": this.webUrl,
    }
    this.ngxService.start();
    this.mainService.addAdminUser(userData).subscribe((res: any) => {
      if (res.status === 'success') {
        this.ngxService.stop();
        this.toast.success('Successfully added admin user');
        this.toggleAdminModal();
      } else if (res.status === 'failed' && !res.message.includes('ER_DUP_ENTRY: Duplicate entry')) {
        this.ngxService.stop();
        this.toast.error(res.message);
      }
      if (res.message.includes('ER_DUP_ENTRY: Duplicate entry')) {
        this.ngxService.stop();
        this.toast.error('Wallet Address already exists');
      }
    }, err => {
      this.ngxService.stop();
      console.log('error', err);
    })

  }

}
