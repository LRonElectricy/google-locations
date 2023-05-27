<template>
  <div>
    <div>
      <GmapAutocomplete
        @place_changed="setPlace1"
        :options="{ 
          types: ['(cities)'], 
          language: 'iw', 
          fields: ['name', 'geometry', 'place_id'],
          //only israel
          componentRestrictions: {
            country: 'il'
          }
        }"
        placeholder="הזן כתובת"
      />
    </div>

    <div>
      <GmapAutocomplete
        @place_changed="setPlace2"
        :options="{ 
          types: ['(cities)'], 
          language: 'iw', 
          fields: ['name', 'geometry', 'place_id'],
          componentRestrictions: {
            country: 'il'
          }
        }"
        
        placeholder="הזן כתובת"
      />

    </div>
    
    <v-btn @click="calculateDistance">Рассчитать расстояние</v-btn>
    <div v-if="distance">Расстояние: {{ distance }} км</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      place1: null,
      place2: null,
      distance: null
    }
  },
  methods: {
    setPlace1(place) {
      this.place1 = place
    },
    setPlace2(place) {
      this.place2 = place
    },
    
    calculateDistance() {
      if (!this.place1 || !this.place2) return

      const toRad = value => (value * Math.PI) / 180

      const lat1 = toRad(this.place1.geometry.location.lat())
      const lng1 = toRad(this.place1.geometry.location.lng())
      const lat2 = toRad(this.place2.geometry.location.lat())
      const lng2 = toRad(this.place2.geometry.location.lng())

      const earthRadius = 6371 

      const dLat = lat2 - lat1
      const dLng = lng2 - lng1

      const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1) * Math.cos(lat2) *
        Math.sin(dLng / 2) * Math.sin(dLng / 2)

      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

      let distance = earthRadius * c
      distance = distance.toFixed(2)
      this.distance = distance
      console.log('Расстояние: ', distance)
    }
  }
}
</script>

<style>
.pac-target-input {
    outline: 1px solid #000;
    margin: 10px;
    border-radius: 5px;
    padding: 5px;
}
</style>
