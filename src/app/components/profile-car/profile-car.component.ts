import { Component, OnInit } from '@angular/core';
import { CarService } from 'src/app/services/car-service/car.service';
import { Car } from 'src/app/models/car';

@Component({
  selector: 'app-profile-car',
  templateUrl: './profile-car.component.html',
  styleUrls: ['./profile-car.component.css']
})
export class ProfileCarComponent implements OnInit {

  make: string;
  model:string;
  nrSeats:number;
  currentCar: Car;
  success :string;

  constructor(private carService: CarService) { }

  ngOnInit() {

    this.carService.getCarByUserId2(sessionStorage.getItem("userid")).subscribe((response)=>{
      this.currentCar = response;
      this.make = response.make;
      this.model = response.model;
      this.nrSeats = response.seats;

    });
  }

    if (this.year <= 0) {
      this.currentCar = null;
      return this.fail = "Invalid information";
    }
    this.userService.updateUserInfo(this.currentUser).subscribe(response => {
      this.userService.updateIsDriver(true, this.currentUser.userId);
      this.success = "";
      this.fail = "";
      this.success = "Updated Successfully!";
    }, err => {
      this.fail = "Invalid information!";
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
    this.currentCar.seats = this.nrSeats;
    this.carService.updateCarInfo(this.currentCar).subscribe(response => {
      this.success = "";
      this.fail = "";
      this.success = "Updated Successfully!";
    }, err => {
      this.fail = "Invalid information!";
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
