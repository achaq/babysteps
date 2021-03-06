import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FileItem, FileUploader} from 'ng2-file-upload';
// import {ToastrService} from 'ngx-toastr';
import {environment} from '../../environments/environment.prod';

import {Router} from '@angular/router';
import {MatTableDataSource} from '@angular/material';
import {ToastrService} from 'ngx-toastr';


const URL = environment.baseUrl + '/api/upload';

@Component({
  selector: 'app-pdf-uploader',
  templateUrl: './pdf-uploader.component.html',
  styleUrls: ['./pdf-uploader.component.css']
})


export class PdfUploaderComponent implements OnInit {
  public uploader: FileUploader;
  public hasBaseDropZoneOver: boolean;
  public response: any;
  public dataSource = new MatTableDataSource<any>();
  public displayedColumns = ['documentName', 'type', 'Operations'];
  public showStatus = false;
  public done = false;
  page: number;
  data;
   name = '';

  private filesToUpload: Array<File>;
  private maxFileSize = 20 * 1024 * 1024;
  private size = 0;
  private names: Array<string>;
  public path = '';

  constructor(private router: Router, private http: HttpClient, private toastr: ToastrService,
  ) {
    this.filesToUpload = [];
    this.names = [];
  }


  ngOnInit() {
    console.log('here in init');
    this.uploader = new FileUploader({
      url: URL,
      itemAlias: 'doc'
    });
    console.log('on upload all ');
    this.uploader.onAfterAddingFile = (file) => {
      this.hasBaseDropZoneOver = false;
      file.withCredentials = false;
      console.log(file);
      this.uploader.uploadItem(file);

    };
    this.uploader.onCompleteItem = (item: any, status: any) => {
      console.log('Uploaded File Details:', item);
      this.name = item.file.name;
      // tslint:disable-next-line:no-shadowed-variable
      this.path = JSON.parse(status).image_path;
      // tslint:disable-next-line:triple-equals
      if (this.path != '') {
        this.done = true;
      }
      this.names.push(this.path);
    };

  }

  public onFileSelectedOrDropped(event: FileList) {
    console.log('on file selected ');
    for (let i = 0; i < event.length; i++) {
      this.filesToUpload.push(event.item(i));
      this.size += event.item(i).size;
    }
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }


  public progressCalcul(files: Array<File>) {
    return 100 / files.length;
  }

  clearFileList() {
    this.uploader.clearQueue();
    this.filesToUpload = [];
    this.names = [];
  }

  removeFile(item: FileItem) {
    const index = this.filesToUpload.indexOf(item._file);
    console.log(index);
    this.size -= item.file.size;
    this.names.splice(index, 1);
    this.filesToUpload.splice(index, 1);
    console.log(this.names);
  }



  next() {
    console.log('this paaath ' + this.path);
    this.router.navigate(['page'], {state: {data: { path : this.path, docs : this.names, name : this.name}}});
  }
}

