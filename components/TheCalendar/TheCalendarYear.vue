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
    },
    viewMonth: {
      type: Number
    },
  },
  computed: {
    years () {
      let years = []
      let start = Math.floor(this.viewYear / 10) * 10 - 1
      for (let i = 0; i <= 11; i++) {
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
        this.$emit('setDate', {
          year: this.viewYear - 10
        })
      } else if (year.next) {
        this.$emit('setDate', {
          year: this.viewYear + 10
        })
      } else {
        this.$emit('setMode')
        this.$emit('setDate', {
          year: year.year
        })
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
    font-family Roboto
    font-weight 400
    width 44px
    height 44px
    margin 6px
    display flex
    justify-content center
    align-items center
    cursor pointer
    border-radius 50%
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