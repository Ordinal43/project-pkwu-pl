<template>
    <v-app>
        <v-toolbar app dense clipped-left>
            <v-toolbar-side-icon
                @click.stop="drawer = !drawer"
            ></v-toolbar-side-icon>
        </v-toolbar>
        <v-navigation-drawer app clipped v-model="drawer">
            <v-list>
                <v-list-tile
                    v-for="(item, index) in routes"
                    router
                    :to="item.route"
                    :key="'menu'+index"
                    >
                    <v-list-tile-action>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-tile-action>

                    <v-list-tile-content>
                        <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>

                <v-divider dark class="my-3"></v-divider>
                
                <v-list-tile @click="logout">
                    <v-list-tile-action>
                        <v-icon>power_settings_new</v-icon>
                    </v-list-tile-action>

                    <v-list-tile-content>
                        <v-list-tile-title>Logout</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
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
        routes: [
            {
                icon: "store_mall_directory",
                title: "Stand",
                route: "/backend/stands",
            },
            {
                icon: "receipt",
                title: "Transaksi",
                route: "/backend/transactions",
            },
        ],
    }),
    methods: {
        async logout() {
            try {
                await this.$user.logout();
                this.$user.clearStorage();
                this.$router.replace({path: "/login"})
            } catch (err) {
                alert(err);
            }
        },
    },
}
</script>
