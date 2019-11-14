<template>
    <v-app>
        <v-content>
            <v-container grid-list-lg fill-height>
                <v-layout row wrap justify-center align-center>
                    <v-flex xs12 md9 style="max-width: 600px">
                        <v-card elevation-10>
                        <v-form ref="login_form" @submit.prevent="register">
                            <v-card-title>
                                <h3 class="headline">
                                    Data Akun
                                </h3>
                            </v-card-title>
                            <v-card-text>
                                <v-text-field
                                    label="Nama"
                                    v-model="name"
                                    type="text"
                                    :rules="[rules.required]"
                                ></v-text-field>
                                <v-text-field
                                    label="Email"
                                    v-model="email"
                                    type="text"
                                    :rules="[rules.required, rules.email]"
                                ></v-text-field>
                                <v-text-field
                                    label="Password"
                                    v-model="password"
                                    type="password"
                                    :rules="[rules.required, rules.password]"
                                ></v-text-field>
                                <v-text-field
                                    label="Konfirmasi Password"
                                    v-model="cpassword"
                                    type="password"
                                    :rules="[rules.required, rules.password]"
                                ></v-text-field>
                            </v-card-text>

                            <v-card-title>
                                <h3 class="headline">
                                    Data Stand
                                </h3>
                            </v-card-title>
                            <v-card-text>
                                <v-text-field
                                    label="Nama stand"
                                    v-model="standName"
                                    :rules="[rules.required]"
                                    ref="name"
                                ></v-text-field>
                                <v-textarea
                                    label="Deskripsi stand"
                                    v-model="standDescription"
                                    :rules="[rules.required]"
                                    rows="3"
                                ></v-textarea>
                            </v-card-text>

                            <v-card-text class="text-xs-center">
                                <v-btn color="primary" 
                                    :loading="loading"
                                    outline round large type="submit"
                                >
                                    Daftar
                                </v-btn>
                            </v-card-text>
                            <v-card-text class="text-xs-center">
                                <v-btn color="grey" small round outline to="/login">
                                    masuk
                                </v-btn>
                            </v-card-text>
                        </v-form>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-content>
    </v-app>
</template>
<script>

export default {
    data: () => ({
        name: null,
        email: null,
        password: null,
        cpassword: null,
        standName: null,
        standDescription: null,
        loading: false,

        rules: {
            required: v => !!v || 'Harus diisi',
            email: v => /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'E-mail tidak valid',
            password: v => String(v).length >= 6 || 'Password minimal 6 karakter',
        },
    }),
    methods: {
        async register() {
            if(this.$refs.login_form.validate()) {
                this.loading = true
                try {
                    const request = {
                        name: this.name,
                        email: this.email,
                        password: this.password,
                        c_password: this.cpassword,
                        stand_name: this.standName,
                        description: this.standDescription,
                    };

                    const res = await this.$user.signup(request)
                    this.$user.storeSession(res.data)
                    this.$router.replace({path: "/backend"});
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
