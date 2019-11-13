<template>
    <v-container grid-list-lg class="my-3">
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
        <template v-else>
        <v-layout row wrap>
            <v-flex xs12>
            <v-layout justify-space-between align-center>
                <v-flex>
                    <p class="headline primary--text">Semua Stand</p>
                </v-flex>
                <v-flex class="text-xs-right">
                    <v-btn color="primary" @click="openStandDialog">
                        <v-icon left>add</v-icon>
                        Stand Baru
                    </v-btn>
                </v-flex>
            </v-layout>
            </v-flex>
            <v-flex xs12 md6 xl4 v-for="(item, i) in stands" :key="`prod-${i}`">
                <v-card class="rounded" height="100%">
                    <v-card-title>
                        <span class="headline">{{ item.name }}</span>
                    </v-card-title>
                    <v-card-text class="grey--text text--darken-2 pt-0">
                        {{ item.description }}
                    </v-card-text>
                    <v-card-text class="font-weight-bold blue--text">
                        {{ item.products.length }} MENU
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="indigo" flat round  :to="`/backend/stands/${item.id}`">
                            <v-icon left>info</v-icon>
                            detail
                        </v-btn>
                        <v-btn color="warning" flat round @click="editStand(item.id)">
                            <v-icon left>create</v-icon>
                            edit
                        </v-btn>
                        <v-btn color="error" flat round @click="deleteStand(item.id)">
                            <v-icon left>delete</v-icon>
                            delete
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
        </template>
        <v-dialog
            v-model="dialogCreateEditStand"
            persistent max-width="600px"
        >
            <dialog-create-edit-stand 
                :standId="parseInt(standId)"
                @close="closeStand"  
                @create_success="reloadStand" 
                :key="dialogCreateEditStandKey">
            </dialog-create-edit-stand>
        </v-dialog>
    </v-container>
</template>
<script>
import DialogCreateEditStand from './DialogCreateEditStand'

export default {
    components: {
        DialogCreateEditStand,
    },
    data: () => ({
        standId: 0,
        loading: false,
        stands: [],
        dialogCreateEditStand: false,
        dialogCreateEditStandKey: 0,
    }),
    methods: {
        fetchStands() {
            return axios.get('/api/stands')
        },
        async getStands() {
            this.loading = true;
            try {
                const res = await this.fetchStands();
                this.stands = res.data.reverse();
            } catch (err) {
                console.log(err);
            }
            this.loading = false;
        },
        openStandDialog() {
            this.dialogCreateEditStandKey = !!this.dialogCreateEditStandKey? 0 : 1;
            this.dialogCreateEditStand = true;
        },
        editStand(id) {
            this.standId = id;
            this.openStandDialog();
        },
        async deleteStand(id) {
            const willDelete = confirm("Anda yakin ingin menghapus?");
            if(willDelete) {
                try {
                    const res = await axios.delete(`/api/stands/${id}`, null);
                    console.log(res.data);
                    this.getStands();
                } catch (err) {
                    console.log(err);
                }
            }
        },
        closeStand() {
            this.dialogCreateEditStand = false;
            this.standId = 0;
        },
        reloadStand() {
            this.closeStand();
            this.getStands();
        }
    },
    mounted() {
        this.getStands();
    }
}
</script>