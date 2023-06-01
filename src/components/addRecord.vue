<template>
    <div>
        <GmapAutocomplete @place_changed="setPlaceFrom" :value="placeFromForm" :options="{
            types: ['(cities)'],
            fields: ['name', 'geometry', 'place_id'],
            componentRestrictions: {
                country: 'il'
            }
        }" placeholder="מאיפה" />
        <GmapAutocomplete @place_changed="setPlaceTo" :value="placeToForm" :options="{
            types: ['(cities)'],
            fields: ['name', 'geometry', 'place_id'],
            componentRestrictions: {
                country: 'il'
            }
        }" placeholder="לאן" />
        <v-text-field width="50px" v-model="name" label="שם">
            <template slot="append-outer">
                <v-btn @click="addPost">הוסף מודעה</v-btn>
            </template>
        </v-text-field>

    </div>
</template>

<script>
import fire from "@/main";
export default {
    data() {
        return {
            placeFrom: null,
            placeTo: null,
            placeFromForm: null,
            placeToForm: null,
            name: ""
        }
    },
    methods: {
        setPlaceFrom(place) {
            this.placeFrom = place
            this.placeFrom.geometry = { lat: this.placeFrom.geometry.location.lat(), lng: this.placeFrom.geometry.location.lng() }
            console.log(this.placeFrom)
        },
        setPlaceTo(place) {
            this.placeTo = place
            this.placeTo.geometry = { lat: this.placeTo.geometry.location.lat(), lng: this.placeTo.geometry.location.lng() }
        },
        async addPost() {
            if (!this.placeFrom || !this.placeTo || !this.name) return
            console.log(this.placeFrom)
            console.log(this.placeTo)
            console.log(this.name)
            await fire
                .database()
                .ref("testGoogleMAps/posts/")
                .push({
                    placeFrom: this.placeFrom,
                    placeTo: this.placeTo,
                    name: this.name
                })
            this.placeFrom = null
            this.placeTo = null
            this.placeFromForm = null
            this.placeToForm = null
            this.name = ""
        },
    }
}
</script>

<style></style>