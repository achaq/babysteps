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
  private end = false;
  constructor(private route: Router, private http: HttpClient) {
    console.log('here construct');
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
    if (this.method === 0) {
      this.way = '/crop_pdf/';
    } else {
      this.way = '/crop_pdf2/';
    }
    const URL = environment.baseUrl + this.way + this.path + '/' + this.page + '/1';

    this.http.post(URL, {Z: this.Zone, X: this.XT, Y: this.YT, W: this.WT, H: this.HT, C: this.color}).subscribe(status => {
      console.log('we are back ');
      console.log(JSON.stringify(status['success']));
      if (JSON.stringify(status['success'])) {
        const url = environment.baseUrl + '/anonym/' + this.path;
        // window.open(url, '_blank');
        window.location.href = url;
      } else {
                this.end = true;
      }
    });
  }
  ngOnInit() {
  }

}
