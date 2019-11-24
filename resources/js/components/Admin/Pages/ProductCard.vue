<template>
    <v-card class="rounded menu-card" height="100%">
        <div>
        <v-img class="menu-img"
        :src="item.image"
        :aspect-ratio="16/9"
        ></v-img>
        
        <v-card-text class="text">
            <p class="title font-weight-regular">{{ item.name }}</p>
            <p class="subheading">{{ $rupiahFormat(item.price) }}</p>
            <div class="title blue--text" v-if="item.units > 0">Sisa {{ item.units }}</div>
            <div class="title red--text text-uppercase" v-else>habis!</div>
        </v-card-text>
        </div>
        
        <v-card-actions v-if="item.units > 0">
            <v-spacer></v-spacer>
            <v-btn color="primary" round flat v-show="!item.qty" @click="addToCart(item)">
                <v-icon left>add_shopping_cart</v-icon>
                tambah
            </v-btn>
            <div v-show="item.qty">
                <v-layout align-center>
                    <v-flex>
                        <v-btn icon outline color="primary" 
                        @click="removeFromCart(item)">
                            <v-icon>remove</v-icon>
                        </v-btn>
                    </v-flex>
                    <v-flex class="title">
                        {{ item.qty }}
                    </v-flex>
                    <v-flex>
                        <v-btn icon outline color="primary" 
                        @click="addToCart(item)" 
                        :disabled="item.qty >= item.units">
                            <v-icon>add</v-icon>
                        </v-btn>
                    </v-flex>
                </v-layout>
            </div>
        </v-card-actions>
    </v-card>
</template>
<script>
import { mapMutations } from 'vuex'

export default {
    props: {
        item: {
            type: Object,
            required: true,
        }
    },
    methods: {
        ...mapMutations({
            addToCartVuex: 'addToCart',
            removeFromCartVuex: 'removeFromCart',
        }),
        addToCart(item) {
            // add item qty in this component
            item.qty++;
            // add item to vuex cart
            this.addToCartVuex(item);
        },
        removeFromCart(item) {
            // reduce item qty in this component
            item.qty--;
            // remove item from vuex cart
            this.removeFromCartVuex(item);
        },
    },
}
</script>
