import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import Cropper from 'cropperjs';
import {HttpClient} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';
import {MatDialog, MatDialogConfig, MatSlideToggle} from '@angular/material';
import {PdfDialogComponent} from '../pdf-dialog/pdf-dialog.component';
import { ColorPickerService, Cmyk } from 'ngx-color-picker';
import {environment} from '../../environments/environment.prod';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';

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
  src: string;
  public selectedColor = 'color1';

  public color1 = '#ffffff';
  @Input()
  checked = true;
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
  state: any;
  pages = [1 , 2 , 3 , 4 , 5];
  public added = false;
  public end = false;
  checked1 = false;
  public sidenav = false;
  private urlNav = 'https://static.thenounproject.com/png/1195185-200.png';


  // tslint:disable-next-line:max-line-length
  constructor(private route: Router, private http: HttpClient,  private cpService: ColorPickerService, private toastr: ToastrService, private dialog: MatDialog) {
    console.log('here construct');
    this.imageDestination = '';
    this.page = this.route.getCurrentNavigation().extras.state.data.page;
    this.path = this.route.getCurrentNavigation().extras.state.data.path;
    this.name = this.route.getCurrentNavigation().extras.state.data.name;
    this.Zone = 1;
    this.src = environment.baseUrl + '/image/' + this.path + '/' + this.page;
    document.getElementById('spacer2').style.padding = '20px';

  }

  public ngAfterViewInit() {
    this.cropper = new Cropper(this.imageElement.nativeElement, {
      aspectRatio: 0,
      zoomable: false,
      initialAspectRatio: 6,

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
    this.added = true;
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
    element.style.backgroundColor = '#777';
    element.style.position = 'absolute';
    element.style.zIndex = '1000';
    document.body.getElementsByClassName('cropper-drag-box cropper-crop cropper-modal')[0].appendChild(element);

  }

  anonymize() {
    console.log(this.X);
    console.log(this.Y);
    console.log(this.W);
    console.log(this.H);
    this.URL = environment.baseUrl + '/crop_pdf/' + this.path + '/' + this.page + '/1';
    console.log(this.URL);
    this.http.post(this.URL, {Z: this.Zone, X: this.XT, Y: this.YT, W: this.WT, H: this.HT}).subscribe(data => {
      console.log(data);
    });
  }
  anonymize2() {

    this.URL = environment.baseUrl + '/preview2/' + this.path + '/' + this.page + '/1';
    console.log(this.URL);
    console.log(this.Zone);
    console.log(this.X);
    console.log(this.Y);
    console.log(this.W);
    console.log(this.H);
    this.http.post(this.URL, {Z: this.Zone, X: this.XT, Y: this.YT, W: this.WT, H: this.HT}).subscribe(status => {
      console.log('we are back ');
      console.log(JSON.stringify(status['success']));
      if (JSON.stringify(status['success']) === 'false') {
        console.log('there is a problem with ur pdf ');
        // window.open(url, '_blank');
      } else {
        this.end = true;
        this.openDialog();
      }
    });
  }

  anonymize3() {
    this.URL = environment.baseUrl + '/preview/' + this.path + '/' + this.page + '/1';
    console.log(this.URL);
    console.log(this.X);
    console.log(this.Y);
    console.log(this.W);
    console.log(this.H);
    this.http.post(this.URL, {Z: this.Zone, X: this.XT, Y: this.YT, W: this.WT, H: this.HT, C: this.color1}).subscribe(status => {
      console.log('we are back ');
      console.log(JSON.stringify(status));
      this.succ = true;
      this.openDialog();
    });
    }


  openDialog() {
        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.width = '70%';
        dialogConfig.height = '80%';
        dialogConfig.closeOnNavigation = true;
        dialogConfig.data = {
          path : this.path,
          page : this.page
        };

        this.dialog.open(PdfDialogComponent, dialogConfig);
  }

  generate(toggle) {
    this.XT.push(this.X);
    this.YT.push(this.Y);
    this.HT.push(this.H);
    this.WT.push(this.W);
    if (!toggle.checked) {
      this.anonymize3();
    } else {
      this.anonymize2();
    }
  }

  review(toggle) {
    this.XT.push(this.X);
    this.YT.push(this.Y);
    this.HT.push(this.H);
    this.WT.push(this.W);
    let method;
    if (!toggle.checked) {
      console.log(this.path);
      console.log(this.page);
      console.log(this.name);
      // tslint:disable-next-line:max-line-length
      // const hsva = this.cpService.stringToHsva(this.color1, true);
      //
      // if (hsva) {
      //   const rgbColor = this.cpService.outputFormat(hsva, 'rgba', null);
      //   // tslint:disable-next-line:max-line-length
      //   console.log(rgbColor);
      // tslint:disable-next-line:max-line-length
      // }
      method = 0;
    } else {
      method = 1;
    }
    // tslint:disable-next-line:max-line-length
    this.route.navigate(['/review'], {state: {data: { path : this.path, page : this.page , name : this.name, Z: this.Zone, X: this.XT, Y: this.YT, W: this.WT, H: this.HT, C: this.color1, Method: method}}});
  }


  public onEventLog(event: string, data: any): void {
    console.log(this.color1);
  }


  openNav() {
    if (this.sidenav === true) {

      document.getElementById('mySidenav').style.width = '40px';
      document.getElementById('closebtn').style.left = '0px';
      document.getElementById('main').style.marginLeft = 'auto';
      this.sidenav = false;
    } else {
    document.getElementById('mySidenav').style.width = '250px';
    document.getElementById('main').style.marginLeft = '250px';
    document.getElementById('closebtn').style.right = '10px';
    document.getElementById('closebtn').style.left = 'unset';
    this.sidenav = true;
    }
  }
  //
  // openNav(): void {
  //   this._bottomSheet.open(BottomSheetOverviewExampleSheet);
  // }

  closeNav() {

  }

  toggleClass() {
    console.log(this.sidenav);
    if (this.sidenav === true) {

      document.getElementById('mySidenav').style.width = '0px';
      document.getElementById('main').style.marginRight = 'auto';
      this.sidenav = false;
    } else {
      document.getElementById('mySidenav').style.width = '250px';
      document.getElementById('main').style.marginRight = '250px';
      console.log(document.getElementById('wrapper1').style.left);
      // document.getElementById('closebtn').style.right = '10px';
      // document.getElementById('closebtn').style.left = 'unset';
      this.sidenav = true;
    }
  }
}



