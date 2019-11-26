<template>
    <v-app>
        <v-toolbar app>
            <v-toolbar-side-icon
                @click.stop="drawer = !drawer"
            ></v-toolbar-side-icon>
            <v-spacer></v-spacer>
            <v-toolbar-items class="hidden-sm-and-down">
                <v-menu
                    v-model="cartMenu"
                    bottom offset-y left
                    open-on-hover
                    v-if="!$user.info().is_admin"
                >
                    <template v-slot:activator="{ on }">
                        <v-btn flat large
                            v-on="on"
                            to="/cart"
                        >
                            <v-badge left color="red" :value="!!getMenuAmount">
                                <template v-slot:badge>
                                    <span>{{ getMenuAmount }}</span>
                                </template>
                                <v-icon left>shopping_cart</v-icon>
                                KERANJANG
                            </v-badge>
                        </v-btn>
                    </template>

                    <v-card class="py-2" width="400px">
                        <template v-if="!!getMenuAmount">
                            <v-list>
                                <v-list-tile 
                                    avatar 
                                    v-for="(item, index) in getCartItems.slice(0, 2)" 
                                    :key="`cart-${index}`"
                                    class="mb-3"
                                >
                                    <v-list-tile-avatar>
                                        <img :src="item.image" :alt="item.name">
                                    </v-list-tile-avatar>

                                    <v-list-tile-content>
                                        <div class="item-wrapper">
                                            <div class="item-wrapper__name pr-2">
                                                {{ item.name }} {{ item.name }} {{ item.name }} {{ item.name }}
                                            </div>
                                            <div class="item-wrapper__price primary--text">
                                                {{ $rupiahFormat(item.price) }}
                                            </div>
                                        </div>
                                        <v-list-tile-sub-title>{{ item.qty }} porsi</v-list-tile-sub-title>
                                    </v-list-tile-content>
                                </v-list-tile>
                            </v-list>
                        <div 
                            v-if="!!getCartItems.slice(2).length"
                            class="text-xs-center pb-3 subheading grey--text text--darken-1"
                        >
                            ...dan {{ getCartItems.slice(2).length }} menu lainnya
                        </div>

                        <v-card-title class="subheading">
                            <div>
                                Total: 
                                <span class="font-weight-bold">
                                    {{ getMenuAmount }} porsi
                                </span>
                            </div>
                            <v-spacer></v-spacer>
                            <router-link to="/cart" class="primary--text font-weight-bold">
                                Lihat semua
                            </router-link>
                        </v-card-title>
                        </template>
                        <template v-else>
                            <v-card-title class="pt-5">
                                <v-img
                                    src="/assets/svg/empty_cart.svg"
                                    height="130"
                                    contain
                                ></v-img>
                            </v-card-title>
                            <v-card-text class="text-xs-center">
                                <p class="subheading grey--text text--darken-1">
                                    Keranjangmu masih kosong nih. Yuk mulai pesan!
                                </p>
                            </v-card-text>
                            <v-card-text>
                                <div>
                                    <v-btn
                                        color="primary"
                                        large round block
                                        to="/"
                                    >
                                        lihat daftar menu
                                    </v-btn>
                                </div>
                            </v-card-text>
                        </template>
                    </v-card>
                </v-menu>
            </v-toolbar-items>
        </v-toolbar>
        <v-navigation-drawer app v-model="drawer">
            <v-list>
                <v-list-tile
                    to="/order-menu"
                    v-if="!$user.info().is_admin"
                    class="my-3"
                >
                    <v-list-tile-action>
                        <v-icon>mdi-food-fork-drink</v-icon>
                    </v-list-tile-action>

                    <v-list-tile-content>
                        <v-list-tile-title class="title mt-2">Pilih Menu</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>

                <v-list-group
                    prepend-icon="more_horiz"
                    :value="isChildRouteActive"
                    no-action
                >
                    <template v-slot:activator>
                        <v-list-tile>
                            <v-list-tile-content>
                                <v-list-tile-title>Penjual/admin</v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                    </template>

                    <template v-for="(item, index) in routes">
                        <v-list-tile
                            v-if="!!$user.info().is_admin === item.for_admin"
                            :key="`menu-${index}`"
                            router sub-group
                            :to="item.route"
                        >
                            <v-list-tile-action>
                                <v-icon>{{ item.icon }}</v-icon>
                            </v-list-tile-action>

                            <v-list-tile-content>
                                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                    </template>
                    
                    <v-list-tile @click="logout">
                        <v-list-tile-action>
                            <v-icon>power_settings_new</v-icon>
                        </v-list-tile-action>

                        <v-list-tile-content>
                            <v-list-tile-title>Logout</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list-group>
                
            </v-list>
        </v-navigation-drawer>
        <v-content>
            <router-view></router-view>
        </v-content>
    </v-app>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
    data: () => ({
        drawer: true,
        cartMenu: false,
        routes: [
            {
                icon: "assignment",
                title: "Daftar Transaksi",
                route: "/stand-transactions",
                for_admin: false,
            },
            {
                icon: "store_mall_directory",
                title: "Tambah Menu",
                route: "/my-stand",
                for_admin: false,
            },
            {
                icon: "store_mall_directory",
                title: "Semua stand",
                route: "/all-stands",
                for_admin: true,
            },
            {
                icon: "receipt",
                title: "Transaksi",
                route: "/transactions",
                for_admin: true,
            },
        ],
    }),
    computed: {
        ...mapGetters([
            'getCartItems'
        ]),
        getMenuAmount() {
            return this.getCartItems.reduce((acc, item) => 
                acc + item.qty
            ,0);
        },
        isChildRouteActive() {
            const currentPath = this.$router.history.current.path
            return this.routes.map(item => item.route).indexOf(currentPath) !== -1;
        },
    },
    methods: {
        async logout() {
            try {
                await this.$user.logout();
                this.$router.replace({path: "/login"})
            } catch (err) {
                const code = err.response.status;
                swal({
                    title: "Oops!",
                    text: `Error [${code}]. Please try again later.`,
                    icon: "error",
                });
            }
        },
    },
}
</script>

<style lang="scss" scoped>
    .item-wrapper {
        width: 100%;
        display: flex;
        flex-flow: row wrap;
        &__name {
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
            flex: 1;
        }
        &__price {
            flex-basis: 0 0 auto;
        }
    }
</style>