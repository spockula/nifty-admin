import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { NgxUiLoaderService, SPINNER } from 'ngx-ui-loader';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute) {}

  title = 'nifty-admin';
  showHeader: boolean = true;
  SPINNER: SPINNER = SPINNER.threeBounce

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (this.route.firstChild !== null) {
          this.showHeader = this.route.firstChild.snapshot.data["showHeader"];
        }
      }
    });
  }

}

