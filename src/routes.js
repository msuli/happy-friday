import Home from './page/Home.vue';
import Score from './page/score.vue'
import Item from './page/item.vue'
export const routes = [
  {path: '', component: Home},
  {path: '/score', component: Score},
  {path: '/item', component: Item},
]
