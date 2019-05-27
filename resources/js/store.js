import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        cartItems: [],
    },
    getters: {
        getCartItems: (state) => state.cartItems,
    },
    mutations: {
        addToCart(state, item) {
            const { id, name, price, qty } = item
            
            // check if item already exists
            const inCartIdx = state.cartItems.findIndex(obj => {
                return obj.id == item.id
            });

            if(!!(inCartIdx+1)) {
                state.cartItems[inCartIdx].qty++
            } else {
                const newItem = {
                    id: id,
                    name: name,
                    price: price,
                    qty: qty,
                }

                state.cartItems.push(newItem)
            }
        },
        removeFromCart(state, item) {
            const inCartIdx = state.cartItems.findIndex(obj => {
                return obj.id == item.id
            });

            if(!!(inCartIdx+1)) {
                if( (state.cartItems[inCartIdx].qty - 1) <= 0 )
                    state.cartItems.splice(inCartIdx, 1)
                else
                    state.cartItems[inCartIdx].qty--
            }
        },
        emptyCart(state) {
            state.cartItems = [];
        },
    },
    actions: {
        async makeOrder({ commit, state }, name) {
            const total = state.cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0)

            const data = state.cartItems.map(
                (item) => ({
                    product_id: item.id,
                    harga_satuan: item.price,
                    quantity: item.qty
                })
            );

            try {
                const res = await axios.post('/api/nota', {
                    customer: name,
                    harga_total: total,
                    products: data
                },{
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                    }
                });
                
                commit('emptyCart');

                return Promise.resolve(res);
            } catch (err) {
                return Promise.reject(err);
            }
        },
    }
})