<template lang="pug">
  .calendar__year
    .calendar__year__item(
      v-for="year in years"
      :class="classYear(year)"
      @click="updateDate(year)"
    ) {{ year.year }}
</template>

<script>
export default {
  props: {
    date: {
      type: String
    },
    viewYear: {
      type: Number
    }
  },
  computed: {
    years () {
      const years = []
      const start = Math.floor(this.viewYear / 10) * 10 - 1
      const MONTH_LENGTH = 11

      for (let i = 0; i <= MONTH_LENGTH; i++) {
        if (new Date(this.date).getFullYear() === start + i) {
          years.push({ year: start + i, active: true })
        } else {
          years.push({ year: start + i })
        }
      }

      years[0].prev = true
      years[years.length -1].next = true

      return years
    }
  },
  methods: {
    updateDate (year) {
      if (year.prev) {
        this.$emit('setViewDate', { year: this.viewYear - 10 })
      } else if (year.next) {
        this.$emit('setViewDate', { year: this.viewYear + 10 })
      } else {
        this.$emit('setMode')
        this.$emit('setViewDate', { year: year.year })
      }
    },
    classYear (year) {
      return {
        'calendar__year__item--hover': !year.active && !year.prev && !year.next,
        'calendar__year__item--active': year.active && !year.prev && !year.next,
        'calendar__year__item--prev': year.prev,
        'calendar__year__item--next': year.next
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .calendar__year
    display flex
    justify-content center
    flex-wrap wrap
  .calendar__year__item
    display flex
    justify-content center
    align-items center
    width 44px
    height 44px
    border-radius 50%
    margin 6px
    font-family Roboto
    font-weight 400
    cursor pointer
    transition background-color .3s
  .calendar__year__item--hover
    &:hover
      background-color #ddd
  .calendar__year__item--prev,
  .calendar__year__item--next
    color #bbb
  .calendar__year__item--active
    background-color #db3d44
    color #fff
</style>