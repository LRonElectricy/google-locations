<template>
    <div>


        <div v-if="posts.length > 0">
            <div v-for="post in posts" :key="post.id">
                {{ post.name }} - {{ post.placeFrom.name }} - {{ post.placeTo.name }}
            </div>
        </div>
        <div v-else>Нет записей</div>
        <v-divider></v-divider>
        <div>
            <v-card-title>חפש מודעות</v-card-title>
            <!-- add filter by from plase, in a radius of x km, user select the place with GmapAutocomplete and enter the radius -->
            <GmapAutocomplete @place_changed="setPlaceFrom" :options="{
                types: ['(cities)'],
                fields: ['name', 'geometry', 'place_id'],
                componentRestrictions: {
                    country: 'il'
                }
            }" placeholder="מאיפה" />
            מאיפה: {{ placeFrom ? placeFrom.name : '' }}
            <v-text-field width="50px" v-model="radius" label="רדיוס">
                <template slot="append-outer">
                    <span>קמ</span>
                </template>
            </v-text-field>
            <div v-if="postsFiltered.length > 0">
                <div v-for="post in postsFiltered" :key="post.id">
                    {{ post.name }} - {{ post.placeFrom.name }} - {{ post.placeTo.name }} - {{ post.distance }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import fire from "@/main";
export default {
    data() {
        return {
            posts: [],
            placeFrom: null,
            placeFromForm: null,
            radius: 0,
        }
    },
    async created() {
        await this.getPosts()
    },
    computed: {
        postsFiltered() {
            if (!this.placeFrom) return []
            // let res = [];
            return this.posts.filter(post => {
                let distance = this.getDistanceFromLatLonInKm(this.placeFrom.geometry.lat, this.placeFrom.geometry.lng, post.placeFrom.geometry.lat, post.placeFrom.geometry.lng)
                console.log(distance)
                console.log(this.radius)
                if (distance <= this.radius) {
                    post.distance = distance.toFixed(0) + ' קמ'
                    console.log('in radius')
                    return true
                }
            })
            // return res
        }
    },
    methods: {
        setPlaceFrom(place) {
            this.placeFrom = place
            this.placeFrom.geometry = { lat: this.placeFrom.geometry.location.lat(), lng: this.placeFrom.geometry.location.lng() }
        },
        async getPosts() {
            let viewMessage = this;
            let itemRef = await fire.database().ref('testGoogleMAps/posts');
            await itemRef.on('value', async (snapshot) => {
                let items = snapshot.val();
                if (items) {
                    let newState = [];
                    for (let item in items) {
                        newState.push({
                            id: item,
                            name: items[item].name,
                            placeFrom: items[item].placeFrom,
                            placeTo: items[item].placeTo
                        });
                    }
                    viewMessage.posts = newState;
                }
            });
        },
        getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
            var R = 6371; // Radius of the earth in km
            var dLat = this.deg2rad(lat2 - lat1); // deg2rad below
            var dLon = this.deg2rad(lon2 - lon1);
            var a =
                Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(this.deg2rad(lat1)) *
                Math.cos(this.deg2rad(lat2)) *
                Math.sin(dLon / 2) *
                Math.sin(dLon / 2);
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            var d = R * c; // Distance in km
            return d;
        },

        deg2rad(deg) {
            return deg * (Math.PI / 180);
        }
    }

}
</script>

<style></style>