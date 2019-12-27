import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import 'hammerjs';
import * as variable from 'src/assets/js/principal.js';

@Component({
  selector: 'app-principale',
  templateUrl: './principale.component.html',
  styleUrls: ['./principale.component.css'],

})
export class PrincipaleComponent implements OnInit {

  constructor(private router: Router) {

  }

  ngOnInit() {
            // variable;

  }

  go_ahead() {
this.router.navigate(['main']);
console.log('hello');
  }
}
