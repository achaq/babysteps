import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PdfViewerComponent} from './pdf-viewer/pdf-viewer.component';
import {PdfUploaderComponent} from './pdf-uploader/pdf-uploader.component';


const routes: Routes = [
  { path: 'pdf', component: PdfViewerComponent},
  { path: '**', component: PdfUploaderComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
