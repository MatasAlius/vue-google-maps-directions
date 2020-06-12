<template>
  <div class="position">
    <h4>Choose trip start point</h4>
    <h5>Trip start point: {{ myCoordinates.lat.toFixed(6) }}, {{ myCoordinates.lng.toFixed(6) }}</h5>
        <GmapMap
           :center="centerCoordinates"
           :zoom="zoom"
           style="height:520px; margin: 32px auto;"
           ref="map"
           @draged="handleDrag">
           <GmapMarker
            :position="myCoordinates"
            :clickable="true"
            :draggable="true"
             @drag="updateCoordinates"
          />
        </GmapMap>
  </div>
</template>

<script>

export default {
    name: 'position',

    data() {
      return {
        myCoordinates: {
          lat: 54.899132,
          lng: 23.88488
        },
        map: null,
        zoom: 7,
        centerCoordinates: { 
          lat: 54.899132,
          lng: 23.88488
        }
      }
    },

    created() {
        if (localStorage.center) {
            this.myCoordinates = JSON.parse(localStorage.center);
        } else {
            this.$getLocation({})
            .then(coordinates => {
            this.myCoordinates = coordinates;
            this.$emit('startCoordinates',this.myCoordinates);
            })
            // makes popout when location couldn't be determined
            .catch(error => {
                console.log(error);
                this.$bvToast.toast('Please choose trip start point press on red marker and drag to the needed start point.', {
                title: 'Your location could not be determined',
                toaster: 'b-toaster-top-center',
                variant: 'warning',
                solid: true
                }); }
                );
        }

        if (localStorage.zoom) {
            this.zoom = parseInt(localStorage.zoom);
        }
    },
    mounted() {
        this.$refs.map.$mapPromise.then(map => this.map = map); 
        window.scrollTo(0, 0);
    },
    methods: {
        handleDrag() {
            let center = {
                lat: this.map.getCenter().lat(),
                lng: this.map.getCenter().lng()
            }
            let zoom = this.map.getZoom();

            localStorage.center = JSON.stringify(center);
            localStorage.zoom = zoom;
        },
        updateCoordinates(location) {
            this.myCoordinates = { lat: location.latLng.lat(), lng: location.latLng.lng(),};
            this.$emit('startCoordinates',this.myCoordinates);
        }
    },
    computed: {
        mapCoordinates() {
            if(!this.map) {
                return {
                    lat: 0,
                    lng: 0
                }
            }
            return {
                lat: this.map.getCenter().lat().toFixed(4),
                lng: this.map.getCenter().lng().toFixed(4)
            }
        }
    }
}
</script>

<style scoped>

</style>