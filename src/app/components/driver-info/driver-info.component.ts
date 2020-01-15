import { Component, OnInit } from '@angular/core';
import { CarService } from 'src/app/services/car-service/car.service';
import { Car } from 'src/app/models/car';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-driver-info',
  templateUrl: './driver-info.component.html',
  styleUrls: ['./driver-info.component.css']
})
export class DriverInfoComponent implements OnInit {

  /**
   * Sets all variables
   */

  allAvailableCars: Car[] = [];
  availableCars: Car[] = [];

  /**
   * Set order year as a boolean false
   */

  orderYear: boolean = false;

  /**
   * Set order first name as a boolean false
   */
  orderFirstName: boolean = false;

  /**
   * Set search name field as a string
   */

  searchName: string = '';

  /**
   * Set search location as a string
   */
  searchLocation: string = '';

  /**
   * A constructor 
   * @param carService A car service is injected.
   * @param authService An auth service is injected.
   * @param router  A router service is injected.
   */
  constructor(private carService: CarService, private authService: AuthService, private router: Router) { }

  /**
   * A function that set the component
   */
  ngOnInit() {
    let userId = this.authService.user.userId;
    if (!userId) {
      this.router.navigate(['']);
    } else {
      this.carService.getAllCars().subscribe(
        data => {
          this.allAvailableCars = data.filter(car => car.user.acceptingRides);
          this.orderByLocation();
        }
      )
    }
  }

  /**
   * A function the sorts the car object by batch location
   */

  orderByLocation() {
    let userLocation = this.authService.user.batch.batchLocation;

    this.allAvailableCars.sort((a, b) => a.user.batch.batchLocation > b.user.batch.batchLocation ? 1 : -1);
    this.allAvailableCars = this.allAvailableCars.filter(car => car.user.batch.batchLocation === userLocation).concat(this.allAvailableCars.filter(car => car.user.batch.batchLocation !== userLocation));
    this.availableCars = this.allAvailableCars;
  }

  /**
   * A function that orders the year of the car
   */

  orderByYear() {
    if (!this.orderYear) {
      this.availableCars.sort((a, b) => b.year - a.year);
    } else {
      this.availableCars.sort((a, b) => a.year - b.year);
    }
    this.orderYear = !this.orderYear;
  }

  /**
   * A function that orders the data by full name
   */

  orderByFullName() {
    if (!this.orderFirstName) {
      this.availableCars.sort((a, b) => a.user.firstName > b.user.firstName ? 1 : -1);
    } else {
      this.availableCars.sort((a, b) => a.user.firstName > b.user.firstName ? -1 : 1);
    }
    this.orderFirstName = !this.orderFirstName;
  }

  /**
   * A function that searches driver by name
   */

  searchDriverByName() {
    this.availableCars = this.allAvailableCars.filter(car => `${car.user.firstName} ${car.user.lastName}`.toLowerCase().includes(this.searchName.toLowerCase()));
  }

  /**
   * A function that searchs driver by location
   */

  searchDriverByLocation() {
    this.availableCars = this.allAvailableCars.filter(car => car.user.batch.batchLocation.toLowerCase().includes(this.searchLocation.toLowerCase()));
  }

  /**
   * A GET method that retrieves all driver
   */
  showAllDrivers() {
    this.searchName = '';
    this.searchLocation = '';
    this.orderByLocation();
  }
  
}
