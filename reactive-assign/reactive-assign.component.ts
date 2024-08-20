import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive-assign',
  templateUrl: './reactive-assign.component.html',
  styleUrls: ['./reactive-assign.component.css']
})
export class ReactiveAssignComponent implements OnInit {
  myReactiveForm!: FormGroup;
  existingNames: string[] = ['Codemind', 'JohnDoe', 'JaneSmith'];
  genders: string[] = ['Male', 'Female', 'Other'];
  constructor(private _fb: FormBuilder) {
    this.createForm();
   }

  ngOnInit(): void {
  }

  createForm() 
  {
    this.myReactiveForm = this._fb.group({
      firstName: ['Neha Patil', [Validators.required, Validators.minLength(5), Validators.maxLength(25), Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/), this.uniqueNameValidator.bind(this)]],
      date: ['', Validators.required],
      gender: [null, Validators.required],
      bio: ['', [Validators.maxLength(256)]],
      userName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(25), Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/), this.uniqueNameValidator.bind(this)]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.pattern(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]/)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.checkPasswordMatch }); // Apply at FormGroup level
  }

  checkPasswordMatch(group: FormGroup): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;

    return password && confirmPassword && password !== confirmPassword
      ? { 'mismatch': true }
      : null;
  }

  uniqueNameValidator(control: FormControl): ValidationErrors | null {
    const firstName = control.value as string;
    if (this.existingNames.includes(firstName)) {
      return { 'nameNotUnique': true };
    }
    return null;
  }
}

