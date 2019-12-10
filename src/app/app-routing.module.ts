import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PdfViewerComponent} from './pdf-viewer/pdf-viewer.component';
import {PdfUploaderComponent} from './pdf-uploader/pdf-uploader.component';
import {PageComponent} from './page/page.component';
import {PrincipaleComponent} from './principale/principale.component';
import {ReviewComponent} from './review/review.component';


const routes: Routes = [
  { path: 'pdf', component: PdfViewerComponent},
  { path: 'page', component: PageComponent},
  { path: 'main', component: PdfUploaderComponent},
  { path: 'principale', component: PrincipaleComponent },
  { path: 'review', component: ReviewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
