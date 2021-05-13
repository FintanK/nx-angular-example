import { Component, OnInit } from '@angular/core';
import { ApplicationsFacade } from '../../..';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'remote-insurance-corp-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss']
})
export class ApplicationsComponent implements OnInit {

  userForm: FormGroup;

  constructor(private applicationsFacade: ApplicationsFacade, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['',[Validators.required]],
      email: ['', [Validators.required]]
    });
  }

  onSubmit(){
    // Ran out of time would have implemented https://ngrx-forms.readthedocs.io/en/master/
  }

}
