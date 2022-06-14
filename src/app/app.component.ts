import { Component } from '@angular/core';
import { NgxUiLoaderService, SPINNER } from 'ngx-ui-loader';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'nifty-admin';
  SPINNER: SPINNER = SPINNER.threeBounce
}
