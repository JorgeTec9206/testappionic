import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  public dataResult: any = {};

  constructor() { }

  ngOnInit(): void {

    const status = document.querySelector('#status');
    const mapLink: any = document.querySelector('#map-link');

    mapLink.href = '';
    mapLink.textContent = '';


    document.querySelector('#find-me').addEventListener('click', () => {

      navigator.geolocation.getCurrentPosition(this.success);


    });








  }

  arbol() {
    //arbol-print
    for (var i = 10; i >= 0; i--) {
      document.write("<br/>");
      for (var j = 0; j <= 10; j++) {

        if (j > 8 && j < 10 && i == 10) {
          document.write("&nbsp");
          document.write('*');
        }
        if (i >= j) {
          document.write("&nbsp");
        } else {
          document.write("0");
        }
      }
    }
  }

  print() {
    this.dataResult.latitudlongitud = (JSON.parse(localStorage.getItem('lonlat')));
    this.dataResult.zipcode = localStorage.getItem('zipcode');

    console.log(this.dataResult);


    /* console.log(JSON.parse(localStorage.getItem('lonlat')));
    console.log(localStorage.getItem('zipcode')); */
  }



  success(position) {


    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    console.log(latitude);
    console.log(longitude);

    var api_key = 'e3f3b23782714dc39435e134b087bc36';


    var api_url = 'https://api.opencagedata.com/geocode/v1/json'

    var request_url = api_url
      + '?'
      + 'key=' + api_key
      + '&q=' + encodeURIComponent(latitude + ',' + longitude)
      + '&pretty=1'
      + '&no_annotations=1';

    // see full list of required and optional parameters:
    // https://opencagedata.com/api#forward

    var request = new XMLHttpRequest();
    request.open('GET', request_url, true);



    request.onload = function () {
      // see full list of possible response codes:
      // https://opencagedata.com/api#codes

      if (request.status === 200) {
        // Success!
        var data = JSON.parse(request.responseText);

        //alert(data.results[0].formatted); // print the location
        console.log(data.results[0]);

        const arrayc = [];

        arrayc.push(data.results[0].geometry);

        localStorage.setItem('lonlat', JSON.stringify(data.results[0].geometry));
        localStorage.setItem('zipcode', data.results[0].components.postcode);


      } else if (request.status <= 500) {
        // We reached our target server, but it returned an error

        console.log("unable to geocode! Response code: " + request.status);
        var data = JSON.parse(request.responseText);
        console.log('error msg: ' + data.status.message);
      } else {
        console.log("server error");
      }

    };

    request.onerror = function () {
      // There was a connection error of some sort
      console.log("unable to connect to server");
    };

    // make the request
    return request.send();


    /* status.textContent = '';
    mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
    mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`; */
  }


}
