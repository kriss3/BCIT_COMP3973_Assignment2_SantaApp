import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { SantaService } from '../services/santaService.service';
import { Router } from "@angular/router";
import { Child } from '../Models/child.models';

declare var jquery: any;
declare var $: any;


@Component({
  selector: 'app-view-child',
  templateUrl: './view-child.component.html'
})
export class ViewChildComponent implements OnInit {

  constructor(private _frmBuilder: FormBuilder, private router: Router, private _svc: SantaService) { }

  viewForm: FormGroup;
  btnvisibility: boolean = true;
  myChild: Child = null;

  lat: number;
  lng: number;
  fullName: string;

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
      dateCreated: ['']
    });

    let childId = localStorage.getItem('viewChildId');
    if (+childId > 0) {

      this._svc.getChildById(+childId)
        .subscribe(data => {
          this.viewForm.patchValue(
            {
              firstName: data.firstName,
              lastName: data.lastName,
              birthDate: data.birthDate,
              street: data.street,
              city: data.city,
              province: data.province,
              postalCode: data.postalCode,
              country: data.country,
              latitude: data.latitude,
              longitude: data.longitude,
              isNaughty: data.isNaughty,
            });

          this.lat = data.latitude;
          this.lng = data.longitude;
          this.fullName = `${data.firstName} ${data.lastName}`;
          sessionStorage.setItem('lat', `${this.lat}`);
          sessionStorage.setItem('lng', `${this.lng}`);
          sessionStorage.setItem('fullName', this.fullName);

        });

        this.btnvisibility = false;
      }
  }


  public childFormLabel: string = 'View Child';
  public childformbtn: string = 'Open Location';

  loadMyMap() {
    console.log('Calling Bing API');
    alert('Calling BING API to GET MAP');
    this.loadMap();
  }

  loadMap() {
    alert('test');
  }

}
