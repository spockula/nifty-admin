import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    public mainService: MainService,
    public router: Router,
    public toast: HotToastService,
    private ngxService: NgxUiLoaderService) { }
  email: string = '';
  password: string = '';
  ngOnInit(): void {
  }

  login() {
    if (this.email === '' || this.password === '') {
      this.toast.error('Please fill all required fields.');
      return;
    }
    this.ngxService.start();
    this.mainService.login(this.email, this.password).subscribe((res: any) => {
      if (res.status === 'success') {
        this.ngxService.stop();
        this.toast.success('Login Successful');
        localStorage.setItem("user", JSON.stringify(res.data));
        this.mainService.getLoggedInUserData()
        // console.log(this.mainService.getLoggedInUserData());
        this.router.navigate(['/admin']);
      } else if (res.status === 'error') {
        this.toast.error('Please confirm that you have entered the right login details');
      }

    }, err => {
      console.log(err);
      this.ngxService.stop();
      this.toast.error('Please confirm that you have entered the right login details');
    })
  }

}
