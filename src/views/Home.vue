<template>
  <div class="home">
    {{ distance }}, {{ duration }}
    <br>
    <GmapMap
      ref="mapRef"
      :center="{lat:54.7492, lng:24.6161}"
      :zoom="8"
      class="google-map"
    ></GmapMap>    
  </div>
</template>

<script>
import {gmapApi} from 'vue2-google-maps';

export default {
  name: 'Home', 
  data() {
    return {
      citiesList: ['55.148824, 24.5653061', '55.850033, 24.6500523','Kaunas'],
      newCity: '',
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
      var sta = { lat: 55.148824,
                lng: 24.5653061 };
      var des = { lat: 55.850033,
                lng: 24.6500523 };

      this.directionsService.route({
        origin: sta,
        destination: des, 
        travelMode: 'DRIVING', // WALKING; BICYCLING
      }, (response, status) => {
        if (status === 'OK') {
          this.directionsDisplay.setDirections(response);
          this.distance = this.directionsDisplay.directions.routes[0].legs[0].distance.text;
          this.duration = this.directionsDisplay.directions.routes[0].legs[0].duration.text;
          console.log("Distance: "+this.distance);
          console.log("Duration: "+this.duration);

        }
      });
    },
    updateCities() {
    }
  },
  mounted() {
    
    this.$refs.mapRef.$mapPromise.then((map) => {
      this.directionsService = new this.google.maps.DirectionsService();
      this.directionsDisplay = new this.google.maps.DirectionsRenderer({ draggable: false, map });
      const that = this;
      this.directionsDisplay.addListener('directions_changed', () => {
        that.updateCities();
      });
      this.calculateAndDisplayRoute(this.directionsDisplay,this.directionsService);
    });
    
  }
}
</script>
<style scoped>
.map-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.google-map {
  width: 100%;
  height: 480px;
  margin: 0 20px;
  background: gray;
}
</style>