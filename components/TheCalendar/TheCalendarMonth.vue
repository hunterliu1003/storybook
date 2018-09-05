<template lang="pug">
  .calendar__month
    .calendar__month__item(
      v-for="(month, index) in months"
      @click="updateDate(index)"
      :class="classMonth(month)"
    ) {{ month.month }}
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
  data: vm => ({
    monthsName: [
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
  }),
  computed: {
    months () {
      let months = []

      for (let i = 0; i <= 11; i++) {
        if (new Date(this.date).getFullYear() === this.viewYear && new Date(this.date).getMonth() === i) {
          months.push({ year: this.viewYear, month: this.monthsName[i], active: true })
        } else {
          months.push({ year: this.viewYear, month: this.monthsName[i] })
        }
      }

      return months
    }
  },
  methods: {
    updateDate (month) {
      this.$emit('setMode')
      this.$emit('setViewDate', { month })
    },
    classMonth (month) {
      return {
        'calendar__month__item--hover': !month.active,
        'calendar__month__item--active': month.active,
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .calendar__month
    display flex
    justify-content center
    flex-wrap wrap
  .calendar__month__item
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
  .calendar__month__item--hover
    &:hover
      background-color #ddd
  .calendar__month__item--active
    background-color #db3d44
    color #fff
</style>