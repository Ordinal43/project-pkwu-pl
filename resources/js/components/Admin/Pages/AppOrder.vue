<template>
    <div>
        <v-parallax
            src="/assets/stands_bg.png"
            height="200"
        >
            <v-layout
                align-left
                column
                justify-center
            >
                <div class="subheading primary--text">
                    Welcome to
                </div>
                <div class="display-1 primary--text text--darken-1 overflow stand-name"
                >Stand {{ $user.info().stands.stand_name }} </div>
            </v-layout>
        </v-parallax>
        <v-container grid-list-lg>
            <v-layout row wrap>
                <v-flex xs6 sm4 lg3 v-for="(item, i) in standProducts" :key="`am-${i}`">
                    <product-card :item="item"></product-card>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
    components: {
        ProductCard: () => import('./ProductCard' /* webpackChunkName: "js/chunk-product-card" */),
    },
    data() {
        return {
            name: "",
            description: "",
            standProducts: [],
        }
    },
    computed: {
        ...mapGetters([
            'getCartItems'
        ]),
    },
    methods: {
        async fetchStandDetails() {
            const standId = this.$user.info().stands.id;
            const res = await axios.get(`/api/stands/${standId}`);
            const stand = res.data;
            this.name = stand.stand_name;
            this.description = stand.description;
            this.standProducts = stand.products.map((item) => {
                let q = 0;
                this.getCartItems.forEach(cartItem => {
                    if(cartItem.id === item.id) {
                        q = cartItem.qty
                    }
                });
                return {
                    ...item, 
                    qty: q
                }
            });
        },
    },
    mounted() {
        this.fetchStandDetails();
    }
}
</script>
<style lang="scss" scoped>
    .stand-name {
        width: 30%;
        min-width: 300px;
    }
</style>
