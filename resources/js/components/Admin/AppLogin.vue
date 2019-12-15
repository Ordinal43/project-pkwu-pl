<template>
    <v-app>
        <v-content>
            <v-container grid-list-lg fill-height>
                <v-layout row wrap justify-center align-content-center>
                    <v-flex xs12 md5 lg3>
                        <v-img
                            src="/assets/logo-pkwu.png"
                            contain
                            position="center center"
                            height="300"
                        ></v-img>
                    </v-flex>
                    <v-flex xs12 md7 lg9 style="max-width: 600px">
                        <v-card elevation-10>
                        <v-form ref="login_form" @submit.prevent="login">
                            <v-card-text>
                                <v-text-field
                                    label="Email"
                                    v-model="email"
                                    type="text"
                                    :rules="[rules.required]"
                                ></v-text-field>
                                <v-text-field
                                    label="Password"
                                    v-model="password"
                                    type="password"
                                    :rules="[rules.required]"
                                ></v-text-field>
                            </v-card-text>
                            <v-card-text class="text-xs-center">
                                <v-btn color="primary" 
                                    :loading="loading"
                                    outline round large type="submit"
                                >
                                    Login
                                </v-btn>
                            </v-card-text>
                            <v-card-text class="text-xs-center">
                                <v-btn color="grey" small round outline to="/register">
                                    daftar
                                </v-btn>
                            </v-card-text>
                        </v-form>
                        </v-card>
                    </v-flex>
                    <v-flex xs12 class="text-xs-center">
                        <v-btn color="primary" round large outline @click="$router.push('/etalase')">
                            Ke Etalase
                        </v-btn>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-content>
    </v-app>
</template>
<script>
export default {
    data: () => ({
        email: null,
        password: null,
        loading: false,
        rules: {
            required: v => !!v || 'Harus diisi',
        },
    }),
    methods: {
        async login() {
            if(this.$refs.login_form.validate()) {
                this.loading = true
                try {
                    const request = {
                        email: this.email, 
                        password: this.password
                    }
                    const res = await this.$user.login(request);
                    this.$user.storeSession(res.data);
                    this.$router.replace({path: "/"});
                } catch (err) {
                    const code = err.response.status;
                    swal({
                        title: "Oops!",
                        text: `Error [${code}]. Please try again later.`,
                        icon: "error",
                    });
                }
                this.loading = false
            }
        },
    },
}
</script>
