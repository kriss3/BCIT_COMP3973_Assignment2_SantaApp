import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { SantaService } from '../services/santaService.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-view-child',
  templateUrl: './view-child.component.html'
})
export class ViewChildComponent implements OnInit {

  constructor(private _frmBuilder: FormBuilder, private router: Router, private _svc: SantaService) { }

  viewForm: FormGroup;
  btnvisibility: boolean = true;

  ngOnInit() {

    this.viewForm = this._frmBuilder.group({
      id: [],
      firstName: [''],
      lastName: [''],
      birthDate: [''],
      street: [''],
      city: [''],
      province: [''],
      postalCode: [''],
      country: [''],
      latitude: [''],
      longitude: [''],
      isNaughty: [''],
      dateCreated: [''],
      createdBy: ['']
    });


    let childId = localStorage.getItem('viewChildId');
    if (+childId > 0) {

        //this._svc.getChildById(+childId).subscribe(data => {  
        //  this.addForm.patchValue(data);
        //})

      this._svc.getChildById(+childId)
        .subscribe(data => {
          this.viewForm.patchValue(data);
        });
        
        this.btnvisibility = false;
      }
  }


  public childFormLabel: string = 'View Child';
  public childformbtn: string = 'Open Location';

  onGetLocation() {
    console.log('Calling Bing API');
    alert('Calling BING API to GET MAP');
    //this._svc.createChild(this.addForm.value)
    //  .subscribe(data => {
    //    this.router.navigate(['list-children']);
    //  },
    //    error => {
    //      alert(error);
    //    });
  }

}
