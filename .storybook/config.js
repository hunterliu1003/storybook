import { configure } from '@storybook/vue'
import { setOptions } from '@storybook/addon-options'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
Vue.directive('sortable', {
  inserted: function (el, binding) {
    new Sortable(el, binding.value || {})
  }
})

import '!!style-loader!css-loader!stylus-loader!@/assets/stylus/reset.styl'

import 'vuetify/dist/vuetify.css'

setOptions({
  addonPanelInRight: true
})

const req = require.context('../components', true, /stories\.js$/)

function loadStories() {
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
