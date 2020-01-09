import { BrowserModule} from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PdfViewerComponent } from './pdf-viewer/pdf-viewer.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PdfUploaderComponent} from './pdf-uploader/pdf-uploader.component';
import {FileUploadModule} from 'ng2-file-upload';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { PdfViewerModule } from 'ng2-pdf-viewer'; // <- import PdfViewerModule
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule, MatMenuModule, MatOptionModule,
  MatProgressBarModule, MatProgressSpinnerModule, MatSelectModule, MatSlideToggleModule, MatStepperModule,
  MatTableModule, MatToolbarModule, MatTooltipModule
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
import { HelpComponent } from './help/help.component';

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
    HelpComponent,
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
    MatOptionModule,
    MatSelectModule,
    MatTooltipModule,
    MatMenuModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
    // ToastrModule added
  ],
  entryComponents : [PdfDialogComponent, HelpComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}
