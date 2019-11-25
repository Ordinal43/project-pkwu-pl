<template>
    <div style="width: 100%">
        <v-card>
            <v-container grid-list-lg>
                <v-layout row wrap>
                    <v-flex xs12 md6>
                        <v-card color="blue-grey darken-3" dark>
                            <v-card-text>
                                <p class="subheading">Produk terjual</p>
                                <div class="headline">
                                    {{ getTotalSold }} item
                                </div>
                            </v-card-text>
                        </v-card>
                    </v-flex>
                    <v-flex xs12 md6>
                        <v-card color="blue-grey darken-3" dark>
                            <v-card-text>
                                <p class="subheading">Pendapatan saat ini</p>
                                <div class="headline">
                                    {{ $rupiahFormat(getTotalEarnings) }}
                                </div>
                            </v-card-text>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
            <v-data-table
                :headers="headers"
                :items="items"
                disable-initial-sort
                :loading="loading"
                rows-per-page-text="Baris per halaman"
            >
                <template v-slot:items="props">
                    <td>{{ props.item.id }}</td>
                    <td>{{ props.item.date }}</td>
                    <td>{{ props.item.menu }}</td>
                    <td>{{ props.item.customer }}</td>
                    <td>{{ props.item.qty }}</td>
                    <td>{{ $rupiahFormat(props.item.price) }}</td>
                    <td>{{ $rupiahFormat(props.item.total) }}</td>
                </template>
            </v-data-table>
        </v-card>
        <div v-show="false" id="printMe">
            <div class="ma-3">
                <div class="text-xs-center">
                    <p class="headline">Laporan Riwayat Transaksi</p>
                    <p class="title">Stand {{ $user.info().stands.stand_name }}</p>
                </div>
                <div>
                    <table class="orders">
                        <tr>
                            <th>Id order</th>
                            <th>Tanggal order</th>
                            <th>Menu</th>
                            <th>Pelanggan</th>
                            <th>Jumlah</th>
                            <th>Harga</th>
                            <th>Total</th>
                        </tr>
                        <template v-for="(item, i) in items">
                            <tr :key="i">
                                <td>{{ item.id }}</td>
                                <td>{{ item.date }}</td>
                                <td>{{ item.menu }}</td>
                                <td>{{ item.customer }}</td>
                                <td>{{ item.qty }}</td>
                                <td>{{ $rupiahFormat(item.price) }}</td>
                                <td>{{ $rupiahFormat(item.total) }}</td>
                            </tr>
                        </template>
                        <tfoot class="title">
                            <tr>
                                <td class="text-xs-right" colspan="6">Total produk terjual</td>
                                <td>{{ getTotalSold }} item</td>
                            </tr>
                            <tr>
                                <td class="text-xs-right" colspan="6">Total pendapatan</td>
                                <td>{{ $rupiahFormat(getTotalEarnings) }}</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        items: {
            type: Array,
            required: true,
        },
        loading: {
            type: Boolean,
            required: true,
        }
    },
    data: () => ({
        headers: [
            { text: 'ID', value: 'id', sortable: false },
            { text: 'Tgl order', value: 'date' },
            { text: 'Nama menu', value: 'menu', sortable: false  },
            { text: 'Pelanggan', value: 'customer', sortable: false },
            { text: 'Jumlah', value: 'qty' },
            { text: 'Harga', value: 'price' },
            { text: 'Total', value: 'total' },
        ],
    }),
    computed: {
        getTotalSold() {
            return this.items.reduce((acc, item) => acc + item.qty, 0);
        }, 
        getTotalEarnings() {
            return this.items.reduce((acc, item) => acc + item.total, 0);
        }, 
    },
    methods: {
        print() {
            this.$htmlToPaper('printMe');
        },
    },
    mounted() {
        EventBus.$on('print_orders',() => {
            this.$htmlToPaper('printMe');
        }); 
    },
}
</script>
