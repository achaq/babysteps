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
import { PdfViewerModule } from 'ng2-pdf-viewer'; // <- import PdfViewerModule

import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatProgressBarModule, MatProgressSpinnerModule, MatSlideToggleModule, MatStepperModule,
  MatTableModule, MatToolbarModule
} from '@angular/material';
import {ToastrModule} from 'ngx-toastr';
import {ImageCropperModule} from 'ngx-image-cropper';
import { NavbarComponent } from './navbar/navbar.component';
import { PageComponent } from './page/page.component';
import { PrincipaleComponent } from './principale/principale.component';
import { CarouselModule, WavesModule } from 'angular-bootstrap-md';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PdfDialogComponent } from './pdf-dialog/pdf-dialog.component';
import { ReviewComponent } from './review/review.component';
import {ColorSketchModule} from 'ngx-color/sketch';
import {ColorPickerModule} from 'ngx-color-picker';

@NgModule({
  declarations: [
    AppComponent,
    PdfViewerComponent,
    PdfUploaderComponent,
    NavbarComponent,
    PageComponent,
    PrincipaleComponent,
    PdfDialogComponent,
    ReviewComponent,
  ],
  imports: [
    NgbModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ImageCropperModule,
    HttpClientModule,
    ReactiveFormsModule,
    FileUploadModule,
    MatCardModule,
    PdfViewerModule, // <- Add PdfViewerModule to imports
    MatDialogModule,
    MatIconModule,
    MatProgressBarModule,
    MatTableModule,
    CarouselModule,
    WavesModule,
    ToastrModule.forRoot(),
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatStepperModule,
    MatToolbarModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
    ColorSketchModule,
    ColorPickerModule,
    // ToastrModule added

  ],
  entryComponents : [PdfDialogComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
