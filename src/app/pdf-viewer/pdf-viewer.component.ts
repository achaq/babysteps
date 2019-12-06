import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import Cropper from 'cropperjs';
import {HttpClient} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';

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
  private XT: number[] = [];
  private YT: number[] = [];
  private WT: number[] = [];
  private HT: number[] = [];
  private Zone: number;
  private succ = false;


  constructor(private route: Router, private http: HttpClient, private toastr: ToastrService) {
    console.log('here construct');
    this.imageDestination = '';
    this.page = this.route.getCurrentNavigation().extras.state.data.page;
    this.path = this.route.getCurrentNavigation().extras.state.data.path;
    this.name = this.route.getCurrentNavigation().extras.state.data.name;
    this.Zone = 0;

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
    this.route.navigate(['main']);
  }

  addzone() {
    this.Zone = this.Zone + 1;
    console.log(this.X);
    console.log(this.Y);
    console.log(this.W);
    console.log(this.H);
    this.XT.push(this.X);
    this.YT.push(this.Y);
    this.HT.push(this.H);
    this.WT.push(this.W);


    const element = document.createElement('div');
    const SX = (this.X * 0.68).toString() + 'px';
    const SH = (this.H * 0.68).toString() + 'px';
    const SW = (this.W * 0.68).toString() + 'px';
    const SY = (this.Y * 0.68).toString() + 'px';
    element.style.height = SH;
    element.style.width = SW;
    element.style.left = SX;
    element.style.top = SY;
    element.style.borderColor = '#ffffff';
    element.style.backgroundColor = '#777'
    element.style.position = 'absolute';
    element.style.zIndex = '1000';

    document.body.getElementsByClassName('cropper-drag-box cropper-crop cropper-modal')[0].appendChild(element);

  }

  anonymize() {
    console.log(this.X);
    console.log(this.Y);
    console.log(this.W);
    console.log(this.H);
    this.URL = 'http://0.0.0.0:8080/crop_pdf/' + this.path + '/' + this.page + '/1';
    console.log(this.URL);
    this.http.post(this.URL, {Z: this.Zone, X: this.XT, Y: this.YT, W: this.WT, H: this.HT}).subscribe(data => {
      console.log(data);
    });
  }
  anonymize2() {

    this.URL = 'http://0.0.0.0:8080/crop_pdf2/' + this.path + '/' + this.page + '/1';
    console.log(this.URL);
    this.http.post(this.URL, {X: this.X, Y: this.Y, W: this.W, H: this.H}).subscribe(data => {
      console.log(data);
    });
  }

  anonymize3() {
    this.URL = 'http://0.0.0.0:8080/crop_pdf3/' + this.path + '/' + this.page + '/1';
    console.log(this.URL);
    this.http.post(this.URL, {Z: this.Zone, X: this.XT, Y: this.YT, W: this.WT, H: this.HT}).subscribe(status => {
      console.log('we are back ');
      console.log(JSON.stringify(status));
      this.succ = true;
    });
  }
}
