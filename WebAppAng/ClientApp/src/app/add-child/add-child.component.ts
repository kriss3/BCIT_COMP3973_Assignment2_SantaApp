import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SantaService } from '../services/santaService.service';
import { Router } from "@angular/router"; 
import { Local } from 'protractor/built/driverProviders';

@Component({
  selector: 'app-add-child',
  templateUrl: './add-child.component.html'
})
export class AddChildComponent implements OnInit {

  public childFormLabel: string = 'Add Child';
  public childformbtn: string = 'Save';

  constructor(private _frmBuilder: FormBuilder, private router: Router, private _svc: SantaService) { }

  addForm: FormGroup;
  btnvisibility: boolean = true;

  ngOnInit() {

    this.addForm = this._frmBuilder.group({
      id: [''],
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      birthDate: ['', [Validators.required]],
      street: ['', [Validators.required, Validators.minLength(3)]],
      city: ['', [Validators.required, Validators.minLength(3)]],
      province: ['', Validators.required],
      postalCode: ['', Validators.required],
      country: ['', Validators.required],
      latitude: ['', Validators.required],
      longitude: ['', Validators.required],
      isNaughty: ['', [Validators.required]],
      createdDate: [''],
      createdBy: ['']
    });

    let childId = localStorage.getItem('editChildId');
    if (+childId > 0) {

      this._svc.getChildById(+childId)
        .subscribe(data => {
          this.addForm.patchValue(data);
       });
      
      this.btnvisibility = false;
      this.childFormLabel = 'Edit Child Details';
      this.childformbtn = 'Update';
    }
  }

  onSubmit() {
    console.log('Create fire');
    this._svc.createChild(this.addForm.value)
      .subscribe(data => {
        this.router.navigate(['children']);
      },
        error => {
          alert(error);
        });
  }

  onUpdate() {
    console.log('Update fire');
    var editChild = localStorage.getItem('editChildId');
    alert('Calling Update with Id: ' + editChild);
    this._svc.updateChild(editChild, this.addForm.value)
      .subscribe(data => {
      this.router.navigate(['children']);
    },
      error => {
        alert(error);
      });
  }  
}
