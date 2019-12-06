import {AfterViewInit, Component, OnInit} from '@angular/core';
import Cropper from 'cropperjs';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {FormBuilder} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'pdf anonym';

  constructor(private router: Router) {
      this.router.navigate(['principale']);
  }

  ngOnInit(): void {
  }

  gohome() {
    this.router.navigate(['principale']);
  }
}

