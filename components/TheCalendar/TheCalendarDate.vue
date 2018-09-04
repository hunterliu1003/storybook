<template lang="pug">
  .calendar__date
    .calendar__date__head(v-for="day in dayOfWeek") {{ day }}
    .calendar__date__day(
      v-for="date in dates"
      :class="classDay(date)"
      @click="updateDate(date)"
    ) {{ date.day }}
</template>

<script>
export default {
  props: {
    date: {
      type: String
    },
    viewYear: {
      type: Number
    },
    viewMonth: {
      type: Number
    },
  },
  data: vm => ({
    dayOfWeek: [
      'Su',
      'Mo',
      'Tu',
      'We',
      'Th',
      'Fi',
      'Sa',
    ],
  }),
  computed: {
    dates () {
      let arr = []
      let time = new Date(this.viewYear, this.viewMonth)

      time.setDate(0)
      const lastMonthLength = time.getDay() % 7 + 1
      const lastMonthFirst = time.getDate() - (lastMonthLength - 1)
      for (let i = 0; i < lastMonthLength; i++) {
        arr.push({ year: this.viewYear, month: this.viewMonth - 1, day: lastMonthFirst + i, prev: true })
      }

      time.setMonth(time.getMonth() + 2, 0)
      const curMonthLength = time.getDate()
      for (let i = 0; i < curMonthLength; i++) {
        if (new Date(this.date).setHours(0, 0, 0, 0) === new Date(this.viewYear, this.viewMonth, 1 + i).getTime()) {
          arr.push({ year: this.viewYear, month: this.viewMonth, day: 1 + i, current: true })
        } else if (new Date().setHours(0, 0, 0, 0) === new Date(this.viewYear, this.viewMonth, 1 + i).getTime()) {
          arr.push({ year: this.viewYear, month: this.viewMonth, day: 1 + i, today: true })
        } else {
          arr.push({ year: this.viewYear, month: this.viewMonth, day: 1 + i })
        }
      }

      time.setMonth(time.getMonth() + 1, 1)
      const nextMonthLength = 42 - (lastMonthLength + curMonthLength)
      for (let i = 0; i < nextMonthLength; i++) {
        arr.push({ year: this.viewYear, month: this.viewMonth + 1, day: 1 + i, next: true })
      }

      return arr
    }
  },
  methods: {
    updateDate (date) {
      if (date.prev) {
        this.$emit('setDate', {
          month: this.viewMonth - 1
        })
      } else if (date.next) {
        this.$emit('setDate', {
          month: this.viewMonth + 1
        })
      } else {
        this.$emit('onSelect', `${ date.year }-${ date.month + 1 }-${ date.day }`)
      }
    },
    classDay (date) {
      return {
        'calendar__date__day--active': date.current,
        'calendar__date__day--today': date.today,
        'calendar__date__day--hover': !date.current && !date.prev && !date.next,
        'calendar__date__day--prev': date.prev,
        'calendar__date__day--next': date.next,
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .calendar__date
    display flex
    justify-content center
    flex-wrap wrap
  .calendar__date__head,
  .calendar__date__day
    font-family Roboto
    font-weight 500
    width 29px
    height 29px
    margin 1px
    line-height 29px
    text-align center
    border-radius 50%
    transition background-color .3s
  .calendar__date__head
    font-weight 500
  .calendar__date__day
    cursor pointer
  .calendar__date__day--hover
    &:hover
      background-color #ddd
  .calendar__date__day--today
    color #db3d44
  .calendar__date__day--active
    background-color #db3d44
    color #fff
  .calendar__date__day--prev,
  .calendar__date__day--next
    color #bbb
</style>