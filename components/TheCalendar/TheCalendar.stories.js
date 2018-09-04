import Vue from 'vue'

import { storiesOf } from '@storybook/vue'
import centered from '@storybook/addon-centered'
import { withReadme }  from 'storybook-readme'
import '@storybook/addon-console'
import README from './README.md'

import TheCalendar from '.'

Vue.component('TheCalendar', TheCalendar)

storiesOf('TheCalendar', module)
  .add('Default', withReadme(README, () => ({
    template: (
      pug
      `div
      TheCalendar `
    )
  })))
  .add('v-model & onSelect', withReadme(README, () => ({
    data: vm => ({
      date: '2018-09-03'
    }),
    methods: {
      setDate (date) {
        this.date = date
      }
    },
    template: (
      pug
      `div
      TheCalendar(
          v-model="date"
          @onSelect="setDate"
        ) `
    )
  })))