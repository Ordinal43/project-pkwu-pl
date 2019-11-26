<template>
    <v-container grid-list-lg>
        <v-layout row wrap v-if="loading">
            <v-flex xs12 class="text-xs-center">
                <v-progress-circular
                    :size="70"
                    :width="7"
                    color="primary"
                    indeterminate
                ></v-progress-circular>
            </v-flex>
        </v-layout>
        <div v-show="!loading">
            <v-layout row align-center>
                <div class="ml-4">
                    <v-layout row wrap align-center>
                        <span class="headline font-weight-bold mr-1">
                            Daftar Transaksi
                        </span>
                    </v-layout>
                </div>
            </v-layout>
            <v-divider class="my-4"></v-divider>
            <v-tabs
                icons-and-text
                v-model="activeTab" color="transparent"
                slider-color="primary"
            >
                <v-tab
                    v-for="(item, i) in tabItems"
                    :key="i" ripple
                    :href="`#tab-${i}`"
                >
                    {{ item.name }}
                    <v-icon>{{ item.icon }}</v-icon>
                </v-tab>
                <v-tab-item value="tab-0">
                    <v-container grid-list-lg>
                        <v-layout row align-center class="mt-2 mb-3">
                            <div class="subheading font-weight-bold">
                                Order Berjalan
                            </div>
                            <v-spacer></v-spacer>
                            <v-btn color="primary" @click="fetchOngoingOrders" :loading="loadingOngoingOrders">
                                <v-icon left>replay</v-icon>
                                muat ulang
                            </v-btn>
                        </v-layout>
                        <v-layout row wrap>
                            <stand-order-table
                                :items="listOngoingOrders"
                                :loading="loadingOngoingOrders"
                            ></stand-order-table>
                        </v-layout>
                    </v-container>
                </v-tab-item>

                <v-tab-item value="tab-1">
                    <v-container grid-list-lg>
                        <v-layout row align-center class="mt-2 mb-3">
                            <div class="subheading font-weight-bold">
                                Order Selesai
                            </div>
                            <v-spacer></v-spacer>
                            <v-btn color="primary" @click="fetchFinishedOrders" :loading="loadingFinishedOrders">
                                <v-icon left>replay</v-icon>
                                muat ulang
                            </v-btn>
                            <v-btn color="success" @click="printFinishedOrders">
                                <v-icon left>print</v-icon>
                                cetak
                            </v-btn>
                        </v-layout>
                        <v-layout row wrap>
                            <stand-order-table
                                :items="listFinishedOrders"
                                :loading="loadingFinishedOrders"
                            ></stand-order-table>
                        </v-layout>
                    </v-container>
                </v-tab-item>
            </v-tabs>
        </div>
    </v-container>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
    components: {
        StandOrderTable: () => import('./StandOrderTable' /* webpackChunkName: "js/chunk-stand-order-table" */),
    },
    data: (vm) => ({
        activeTab: null,
        tabItems: [
            {name: "Order Berjalan", icon: "assignment"},
            {name: "Order Selesai/Batal", icon: "assignment_turned_in"},
        ],
        stand: !!vm.$route.params.standId? vm.$route.params.standId : vm.$user.info().stands.id,
        loading: false,
        loadingOngoingOrders: false,
        loadingFinishedOrders: false,
        listOngoingOrders: [],
        listFinishedOrders: [],
    }),
    watch: {
        activeTab(val) {
            if(val === "tab-0") this.fetchOngoingOrders();
            if(val === "tab-1") this.fetchFinishedOrders();
        }
    },
    methods: {
        fetchOngoingOrders() {
            this.loadingOngoingOrders = true;
            axios.get('/api/orders', {
                params: {
                    stand: this.stand
                }
            }).then(res => {
                const tes = res.data.filter(item => !!item.product);
                this.listOngoingOrders = tes.map(item => ({
                    id: item.id,
                    date: item.created_at,
                    menu: item.product.name,
                    customer: item.nota.customer,
                    price: item.harga_satuan,
                    qty: item.quantity,
                    total: (item.quantity * item.harga_satuan)
                }));
                this.loadingOngoingOrders = false;
            }).catch(err => {
                console.log(err);
            });
        },
        fetchFinishedOrders() {
            this.loadingFinishedOrders = true;
            axios.get('/api/orders', {
                params: {
                    stand: this.stand
                }
            }).then(res => {
                const tes = res.data.filter(item => !!item.product);
                this.listFinishedOrders = tes.map(item => ({
                    id: item.id,
                    date: item.created_at,
                    menu: item.product.name,
                    customer: item.nota.customer,
                    price: item.harga_satuan,
                    qty: item.quantity,
                    total: (item.quantity * item.harga_satuan)
                }));
                this.loadingFinishedOrders = false;
            }).catch(err => {
                console.log(err);
            });
        },
        printFinishedOrders() {
            EventBus.$emit('print_orders');
        },
    },
}
</script>
