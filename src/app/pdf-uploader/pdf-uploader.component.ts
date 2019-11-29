import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormBuilder} from '@angular/forms';
import {FileUploader} from 'ng2-file-upload';
// import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {MatTableDataSource} from '@angular/material';
import {ToastrService} from 'ngx-toastr';


const URL = 'http://0.0.0.0:8080/api/upload';
let path = '';
let name = '';

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
  private filesToUpload: Array<File>;
  private maxFileSize = 20 * 1024 * 1024;
  private size = 0;
  private draftList = [];

  constructor(private router: Router, private http: HttpClient, private formBuilder: FormBuilder, private toastr: ToastrService,
  ) {
    this.data = this.formBuilder.group({page: ''});
    this.filesToUpload = [];
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
    };
    this.uploader.onCompleteItem = (item: any, status: any) => {
      console.log('Uploaded File Details:', item);
      name = item.file.name;
      // tslint:disable-next-line:no-shadowed-variable
      path = JSON.parse(status).image_path;
      // tslint:disable-next-line:triple-equals
      if (path != '') {
        this.done = true;
      }
      console.log(path);
    };

  }

​

  public onFileSelectedOrDropped(event: FileList) {
    console.log('on file selected ');
    for (let i = 0; i < event.length; i++) {
      this.filesToUpload.push(event.item(i));
      this.size += event.item(i).size;
    }
  }

​

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

​

  public progressCalcul(files: Array<File>) {
    return 100 / files.length;
  }

​

  clearFileList() {
    this.uploader.clearQueue();
    this.filesToUpload = [];
  }

  removeFile(file: File) {
    const index = this.filesToUpload.indexOf(file);
    this.size -= file.size;
    this.filesToUpload.splice(index, 1);
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
    const page = getpage.page;
    this.router.navigate(['/pdf'], {state: {data: {path, page, name}}});

  }

  openDialogManual() {
    console.log('we should create a diolog ');
  }
}

