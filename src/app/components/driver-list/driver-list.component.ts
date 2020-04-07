import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user-service/user.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BatchService } from '../../services/batch-service/batch.service';
import { User } from 'src/app/models/user';
import { Batch } from 'src/app/models/batch';
import { Car } from 'src/app/models/car';
import { GoogleMapsService } from 'src/app/services/google-maps-service/google-maps.service';
import { tap, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-driver-list',
  templateUrl: './driver-list.component.html',
  styleUrls: ['./driver-list.component.css']
})

/**
 * The DriverContactModel component
 */

export class DriverListComponent implements OnInit {

  /**
   * sets location to string
   * sets mapProperties
   * sets avaibleCars to Array
   * sets drivers to Array
   * @type {string}
   * @memberof DriverListComponent
   */
  currentUserId: number;
  currentUser: User = null;
  location: string = "";
  mapProperties: {};
  availableCars: Array<Car> = [];
  drivers: Array<User> = [];
  batches: Array<Batch> = [];
  selectedBatch: number;
  selectedFilters: Array<any> = [];
  geocoder: any;
  sortDirection: string = "";
  sortBy: string = "";
  pageNo: number = 1;
  pageSize: number = 5;
  routes = [];

  @ViewChild('map', null) mapElement: any;
  map: google.maps.Map;

  /**
   * This is a constructor
   * Creates an instance of DriverListComponent.
   * @param {HttpClient} http
   * @param {UserService} userService
   * @memberof DriverListComponent
   */
  constructor(private http: HttpClient, private userService: UserService,
    private batchService: BatchService, private googleMapsService: GoogleMapsService) { }

  /**
   * on init is calls on location of user
   * pushes information to driver
   * @memberof DriverListComponent
   */
  ngOnInit() {
    this.batches = this.batchService.getAllBatches();
    this.getGoogleApi();
    this.currentUserId = JSON.parse(sessionStorage.getItem("userid"));

    // this.googleMapsService.initMap(this.mapElement, null).pipe(switchMap(res => {
    //   this.map = res;
    //   console.log(this.map)
    //   return this.userService.getFilterSortedDrivers(this.selectedFilters, this.currentUserId, this.selectedBatch, this.sortBy, this.sortDirection)
    // })).subscribe(data => {
    //   this.drivers = data;
    //   if (this.drivers.length > 0) {
    //     // this.googleMapsService.getDirection()
    //     console.log(this.map)
    //     this.showDriversOnMap(this.location, this.drivers);
    //   }
    // })

    this.sleep(2500).then(() => {
      this.mapProperties = {
        center: new google.maps.LatLng(Number(sessionStorage.getItem("lat")), Number(sessionStorage.getItem("lng"))),
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      this.geocoder = new google.maps.Geocoder;
      this.map = new google.maps.Map(this.mapElement.nativeElement, this.mapProperties);
      this.userService.getUserById2(this.currentUserId.toString()).subscribe(res => {
        console.log(res);
        this.currentUser = res;
        this.location = `${res.hAddress}, ${res.hCity}, ${res.hState}`;
        this.selectedBatch = res.batch.batchNumber
        return this.getFilterSortedDrivers();
      })
      // this.getFilterSortedDrivers();
    });
  }
  /**
   *
   *
   * @param {*} ms
   * @returns
   * @memberof DriverListComponent
   */
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * This function calls the Google api
   *
   * @memberof DriverListComponent
   */
  getGoogleApi() {
    this.http.get(`${environment.loginUri}getGoogleApi`)
      .subscribe(
        (response) => {
          if (response["googleMapAPIKey"] != undefined) {
            new Promise((resolve) => {
              let script: HTMLScriptElement = document.createElement('script');
              script.addEventListener('load', r => resolve());
              script.src = `http://maps.googleapis.com/maps/api/js?key=${response["googleMapAPIKey"][0]}`;
              document.head.appendChild(script);
            });
          }
        }
      );
  }

  /**
   * This function shows drivers on the map
   *
   * @param {*} origin
   * @param {*} drivers
   * @memberof DriverListComponent
   */
  showDriversOnMap(origin, drivers) {
    drivers.forEach(element => {
      const destination = element.hCity + "," + element.hState
      var directionsService = new google.maps.DirectionsService;
      var directionsRenderer = new google.maps.DirectionsRenderer({
        draggable: false,
        map: this.map
      });
      this.displayRoute(origin, destination, directionsService, directionsRenderer);
    });
  }

  /**
  * This function shows the route from the driver to endpoint
  *
  * @param {*} origin
  * @param {*} destination
  * @param {*} service
  * @param {*} display
  * @memberof DriverListComponent
  */
  displayRoute(origin, destination, service, display) {
    service.route({
      origin: origin,
      destination: destination,
      travelMode: google.maps.TravelMode.DRIVING,
    }, function (response, status) {
      if (status === 'OK') {
        display.setDirections(response);
      } else {
        console.log('Could not display directions due to: ' + status);
      }
    });
    this.routes.push(display);
  }

  onFilterClick() {
    this.pageNo = 1;
    this.getFilterSortedDrivers();
  }

  onSortChange(col: string): void {
    // If user clicks on same column, change sort direction. Else sort by new col
    this.pageNo = 1;
    if (this.sortBy == col) {
      if (this.sortDirection == 'asc') this.sortDirection = 'desc'
      else this.sortDirection = 'asc'
    } else {
      this.sortBy = col;
      this.sortDirection = 'asc'
    }
    this.getFilterSortedDrivers();
  }

  onNext() {
    this.pageNo += 1;
    this.getFilterSortedDrivers();
  }

  onPrevious() {
    this.pageNo -= 1;
    this.getFilterSortedDrivers();
  }

  getFilterSortedDrivers() {
    this.userService.getFilterSortedDrivers(this.selectedFilters, this.currentUserId, this.selectedBatch, this.sortBy, this.sortDirection, this.pageNo, this.pageSize).subscribe(data => {
      this.drivers = data;
      if (this.drivers.length > 0) {
        if (this.routes.length > 0) this.routes.map(r => r.setMap(null))
        this.showDriversOnMap(this.location, this.drivers);
      }
    })

  }
}
