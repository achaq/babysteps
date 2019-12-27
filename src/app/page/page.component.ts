import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment.prod';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {
  public data: FormGroup;
  private path: any;
  private page: number;
  name: any;
  public succ: boolean;

  constructor(private router: Router, private formBuilder: FormBuilder, private http: HttpClient) {

    this.data = this.formBuilder.group({page: ''});
    this.path = this.router.getCurrentNavigation().extras.state.data.path;
    console.log('paaath : ' + this.path);
    this.name = this.router.getCurrentNavigation().extras.state.data.name;
    console.log(this.name);


  }

  ngOnInit() {
  }
  onSubmit(getpage) {
    //   // this.fileData = target.files[0] as File;
    //   console.log('Your doc has been submitted', data);
    //   const formData = data;
    //   console.log(formData);
    //   // formData.append('page', this.page.toString());
    //   this.http.post(URL, formData, {reportProgress: true, observe: 'events'})
    //     .subscribe(events => {
    //       if (events.type === HttpEventType.UploadProgress) {
    //         console.log('Upload progress: ', Math.round(events.loaded / events.total * 100) + '%');
    //       } else if (events.type === HttpEventType.Response) {
    //         console.log(events);
    //       }
    // });
    if (getpage.page === '') {
      this.page = 1;
    } else {
    this.page = getpage.page;}
    const URL = environment.baseUrl + '/page/'
    console.log(URL);
    this.http.post(URL, {page : this.page, path : this.path}).subscribe(status => {
      console.log('we are back ');
      console.log(JSON.stringify(status));
      this.router.navigate(['/pdf'], {state: {data: { path : this.path, page : this.page , name : this.name}}});
    });
  }

  goback() {
    this.router.navigate(['/main']);
  }

  next() {

  }
}
