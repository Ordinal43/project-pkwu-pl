<template>
    <v-app>
        <v-content>
            <router-view :key="routerKey"></router-view>
            <v-dialog
                v-model="cartDialog"
                scrollable persistent
                max-width="600px"
            >
                <v-card>
                    <v-toolbar flat color="transparent">
                        <v-btn icon flat>
                            <v-icon>shopping_cart</v-icon>
                        </v-btn>
                        <div class="headline">
                            Keranjang anda
                        </div>
                        <v-spacer></v-spacer>
                        <v-btn icon @click="closeDialog">
                            <v-icon>close</v-icon>
                        </v-btn>
                    </v-toolbar>

                    <v-window v-model="step">
                    <v-window-item :value="1">
                        <v-card-text>
                        <v-layout column>
                            <v-flex v-for="(item, i) in getCartItems" :key="`cartItemsName-${i}`" class="subheading mb-2">
                            <v-layout row wrap>
                                <v-flex xs12 class="title">
                                    {{ item.name }}
                                </v-flex>
                                <v-flex xs6>
                                    {{ item.qty }} x {{ $rupiahFormat(item.price) }}
                                </v-flex>
                                <v-flex xs6 class="text-xs-right font-weight-bold">
                                    {{ $rupiahFormat(item.price * item.qty) }} 
                                </v-flex>
                            </v-layout>
                            </v-flex>
                            <v-flex>
                            <v-divider class="my-3"></v-divider>
                            <v-layout row wrap justify-end class="text-xs-right subheading">
                                <v-flex>
                                    Subtotal
                                </v-flex>
                                <v-flex class="title primary--text">
                                    {{ $rupiahFormat(getSubtotal) }}
                                </v-flex>
                            </v-layout>
                            </v-flex>
                        </v-layout>
                        </v-card-text>
                    </v-window-item>

                    <v-window-item :value="2">
                        <v-card-text>
                        <v-text-field
                            v-model="ordererName"
                            label="Nama anda"
                            type="text"
                            ref="orderer_name"
                        ></v-text-field>
                        </v-card-text>
                    </v-window-item>
                    </v-window>

                    <v-card-actions>
                    <v-btn
                        :disabled="step === 1"
                        large flat
                        @click="step--"
                    >
                        Kembali
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn
                        v-if="step === 2" large
                        color="success" @click="createOrder"
                        :disabled="!ordererName"
                        :loading="loading"
                    >
                        Pesan
                    </v-btn>
                    <v-btn
                        v-else large
                        color="success"
                        outline @click="toPayment"
                    >
                        Lanjut
                    </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <v-dialog
                v-model="bisaPrint"
                persistent max-width="600px"
            >
                <v-card class="rounded-card">
                    <v-card-title class="pt-5">
                    <v-img
                        src="/assets/svg/print_invoice.svg"
                        height="130"
                        contain
                    ></v-img>
                    </v-card-title>
                    <v-card-text class="text-xs-center">
                    <p class="title">Pemesanan Berhasil!</p>
                    <p class="subheading">Silahkan klik dibawah ini untuk mencetak nota anda.</p>
                    </v-card-text>
                    <v-card-text>
                    <div class="pb-1">
                        <v-btn
                            dark color="primary" large round
                            @click="print"
                            block
                        >
                            <v-icon left>print</v-icon>
                            Cetak
                        </v-btn>  
                    </div>
                    </v-card-text>
                </v-card>
            </v-dialog>
            <div id="nota" v-show="false">
                <div v-for="n in 2" :key="`nota-${n}`" class="mb-5">
                    <p class="title text-xs-center">PL Food Bazaar</p>
                    <div>
                        <div>No Nota: {{ nota.id }}</div>
                        <div>Cust : {{ nota.customer }}</div>
                        <div>Tgl: {{ nota.created_at }}</div>
                    </div>
                    <v-divider class="my-2"></v-divider>
                    <table style="width: 100%;">
                        <template v-for="(item, i) in nota.order">
                            <tr :key="`nt1-${i}`">
                                <td>
                                    {{ item.product.name }}
                                </td>
                                <td>
                                    Stand {{ item.product.stand.name }}
                                </td>
                            </tr>
                            <tr :key="`nt2-${i}`">
                                <td>
                                    {{ item.quantity }} x {{ $rupiahFormat(item.harga_satuan) }}
                                </td>
                                <td class="text-xs-right">
                                    {{ $rupiahFormat(item.harga_satuan * item.quantity) }}
                                </td>
                            </tr>
                        </template>
                    </table>
                    <v-divider class="my-2"></v-divider>
                    <table style="width: 100%;">
                        <tr>
                        <td>Subtotal</td>
                        <td class="text-xs-right">{{ $rupiahFormat(getSubtotalNota) }}</td>
                        </tr>
                    </table>
                    <v-divider class="my-2"></v-divider>
                    <br><br>
                    <div class="text-xs-center subheading">
                        Terima kasih
                    </div>
                    <br><br>
                    <hr style="border-top: dotted 1px;" />
                    <br><br>
                </div>
            </div>
            <v-fab-transition>
                <v-btn
                    color="primary"
                    fab dark large
                    bottom right fixed
                    @click="cartDialog = true"
                    v-show="!!getCartItems.length"
                >
                    <v-icon>shopping_cart</v-icon>
                </v-btn>
            </v-fab-transition>
        </v-content>
    </v-app>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    data: () => ({
        routerKey: 0,

        cartDialog: false,
        step: 1,
        ordererName: "",
        loading: false,
        bisaPrint: false,
        nota: {
            id: "",
            customer: "",
            created_at: "",
            order: [],
        },
    }),
    computed: {
        ...mapGetters([
            'getCartItems'
        ]),
        getSubtotal() {
            const total = this.getCartItems.reduce((acc, item) => acc + (item.price * item.qty), 0)
            return total
        },
        getSubtotalNota() {
            const total = this.nota.order.reduce((acc, item) => acc + (item.harga_satuan * item.quantity), 0)
            return total
        },
        
    },
    methods: {
        ...mapActions([
            'makeOrder',
        ]),
        print() {
            this.$htmlToPaper('nota');
            this.bisaPrint = false;
            this.routerKey = !!this.routerKey? 0 : 1;
            this.$router.push('/')
        },
        async createOrder() {
            // this.$htmlToPaper('nota');
            this.loading = true;
            try {
                const willOrder = await swal({
                    title: "Yakin ingin memesan?",
                    icon: "warning",
                    closeOnClickOutside: false,
                    buttons: {
                        cancel: {
                            text: "TIDAK",
                            value: false,
                            visible: true,
                            closeModal: true,
                        },
                        confirm: {
                            text: "YA",
                            value: true,
                            visible: true,
                            closeModal: true
                        }
                    }
                })
                if(willOrder) {
                    let res = await this.makeOrder(this.ordererName);
                    let print = await axios.get(`/api/nota/${res.data.nota_id}`);
                    this.nota = print.data;
                    this.closeDialog();
                    this.bisaPrint = true;
                }
            } catch (err) {
                alert("Pesanan gagal dibuat!");
                console.log(err);
            }
            this.loading = false;
        },
        closeDialog() {
            this.step = 1;
            this.cartDialog = false;
            this.ordererName = "";
        },
        toPayment() {
            this.step++;
            setTimeout(() => {
                this.$refs.orderer_name.focus();
            }, 300);
        },
    }
}
</script>