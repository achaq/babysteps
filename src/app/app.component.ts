import {AfterViewInit, Component, OnInit} from '@angular/core';
import Cropper from 'cropperjs';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {FormBuilder} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material/dialog';
import {HelpComponent} from './help/help.component';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'pdf anonym';

  constructor(private router: Router, private dialog: MatDialog,  private translate: TranslateService) {
    this.router.navigate(['principale']);
    translate.setDefaultLang('fr');
  }

  ngOnInit(): void {
  }

  gohome() {
    this.router.navigate(['principale']);
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.width = '70%';
    dialogConfig.height = '80%';
    // dialogConfig.closeOnNavigation = true;
    this.dialog.open(HelpComponent, dialogConfig);
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }
}

