import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user-service/user.service';
import { BatchService } from '../../services/batch-service/batch.service';
import { User } from 'src/app/models/user';
import { Batch } from 'src/app/models/batch';
import { GoogleMapsService } from 'src/app/services/google-maps-service/google-maps.service';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

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
  drivers: Array<User> = [];
  batches: Array<Batch> = [];
  selectedBatch: number;
  selectedFilters: Array<string> = [];
  sortDirection: string = "";
  sortBy: string = "";
  loading: boolean = true;
  showRecommendationLabel: boolean = true;
  pageNo: number = 1;
  pageSize: number = 5;
  routes: Array<google.maps.DirectionsRenderer> = [];
  @ViewChild('map', null) mapElement: any;
  map: google.maps.Map = null;
  isMapLoading$: Observable<boolean>;

  /**
   * This is a constructor
   * Creates an instance of DriverListComponent.
   * @param {HttpClient} http
   * @param {UserService} userService
   * @memberof DriverListComponent
   */
  constructor(private userService: UserService,
    private batchService: BatchService, private googleMapsService: GoogleMapsService) { }

  /**
   * on init is calls on location of user
   * pushes information to driver
   * @memberof DriverListComponent
   */
  ngOnInit() {
    this.batches = this.batchService.getAllBatches();
    this.isMapLoading$ = this.googleMapsService.isMapLoading$;
    this.mapProperties = {
      zoom: 15,
      mapTypeId: "roadmap"
    };
    this.currentUserId = JSON.parse(sessionStorage.getItem("userid"));

    // Getting current user information by the session userID, but will need to check if user has been authenticated already
    this.userService.getUserById2(this.currentUserId.toString()).pipe(switchMap(user => {
      this.currentUser = user;
      this.location = `${this.currentUser.hAddress}, ${this.currentUser.hCity}, ${this.currentUser.hState}`;
      this.selectedBatch = this.currentUser.batch.batchNumber
      return this.googleMapsService.initMap(this.mapElement, this.mapProperties)
    })).subscribe(res => {
      this.map = res;
      this.getFilterSortedDrivers();
    })

  }

  /**
   * This function shows drivers on the map
   *
   * @param {*} origin
   * @param {*} drivers
   * @memberof DriverListComponent
   */
  showDriversOnMap(origin, drivers) {
    drivers.forEach(driver => {
      const destination = driver.hAddress + "," + driver.hCity + "," + driver.hState
      this.googleMapsService.getDirection(origin, destination).subscribe(res => {
        const route = new google.maps.DirectionsRenderer();
        const options: google.maps.DirectionsRendererOptions = {
          draggable: false,
          map: this.map,
          markerOptions: {
            title: `${driver.firstName} ${driver.lastName}`,
            // icon: ""
          },
        }

        route.setOptions(options);
        route.setDirections(res);
        this.routes.push(route);
      })})
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

  // Clears the routes on the map, but still keep them in the array.
  clearRoutes(): void {
    if (this.routes.length > 0) {
      this.routes.forEach(r => r.setMap(null))
    }
  }

  // Deletes all routes in the array by removing references to them and clearing routes off the map.
  deleteRoutes(): void {
    this.clearRoutes();
    this.routes = [];
  }

  
  getFilterSortedDrivers() {
    this.loading = true;

    // Deleting routes for now, but may want to cache routes in case same data in future
    this.deleteRoutes();

    this.userService.getFilterSortedDrivers(this.selectedFilters, this.currentUserId, this.selectedBatch, this.sortBy, this.sortDirection, this.pageNo, this.pageSize).subscribe(data => {
      this.loading = false;
      this.drivers = data;

      if (this.drivers.length > 0) {
        this.showDriversOnMap(this.location, this.drivers);
      }

      this.showRecommendationLabel = this.selectedFilters.length === 0;
    }, () => {
      //404 status is returned if no drivers are found so error block is reached instead
      this.drivers = [];
      this.showRecommendationLabel = this.selectedFilters.length === 0;
      this.loading = false;
    })

  }
}
