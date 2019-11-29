import { BrowserModule} from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PdfViewerComponent } from './pdf-viewer/pdf-viewer.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {PdfUploaderComponent} from './pdf-uploader/pdf-uploader.component';
import {FileUploadModule} from 'ng2-file-upload';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatProgressBarModule,
  MatTableModule
} from '@angular/material';
import {ToastrModule} from 'ngx-toastr';
import {ImageCropperModule} from 'ngx-image-cropper';

@NgModule({
  declarations: [
    AppComponent,
    PdfViewerComponent,
    PdfUploaderComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ImageCropperModule,
    HttpClientModule,
    ReactiveFormsModule,
    FileUploadModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    MatProgressBarModule,
    MatTableModule,
    ToastrModule.forRoot(),
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    // ToastrModule added

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
