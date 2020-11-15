import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import { VueMaskDirective } from 'v-mask';

Vue.directive('mask', VueMaskDirective);

Vue.use(Vuetify);

const opts = {};

export default new Vuetify(opts);