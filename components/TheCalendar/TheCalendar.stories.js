import Vue from 'vue'

import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
import { withReadme }  from 'storybook-readme'
import '@storybook/addon-console'
import README from './README.md'

import TheCalendar from '.'

Vue.component('TheCalendar', TheCalendar)

storiesOf('TheCalendar', module)
  .add('v-model & onSelect', withReadme(README, () => ({
    data: vm => ({
      date: '2018-09-03'
    }),
    methods: {
      setDate (date) {
        this.date = date
        action('onSelect')(date)
      }
    },
    template: (
      pug
      `.container
        TheCalendar(
          v-model="date"
          @onSelect="setDate"
        ) `
    )
  })))