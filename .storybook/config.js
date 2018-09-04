import { configure } from '@storybook/vue'
import { setOptions } from '@storybook/addon-options'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import '!!style-loader!css-loader!stylus-loader!@/assets/stylus/reset.styl'

import 'vuetify/dist/vuetify.css'

setOptions({
  // name: 'hunterliu\'s blog',
  // url: 'https://github.com/hunterliu1003/blog',
  addonPanelInRight: true
})

const req = require.context('../components', true, /stories\.js$/)

function loadStories() {
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
