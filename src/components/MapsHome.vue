<template>
  <div class="home">
    <h5>Trip distance: {{ distance }} km, duration: {{ duration }}.</h5>
    <GmapMap
      ref="mapRef"
      :center="{lat:54.7492, lng:24.6161}"
      :zoom="8"
      class="google-map"
    ></GmapMap>
    <br> 
  </div>
</template>

<script>
import {gmapApi} from 'vue2-google-maps';

export default {
  name: 'Home', 
  props: {
    startCoordinates: Object, // trip start point coordinates
  },
  data() {
    return {
      directionsService: null,
      directionsDisplay: null,
      distance: 0,
      duration: 0
    };
  },
  computed: {
    google: gmapApi
  },
  
  methods: {
    calculateAndDisplayRoute() {

        // using coordinates
        /*var sta = { 
            lat: 55.148824,
            lng: 24.5653061
            };*/
        
        // getting coordinates from props
        var sta = { lat: this.startCoordinates.lat, lng: this.startCoordinates.lng};

        var des = 'Vilnius';     // or you can write city name

        // waypoints example
        var waypts = [];
        waypts.push({location: { lat: 55.497692,
                  lng: 25.6020783 }, stopover: true});
        waypts.push({location: { lat: 55.230595,
                  lng: 25.416945 }, stopover: true});

        this.directionsService.route({
            origin: sta,
            destination: des, 
            waypoints: waypts,    // waypoints
            optimizeWaypoints: true,
            travelMode: 'DRIVING', // WALKING; BICYCLING
        }, (response, status) => {
            if (status === 'OK') {
                this.directionsDisplay.setDirections(response);

                // distance and duration is accurate if where are no added waypoints, because legs[0] not from 0 to n. 
                
                this.distance = this.directionsDisplay.directions.routes[0].legs[0].distance.text;
                this.duration = this.directionsDisplay.directions.routes[0].legs[0].duration.text;

                // to get distance and duration with added waypoints you should do cycle from legs[0] to legs[n] and add all values. Keep in mind that distance will be in meters and duration in seconds
                var realDistance = 0;
                var realDuration = 0;
                var legs = this.directionsDisplay.directions.routes[0].legs;
                
                for (var i=0; i<legs.length; ++i) {
                  realDistance += legs[i].distance.value;
                  realDuration += legs[i].duration.value;
                }

                this.distance = realDistance/1000; // realDistance is in meters

                // Calculates trip duration from seconds
                var h = Math.floor(realDuration / 3600);
                var min = Math.floor((realDuration - (h * 3600)) / 60);
                var sec = realDuration - (h * 3600) - (min * 60);

                if (sec > 30) {
                  min = min+1;
                  sec = 0;
                }

                this.duration = h+":"+min+":00";

                console.log("Distance: "+this.distance);
                console.log("Duration: "+this.duration);
            }
            else {
                this.$bvToast.toast(' ', {
                    title: 'Error, unable to get route',
                    toaster: 'b-toaster-top-center',
                    variant: 'warning',
                    solid: true
                });
            }
      });
    },
    updateThings() {
    }
  },
  mounted() {
    
    this.$refs.mapRef.$mapPromise.then((map) => {
      this.directionsService = new this.google.maps.DirectionsService();
      this.directionsDisplay = new this.google.maps.DirectionsRenderer({ draggable: false, map });
      const that = this;
      this.directionsDisplay.addListener('directions_changed', () => {
        that.updateThings();
      });
      this.calculateAndDisplayRoute(this.directionsDisplay,this.directionsService);
    });
    
  }
}
</script>
<style scoped>
.google-map {
    width: 100%;
    height: 450px;
    background: gray;
}
</style>