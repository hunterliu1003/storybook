<template lang="pug">
  .calendar
    .calendar__head
      .calendar__head__prev(@click="prev(mode)")
        i.calendar__head__prev__icon.fas.fa-less-than
      .calendar__head__title(@click="setMode") {{ date | title(mode)}}
      .calendar__head__next(@click="next(mode)")
        i.calendar__head__next__icon.fas.fa-greater-than
    .datapicker__body
      TheCalendarDate(
        v-if="mode === 'day'"
        :date="value"
        :viewYear="viewYear"
        :viewMonth="viewMonth"
        @setViewDate="setViewDate"
        @onSelect="onSelect"
      )
      TheCalendarMonth(
        v-if="mode === 'month'"
        :date="value"
        :viewYear="viewYear"
        @setMode="setMode('day')"
        @setViewDate="setViewDate"
      )
      TheCalendarYear(
        v-if="mode === 'year'"
        :date="value"
        :viewYear="viewYear"
        @setMode="setMode('month')"
        @setViewDate="setViewDate"
      )
</template>

<script>
import TheCalendarDate from './TheCalendarDate'
import TheCalendarMonth from './TheCalendarMonth'
import TheCalendarYear from './TheCalendarYear'

export default {
  name: 'TheCalendar',
  components: {
    TheCalendarDate,
    TheCalendarMonth,
    TheCalendarYear
  },
  props: {
    value: {
      type: String,
      default () {
        return null
      }
    }
  },
  data: vm => ({
    mode: 'day',
    date: vm.value ? new Date(vm.value).getTime() : new Date().getTime()
  }),
  computed: {
    viewYear () {
      return new Date(this.date).getFullYear()
    },
    viewMonth () {
      return new Date(this.date).getMonth()
    }
  },
  methods: {
    setMode (mode) {
      if (typeof mode === 'string') {
        this.mode = mode
        return
      }
      switch (this.mode) {
        case 'month':
          this.mode = 'year'
          break
        case 'day':
          this.mode = 'month'
          break
      }
    },
    setViewDate (theDate) {
      let date = new Date(this.date)
      if (typeof theDate.year === 'number') {
        date.setFullYear(theDate.year)
      }
      if (typeof theDate.month === 'number') {
        date.setMonth(theDate.month)
      }
      if (typeof theDate.day === 'number') {
        date.setDate(theDate.day)
      }
      this.date = date.getTime()
    },
    onSelect (value) {
      this.$emit('onSelect', value)
    },
    prev (mode) {
      let date = new Date(this.date)
      switch (mode) {
        case 'year':
          date.setFullYear(this.viewYear - 10)
          this.date = date.getTime()
          break
        case 'month':
          date.setFullYear(this.viewYear - 1)
          this.date = date.getTime()
          break
        case 'day':
          date.setMonth(this.viewMonth - 1)
          this.date = date.getTime()
          break
      }
    },
    next (mode) {
      let date = new Date(this.date)
      switch (mode) {
        case 'year':
          date.setFullYear(this.viewYear + 10)
          this.date = date.getTime()
          break
        case 'month':
          date.setFullYear(this.viewYear + 1)
          this.date = date.getTime()
          break
        case 'day':
          date.setMonth(this.viewMonth + 1)
          this.date = date.getTime()
          break
      }
    }
  },
  filters: {
    title (value, mode) {
      let title = ''
      let year = new Date(value).getFullYear()
      let month = new Date(value).getMonth()
      let months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
      ]
      switch (mode) {
        case 'year':
          let minYear = Math.floor(year / 10) * 10
          let maxYear = minYear + 9
          title = `${ minYear }-${ maxYear }`
          break
        case 'month':
          title = `${ year }`
          break
        case 'day':
          title = `${ months[month] } ${ year }`
          break
      }
      return title
    }
  }
}
</script>

<style lang="stylus" scoped>
  .calendar
    width 250px
    border 1px solid #ccc
    border-radius 2px
    padding 10px
    box-shadow 0 2px 10px rgba(0, 0, 0, 0.15)
    user-select none
  .calendar__head
    display flex
  .calendar__head__title
    display flex
    justify-content center
    align-items center
    width 165px
    height 30px
    border-radius 4px
    font-size 14px
    font-family Roboto
    font-weight 500
    color #333
    cursor pointer
    transition background-color .3s
    &:hover
      background-color #eee
  .calendar__head__prev,
  .calendar__head__next
    display flex
    justify-content center
    align-items center
    width 31px
    height 31px
    cursor pointer
  .calendar__head__prev__icon,
  .calendar__head__next__icon
    color #999
</style>