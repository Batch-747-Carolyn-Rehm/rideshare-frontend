import { Component, OnInit } from '@angular/core';
import { CarService } from 'src/app/services/car-service/car.service';
import { Car } from 'src/app/models/car';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user-service/user.service';

@Component({
  selector: 'app-profile-car',
  templateUrl: './profile-car.component.html',
  styleUrls: ['./profile-car.component.css']
})
/**
 *
 *
 * @export
 * @class ProfileCarComponent
 * @implements {OnInit}
 */
export class ProfileCarComponent implements OnInit {
 /**
 *
 *
 * @type {string}
 * @memberof ProfileCarComponent
 */
  make: string = "";
  model:string = "";
  color: string = "";
  year: number = 0;
  nrSeats:number = 0;
  currentCar: Car;
  success :string;
  fail: string;
  currentUser: User;
/**
 *Creates an instance of ProfileCarComponent.
 * @param {CarService} carService
 * @param {UserService} userService
 * @memberof ProfileCarComponent
 */
  constructor(private carService: CarService, private userService: UserService) { }

/**
 * OnInit function
 *
 * @memberof ProfileCarComponent
 */
ngOnInit() {

    this.carService.getCarByUserId2(sessionStorage.getItem("userid")).subscribe((response)=>{
      this.currentCar = response;
      this.make = response.make;
      this.model = response.model;
      this.color = response.color;
      this.year = response.year;
      this.nrSeats = response.seats;
    });


    this.userService.getUserById2(sessionStorage.getItem("userid")).subscribe((response)=>{
      this.currentUser = response;
    });
  }
/**
 *
 * allows user to create a car
 * @memberof ProfileCarComponent
 */
createCarInfo(){
    this.currentCar = new Car();
    this.currentCar.make = this.make;
    this.currentCar.model= this.model;
    this.currentCar.color = this.color;
    this.currentCar.year = this.year;
    this.currentCar.seats = this.nrSeats;
    this.carService.createCar(this.currentCar,this.currentUser.userId).subscribe(response => {
      this.userService.updateIsDriver(true, this.currentUser.userId);
      this.success = "";
      this.fail = "";
      if (Object.keys(response).length === 0) {
        this.success = "Updated Successfully!";
      } else {
        this.fail = "Invalid information!";
      }
    });
    
  }
/**
 *allows user to update existing car
 * Function that updates car info
 *
 * @memberof ProfileCarComponent
 */
updatesCarInfo(){
    this.currentCar.make = this.make;
    this.currentCar.model= this.model;
    this.currentCar.color = this.color;
    this.currentCar.year = this.year;
    this.currentCar.seats = this.nrSeats;
    this.carService.updateCarInfo(this.currentCar).subscribe(response => {
      this.success = "";
      this.fail = "";
      if (Object.keys(response).length === 0) {
        this.success = "Updated Successfully!";
      } else {
        this.fail = "Invalid information!";
      }
    });
  }
/**
 *will create a new car if user does not have a car
 *
 * will update a car inof if car is not present
 * @returns
 * @memberof ProfileCarComponent
 */
onSubmit() {
    if(this.currentCar) {
      return this.updatesCarInfo();
    } else {
      return this.createCarInfo();
    }
  }
}
