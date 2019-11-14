<template>
    <v-app>
        <v-toolbar app>
            <v-toolbar-side-icon
                @click.stop="drawer = !drawer"
            ></v-toolbar-side-icon>
            <v-spacer></v-spacer>
            <span 
                class="title text-xs-center overflow-text"
            >
                Hello, {{ $user.info().name }}
            </span>
        </v-toolbar>
        <v-navigation-drawer app v-model="drawer">
            <v-list>
                <template v-for="(item, index) in routes">
                    <v-list-tile
                        v-if="!!$user.info().is_admin === item.need_admin"
                        :key="`menu-${index}`"
                        router
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
                title: "Stand saya",
                route: "/backend/my-stand",
                need_admin: false,
            },
            {
                icon: "store_mall_directory",
                title: "Semua stand",
                route: "/backend/all-stands",
                need_admin: true,
            },
            {
                icon: "receipt",
                title: "Transaksi",
                route: "/backend/transactions",
                need_admin: true,
            },
        ],
    }),
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
