import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import Cropper from 'cropperjs';
import {HttpClient} from '@angular/common/http';
@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.css']
})
export class PdfViewerComponent implements AfterViewInit {
  page: number;
  path: string;
  name: string;
  URL: any;
  @ViewChild('image', {static: false})
  public imageElement: ElementRef;
  public imageDestination: string;
  private cropper: Cropper;
  private X: any;
  private Y: any;
  private W: any;
  private H: any;

  constructor(private route: Router , private http: HttpClient) {
    console.log('here construct');
    this.imageDestination = '';
    this.page = this.route.getCurrentNavigation().extras.state.data.page;
    this.path = this.route.getCurrentNavigation().extras.state.data.path;
    this.name = this.route.getCurrentNavigation().extras.state.data.name;

  }

  public ngAfterViewInit() {
    this.cropper = new Cropper(this.imageElement.nativeElement, {
      aspectRatio: 0,
      zoomable: false,
      crop: (event) => {
        const canvas = this.cropper.getCroppedCanvas();
        canvas.style.width = event.detail.width;
        canvas.style.height = event.detail.height;
        this.imageDestination = canvas.toDataURL('image/png');
        // this.css = document.getElementsByClassName('cropper-crop-box')[0].style.cssText;
        this.X = event.detail.x;
        this.Y = event.detail.y;
        this.W = event.detail.width;
        this.H = event.detail.height;
      }
    });
  }



  goback() {
    this.route.navigate(['']);
  }

  addzone() {

  }

  anonymize() {
    console.log(this.X);
    console.log(this.Y);
    console.log(this.W);
    console.log(this.H);
    this.URL = 'http://0.0.0.0:8080/crop_pdf/' + this.path + '/' + this.page;
    console.log(this.URL)
    this.http.post(this.URL, { X : this.X, Y : this.Y, W : this.W, H : this.H}).subscribe(data => {
      console.log(data);
    });
  }
}
