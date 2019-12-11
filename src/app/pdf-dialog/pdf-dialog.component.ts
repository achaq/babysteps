import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Inject } from '@angular/core';
import {environment} from '../../environments/environment.prod';

@Component({
  selector: 'app-pdf-dialog',
  templateUrl: './pdf-dialog.component.html',
  styleUrls: ['./pdf-dialog.component.css']
})
export class PdfDialogComponent implements OnInit {
  src: string ;
  page: number ;
  constructor(    public dialogRef: MatDialogRef<PdfDialogComponent> , @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.src = environment.baseUrl + '/anonym/' + this.data.path;
    this.page = this.data.page ;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
