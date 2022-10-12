import { Component, OnInit} from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-sliders',
  templateUrl: './sliders.component.html',
  styleUrls: ['./sliders.component.scss']
})
export class SlidersComponent implements OnInit {
  toggledSlider: any;
  media: any;
  fileSelected: boolean = false;
  sliderName: string = '';
  sliders: any;

  constructor(
    public toast: HotToastService,
    private mainService: MainService,
    private ngxService: NgxUiLoaderService,
  ) { }

  ngOnInit(): void {
    this.getSliders();
  }

  toggleAdminModal() {
    document.getElementById('modal')?.classList.toggle('hidden')
  }

  changeImage(slider: any, sliderName: any) {
    this.toggleAdminModal();
    this.toggledSlider = slider;
    this.sliderName = sliderName;

  }

  check(event: any) {
    const file = event.target.files[0]
    const fileSize = file.size/1024/1024;
    if (fileSize > 10) {
      this.toast.error('Please Make sure that the file selected is not bigger than 10MB')
      return;
    } else {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = this.handleFile.bind(this)
    if ( /\.(jpe?g|gif|png|mp3|mp4)$/i.test(file.name) === false  ) {
      this.toast.error('Please select a file type of JPEG, GIF, PNG, MP3 or MP4')
       return;
      } else {
        reader = new FileReader();

        reader.onload = (e: any) => {
          this.toggledSlider  = reader.result;
        };

        reader.readAsDataURL(file);
      };
    }
  }

  handleFile(event: any) {
    var binaryString = event.target.result;
    this.media = binaryString;
    this.fileSelected = true;
  }

  submitSlider() {
    if (this.fileSelected && this.sliderName !== '') {
      this.ngxService.start();
      this.mainService.addSlider(this.media, this.sliderName).subscribe( (res: any) => {
        console.log('res', res);
        this.ngxService.stop();
        this.toast.success('Slider updated successfully');
      }, err => {
        console.log('err', err)
      })
    }
  }

  getSliders() {
    this.ngxService.start();
    this.mainService.getSlider().subscribe( (res: any) => {
      if (res.status === 'success') {
        this.sliders = res.data.images[0];
        this.ngxService.stop();
      } else {
        this.ngxService.stop();
      }
    }, err => {
      this.ngxService.stop();
      console.log('err', err)
    })
  }

}
