import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';
import {MatDialog} from '@angular/material';
import {environment} from '../../environments/environment.prod';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  page: number;
  path: string;
  name: string;
  succ = false;
  private XT: number[] = [];
  private YT: number[] = [];
  private WT: number[] = [];
  private HT: number[] = [];
  private Zone: number;
  private color;
  private readonly method;
  private URL;
  private way;
  public end = false;
  private docs: Array<string>;
  constructor(private route: Router, private http: HttpClient) {
    this.page = this.route.getCurrentNavigation().extras.state.data.page;
    this.path = this.route.getCurrentNavigation().extras.state.data.path;
    this.name = this.route.getCurrentNavigation().extras.state.data.name;
    this.XT = this.route.getCurrentNavigation().extras.state.data.X;
    this.YT = this.route.getCurrentNavigation().extras.state.data.Y;
    this.HT = this.route.getCurrentNavigation().extras.state.data.H;
    this.WT = this.route.getCurrentNavigation().extras.state.data.W;
    this.Zone = this.route.getCurrentNavigation().extras.state.data.Z;
    this.color = this.route.getCurrentNavigation().extras.state.data.C;
    this.method = this.route.getCurrentNavigation().extras.state.data.Method;
    this.docs = this.route.getCurrentNavigation().extras.state.data.docs;
    console.log('here construct' + this.method);
    if (this.method === 0) {
      this.way = '/crop_pdf/';
    } else {
      this.way = '/crop_pdf2/';
    }
    const URL = environment.baseUrl + this.way + this.path + '/' + this.page;

    // tslint:disable-next-line:max-line-length
    this.http.post(URL, {docs: this.docs , Z: this.Zone, X: this.XT, Y: this.YT, W: this.WT, H: this.HT, C: this.color}).subscribe(status => {
      console.log('we are back ');
      console.log(JSON.stringify(status['success']));
      if (JSON.stringify(status['success']) === 'true') {
        let url ;
        console.log(' here ' + this.docs.length);
        if ( this.docs.length === 1 ) {
          url = environment.baseUrl + '/anonym/' + this.path; } else {
          url = environment.baseUrl + '/anonym2/' + this.path; }
        console.log('i guess there is success');
        window.location.href = url;
        this.succ = true;
      } else {
        this.end = true;
        console.log('i guess there is NO success');
      }
    });
  }
  ngOnInit() {
  }

}
