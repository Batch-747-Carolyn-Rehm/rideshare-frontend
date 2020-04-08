import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, from, of } from 'rxjs';
import { switchMap, map, tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GoogleMapsService {
  private googleMapsScript: HTMLScriptElement = null;
  private geocoder: google.maps.Geocoder = null;
  private directionService: google.maps.DirectionsService = null;
  private map: google.maps.Map = null;
  isMapLoading$: Observable<boolean>;

  constructor(private http: HttpClient) { }

  private initDirectionService() {
    console.log("Init Google Maps Direction Service.");
    this.directionService = new google.maps.DirectionsService();
  }

  private initGeocoder() {
    console.log("Init Google Maps Geocoder");
    this.geocoder = new google.maps.Geocoder();
  }

  private getGoogleApi() {
    return this.http.get(`${environment.loginUri}getGoogleApi`).pipe(
      catchError(err => {
        console.log(err);
        if (this.googleMapsScript) {
          document.removeChild(this.googleMapsScript);
          this.googleMapsScript = null;
        }
        return of(null)
      })
    );
  }

  private isScriptLoaded(): Observable<boolean> {
    if (!this.googleMapsScript) {
      return this.getGoogleApi().pipe(
        switchMap(response => {
          if (response["googleMapAPIKey"] != undefined) {
            return from(new Promise((resolve) => {
              let script: HTMLScriptElement = document.createElement('script');
              script.src = `http://maps.googleapis.com/maps/api/js?key=${response["googleMapAPIKey"][0]}`;
              script.addEventListener('load', r => resolve());
              document.head.appendChild(script);
              this.googleMapsScript = script;
            })).pipe(
              tap(() => this.directionService || this.initDirectionService()),
              map(() => true)
            )
          } else {
            console.log("Undefined API")
            return of(false);
          }
        })
      )
    }

    return of(true);
  }

  getDirection(origin, destination): Observable<any> {
    return this.isScriptLoaded().pipe(
      switchMap(() => {
        return new Observable(observer => {
          this.directionService.route({
            origin: origin,
            destination: destination,
            travelMode: google.maps.TravelMode.DRIVING
          }, (results, status) => {
            if (status == google.maps.DirectionsStatus.OK) {
              let route = new google.maps.DirectionsRenderer({
                draggable: false,
                map: this.map
              });
              route.setDirections(results);
              observer.next(route)
            } else {
              console.log('Could not display directions due to: ' + status);
              observer.next()
            }
            observer.complete();
          })
        })
      })
    )
  }

  initMap(mapElement, mapProperties) {
    this.isMapLoading$ = of(true);
    return this.isScriptLoaded().pipe(
      switchMap(() => {
        this.isMapLoading$ = of(false);
        if(sessionStorage.getItem("lat") && sessionStorage.getItem("lng")) {
          const latLng = new google.maps.LatLng(Number(sessionStorage.getItem("lat")), Number(sessionStorage.getItem("lng")))
          mapProperties = {
            ...mapProperties,
            center: latLng,
          };
        }
        
        return of(new google.maps.Map(mapElement.nativeElement, mapProperties));
      }),
      catchError(err => {
        this.isMapLoading$ = of(false);
        console.log(err)
        return of(null);
      })
    );
  }
}
