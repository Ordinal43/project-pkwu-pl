import Vue from 'vue'
import Vuex from 'vuex'
const CART_KEY = 'bazaar_PL_cart'

Vue.use(Vuex)

const cartListener = store => {
    store.subscribe((mutation, state) => {
        if(mutation.type === 'addToCart' || mutation.type === 'removeFromCart') {
            localStorage.setItem(CART_KEY, JSON.stringify(state.cartItems))
        } else if(mutation.type === 'emptyCart') {
            localStorage.removeItem('bazaar-pl-user');
        }
    })
}

  
export default new Vuex.Store({
    plugins: [cartListener],
    state: {
        cartItems: [],
    },
    getters: {
        getCartItems: (state) => state.cartItems,
    },
    mutations: {
        initialiseStore(state) {
            const localStorageArray = localStorage.getItem(CART_KEY);
			if(localStorageArray) {
				state.cartItems = JSON.parse(localStorageArray);
			}
		},
        addToCart(state, item) {
            item.qty++;
            const { id, name, price, qty } = item
            
            const inCartIdx = state.cartItems.findIndex(obj => {
                return obj.id == id;
            });

            if(inCartIdx !== -1) {
                state.cartItems[inCartIdx].qty++;
            } else {
                state.cartItems.push({
                    id: id,
                    name: name,
                    price: price,
                    qty: qty,
                });
            }
        },
        removeFromCart(state, item) {
            item.qty--;
            const inCartIdx = state.cartItems.findIndex(obj => {
                return obj.id == item.id;
            });

            if(inCartIdx !== -1) {
                if((state.cartItems[inCartIdx].qty - 1) <= 0)
                    state.cartItems.splice(inCartIdx, 1);
                else
                    state.cartItems[inCartIdx].qty--;
            }
        },
        emptyCart() {
            state.cartItems = [];
        },
    },
    actions: {
        async makeOrder({ commit, state }, name) {
            const total = state.cartItems.reduce((acc, item) => 
                acc + (item.price * item.qty)
            , 0)

            const data = state.cartItems.map(
                (item) => ({
                    product_id: item.id,
                    harga_satuan: item.price,
                    quantity: item.qty
                })
            );

            axios.post('/api/nota', {
                customer: name,
                harga_total: total,
                products: data
            },{
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                }
            }).then(res => {
                commit('emptyCart');
                return Promise.resolve(res);
            }).catch(err => {
                return Promise.reject(err);
            })
        },
    }
})