import Vue from 'vue'
import Vuex, { Store } from 'vuex'
import { MessageBox } from 'mint-ui'

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        goodDetail: localStorage["goodDetail"] ? JSON.parse(localStorage["goodDetail"]) : [],
        carts: localStorage["carts"] ? JSON.parse(localStorage["carts"]) : [],
        orders: localStorage["orders"] ? JSON.parse(localStorage["orders"]) : []
    },
    mutations: {
        addCarts: (state, data) => {
            state.carts.push(data);
            localStorage.setItem("carts", JSON.stringify(state.carts));
        },
        addOrder: (state, data) => {
            state.orders.push(data);
            localStorage.setItem("orders", JSON.stringify(state.orders));
        },
        //删除购物车商品
        deleteCartItem: function(state, index) {
            MessageBox.confirm("确认要删除该商品吗？").then(next => {
                state.carts.splice(index, 1);
                localStorage.setItem("carts", JSON.stringify(state.carts));
            }).catch(o => { })
        },
        //删除订单商品
        deleteOrderItem: function(state, index) {
            MessageBox.confirm("确认要删除该商品吗？").then(next => {
                state.orders.splice(index, 1);
                localStorage.setItem("orders", JSON.stringify(state.orders));
            }).catch(o => { })
        },
        reduce: (state, index) => {
            if (state.carts[index].value <= 1) {
                MessageBox("提示", "不能再减了");
            } else {
                state.carts[index].value--;
            }
        },
        add: (state, index) => {
            if (state.carts[index].value >= 5) {
                MessageBox("提示", "已达上限");
            } else {
                state.carts[index].value++;
            }
        },
        settlement: (state) => {
            MessageBox.confirm("确认清空购物车吗？").then(next => {
                state.carts = [];
                localStorage.setItem("carts", JSON.stringify(state.carts));
            }).catch(o => { })
        }
    },
    getters: {
        sum: state => {
            let sum = 0;
            state.carts.forEach((cart) => {
                sum += cart.price * cart.value;
            })
            return sum;
        }
    }
});

export default store