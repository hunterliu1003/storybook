import Vue from 'vue'

import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
import { withReadme }  from 'storybook-readme'
import '@storybook/addon-console'
import README from './README.md'

import TheDatePicker from './'

Vue.component('TheDatePicker', TheDatePicker)

storiesOf('TheDatePicker', module)
  .add('v-model & onSelect', withReadme(README, () => ({
    data: vm => ({
      date: '2018-09-05'
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
        TheDatePicker(
          v-model="date"
          @onSelect="setDate"
        ) `
    )
  })))
  .add('v-model: null', withReadme(README, () => ({
    data: vm => ({
      date: null
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
        TheDatePicker(
          v-model="date"
          @onSelect="setDate"
        ) `
    )
  })))