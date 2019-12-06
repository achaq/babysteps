import { Component, OnInit } from '@angular/core';
import {FormlyFieldConfig} from '@ngx-formly/core';


export interface StepType {
  label: string;
  fields: FormlyFieldConfig[];

}
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {



  steps: StepType[] = [
    {
      label: 'Upload the file(s)',
      fields: []
    },
    {
      label: 'the page of selection',
      fields: [
        {
          key: 'the page',
          type: 'input',
          templateOptions: {
            label: 'page',
            required: true,
          },
        },
      ],
    },
    {
      label: 'Anonymisation ',
      fields: [
]},
  ];

  constructor() { }

  ngOnInit() {
  }

}
