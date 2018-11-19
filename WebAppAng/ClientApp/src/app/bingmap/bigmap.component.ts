import { Component, OnInit, Input } from '@angular/core';

import { MarkerTypeId, IMapOptions, IBox, IMarkerIconInfo, ILatLong, MapTypeId } from 'angular-maps';

@Component({
  selector: 'bingmap-component',
  templateUrl: './bingmap.component.html',
  styleUrls: ['./bingmap.component.css']
})
export class BingMapComponent {

  lat:number = +sessionStorage.getItem('lat');
  lng:number = +sessionStorage.getItem('lng');
  fullName:string = sessionStorage.getItem('fullName');
  
 
  _markerTypeId = MarkerTypeId;
  _options: IMapOptions = {
    disableBirdseye: false,
    disableStreetside: false,
    navigationBarMode: 1,
    mapTypeId: MapTypeId.road,
    zoom: 4
  };


  _box: IBox = {
    maxLatitude: this.lat + 50,
    maxLongitude: this.lng + 50,
    minLatitude: this.lat -50,
    minLongitude: this.lng - 50,
  };

  private _iconInfo: IMarkerIconInfo = {
    markerType: MarkerTypeId.FontMarker,
    fontName: 'FontAwesome',
    fontSize: 48,
    color: 'red',
    markerOffsetRatio: { x: 0.5, y: 1 },
    text: '\uF276'
  };

  _markers: Array<ILatLong> = new Array<ILatLong>();

  constructor() {
    
    this._markers.push({ latitude: this.lat, longitude: this.lng })
  };
}
