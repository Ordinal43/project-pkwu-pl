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
                    :close-on-content-click="false"
                    bottom offset-y left
                >
                    <template v-slot:activator="{ on }">
                        <v-btn flat large
                            v-on="on"
                        >
                            <v-badge left color="red">
                                <template v-slot:badge v-if="true">
                                    <span>6</span>
                                </template>
                                <v-icon left>shopping_cart</v-icon>
                                KERANJANG
                            </v-badge>
                        </v-btn>
                    </template>

                    <v-card>
                        <v-list>
                            <v-list-tile avatar>
                                <v-list-tile-avatar>
                                    <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John">
                                </v-list-tile-avatar>

                                <v-list-tile-content>
                                    <v-list-tile-title>John Leider</v-list-tile-title>
                                    <v-list-tile-sub-title>Founder of Vuetify.js</v-list-tile-sub-title>
                                </v-list-tile-content>

                                <v-list-tile-action>
                                    <v-btn icon>
                                        <v-icon>favorite</v-icon>
                                    </v-btn>
                                </v-list-tile-action>
                            </v-list-tile>
                        </v-list>

                        <v-divider></v-divider>

                        <v-list>
                            <v-list-tile>
                                <v-list-tile-title>Enable messages</v-list-tile-title>
                            </v-list-tile>

                            <v-list-tile>
                                <v-list-tile-title>Enable hints</v-list-tile-title>
                            </v-list-tile>
                        </v-list>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="primary" flat @click="cartMenu = false">Save</v-btn>
                        </v-card-actions>
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
                title: "Edit stand",
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
