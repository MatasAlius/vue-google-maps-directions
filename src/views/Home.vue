<template>
  <div class="home">
    
    <component :is="currentComponent" v-on:startCoordinates="sCoordinates($event)" v-bind:startCoordinates="startCoordinates"></component>
    
    <div>
        <b-button variant="success" v-if="counter!=1" v-on:click="changeComponent(1);">&lt;- Back</b-button>
        <b-button variant="success" v-if="counter!=2" v-on:click="changeComponent(2);">Next -&gt;</b-button>
    </div>

    <p>{{ counter }}/2</p>
    <br>
  </div>
</template>

<script>

import PositionHome from '@/components/PositionHome.vue';
import MapsHome from '@/components/MapsHome.vue';

export default {
  name: 'Home', 
  components: {
    'position': PositionHome,
    'maps': MapsHome
  },
  data() {
    return {
      currentComponent: 'position',
      component: '',
      counter: 1,
      startCoordinates: []
    }
  },
  methods: {
    changeComponent(number) {
      if (number == 1) {
          this.currentComponent = 'position';
          this.counter = 1;
      }
      else {
          if (this.startCoordinates != 0) {
            this.counter = 2;
            this.currentComponent = 'maps';
          }
          else {
            // makes popout when user didn't choose start point
            this.$bvToast.toast('To choose trip start point press on red marker and drag to the needed start point.', {
              title: 'Please choose trip start point.',
              toaster: 'b-toaster-top-center',
              variant: 'danger',
              solid: true
            });
          }
      }
    },
    sCoordinates: function(coordinates) {
      this.startCoordinates = coordinates;
    }
  },
  mounted() {
    this.counter = 1;
  }
}
</script>
<style scoped>
.buttons {
    margin-bottom: 20px;
    border: 2px solid darkslategray;
}
</style>