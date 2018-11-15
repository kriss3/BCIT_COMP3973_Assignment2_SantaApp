import { Component, OnInit } from '@angular/core';
import { Child } from "../Models/child.models";
import { Router } from "@angular/router";
import { SantaService } from '../services/santaService.service';
import { DataService } from '../shared/dataService';


@Component({
  selector: 'app-listchildren-component',
  templateUrl: './list-children.component.html'
})
export class ListChildrenComponent implements OnInit {

  public myClassMessage = "My Message from Children Component";
  public santaChildren: Child[] = []; 

  constructor(private _svc: SantaService, private router: Router, private data: SantaService) { }  

  ngOnInit(): void {
      this.getChildrenPromise(); 
  }

  public DisplayMessage() {
    this.myClassMessage;
  }

  getChildrenPromise(): void {
    this._svc.getChildren()
      .subscribe(data => this.santaChildren = data);
  }


  viewChild(_child): void {
    alert('Viewing Details of Child Id ' + _child.id);
    localStorage.removeItem('viewChildId');
    localStorage.setItem('viewChildId', _child.id.toString());
    this.router.navigate(['view-child']);

  }  

  deleteChild(_child): void {
    alert('Removing Child Id: ' + _child.id);
    this._svc.deleteChild(_child.id)
      .subscribe(data => {
        alert("Record Id: " + _child.id + " deleted Successful !");
        this.refresh();
      })
  }

  private refresh() {
    this.router.navigate(['children']);
    this.ngOnInit();
  }

  editChild(_child): void {
    alert('Editing Child Id ' + _child.id );
    localStorage.removeItem('editChildId');
    localStorage.setItem('editChildId', _child.id.toString());
    this.router.navigate(['add-child']);
  }

  addChild(): void {
    localStorage.removeItem('editChildId');
    localStorage.removeItem('viewChildId');
    this.router.navigate(['add-child']);
  }
}
