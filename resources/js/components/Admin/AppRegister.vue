<template>
    <v-app>
        <v-content>
            <v-container grid-list-lg fill-height>
                <v-layout row wrap justify-center align-center>
                    <v-flex xs12 md9 style="max-width: 600px">
                        <v-card elevation-10>
                        <v-form ref="login_form" @submit.prevent="login">
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
        loading: false,

        rules: {
            required: v => !!v || 'Harus diisi',
            email: v => /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'E-mail tidak valid',
            password: v => String(v).length >= 6 || 'Password minimal 6 karakter',
        },
    }),
    methods: {
        async login() {
            if(this.$refs.login_form.validate()) {
                this.loading = true
                try {
                    console.log(this.username, this.password);
                    const res = await axios.post('/api/register', {
                        name: this.name,
                        email: this.email,
                        password: this.password,
                        c_password: this.cpassword,
                    });

                    if(!!res.data.error) {
                        alert(res.data.error)
                    } else {
                        this.$router.replace({path: "/admin"});
                    }
                    
                } catch (error) {
                    alert(error);
                }
                this.loading = false
            }
        },
    },
}
</script>
