<template>
    <div style="height: 100vh">
        <v-layout
            row wrap align-center style="height: 100%"
            fill-height 
            v-if="isLoading"
        >
            <v-flex xs12 class="text-xs-center">
                <v-progress-circular
                    :size="100"
                    :width="7"
                    color="primary"
                    indeterminate
                ></v-progress-circular>
            </v-flex>
        </v-layout>
        <v-layout 
            row wrap justify-center align-content-center 
            fill-height style="height: 100%" v-else
        >
            <carousel-3d
                :autoplay="true"
                :autoplayHoverPause="true"
                :autoplayTimeout="3000"
                :clickable="false"
                :disable3d="true"
                border="0"
                width="400"
                height="300"
                space="410"
                @before-slide-change="getRandomMenu"
            >
                <slide 
                    v-for="(item, i) in listDisplayed" 
                    :key="`slide-${i}`"
                    :index="i"
                >
                    <img :src="item.image" :alt="item.name">
                </slide>
            </carousel-3d>
        </v-layout>
    </div>
</template>
<script>
import { Carousel3d, Slide } from 'vue-carousel-3d';

export default {
    components: {
        Carousel3d,
        Slide
    },
    data: () => ({
        isLoading: true,
        listAll: [],
        listDisplayed: [],
    }),
    methods: {
        getRandomMenu(index) {
            // pick random menu from list and swap it
            if(this.listAll.length > 0) {
                const rand = Math.floor(Math.random() * this.listAll.length);
                
                // unseenIdx: index of a slide that is still invisible/unseen
                const unseenIdx = (index + 3) % this.listDisplayed.length;

                const currentUnseen = this.listDisplayed[unseenIdx];
                const swapped = this.listAll.splice(rand, 1, currentUnseen);
                this.listDisplayed[unseenIdx] = swapped[0];
            }
        },
    },
    mounted() {
        axios.get('/api/products/all')
        .then(res => {
            this.isLoading = false;
            this.listAll = res.data;
            for(let i=0; i<8; i++) {
                if(this.listAll <= 0) break;
                const rand = Math.floor(Math.random() * this.listAll.length);
                this.listDisplayed.push(res.data[rand]);
                this.listAll.splice(rand, 1);
            }
        })
        .catch(err => {
            this.isLoading = false;
            const code = err.response.status;
            swal({
                title: "Oops!",
                text: `Error ${code}.`,
                icon: "error",
            });
        });
    },
}
</script>