import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<HelpComponent>) { }

  ngOnInit() {
  }


    onNoClick(): void {
      this.dialogRef.close();
  }
}
