import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        score: 0,
        answerData: [
            {correct: true, answer: 0, isSelected: false, name: 'A'},
            {correct: false, answer: 0, isSelected: false, name: 'B'},
            {correct: false, answer: 0, isSelected: false, name: 'C'},
            {correct: false, answer: 0, isSelected: false, name: 'D'}
        ]
    },
    getters: {
        score: state => {
            return state.score;
        },
        answerData: state => {
            return state.answerData;
        }

    },
    mutations: {
        answered(state, btn){
            state.answerData.map((item)=>{
                item.isSelected = false;
            });
            btn.isSelected = true;
            if(btn.correct){
                state.score += 20;
            }
        },
        RESET(state) {
            state.score = 0;
        }
    },
    actions:{
        answered: ({commit}, btn)=>{
            commit('answered', btn);
        },
        resetScore({commit}) {
            commit('RESET');
        }
    }
})