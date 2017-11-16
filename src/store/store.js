import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        score: 0,
    },
    getters: {
        score: state => {
            return state.score;
        }
    }
})