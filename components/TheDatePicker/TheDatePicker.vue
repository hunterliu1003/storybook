<template lang="pug">
  .datepicker(v-click-outside="close")
    .datepicker__main(@click="toggle")
      i.datepicker__main__icon.fas.fa-calendar-alt(:class="{ 'datepicker__main__icon--active': isShow }")
      .datepicker__main__input(
        :class="{ 'datepicker__main__input--active': isShow }"
      ) {{ value }}
    TheCalendar.datepicker__calendar(v-if="isShow" v-model="value" @onSelect="onSelect")
</template>

<script>
import TheCalendar from '@/components/TheCalendar'

export default {
  name: 'TheDatePicker',
  components: {
    TheCalendar
  },
  directives: {
    'click-outside': {
      bind: function (el, binding, vnode) {
        el.clickOutsideEvent = function (event) {
          if (!(el == event.target || el.contains(event.target))) {
            vnode.context[binding.expression](event);
          }
        };
        document.body.addEventListener('click', el.clickOutsideEvent)
      },
      unbind: function (el) {
        document.body.removeEventListener('click', el.clickOutsideEvent)
      }
    }
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
    isShow: false
  }),
  methods: {
    toggle () {
      this.isShow = !this.isShow
    },
    close () {
      this.isShow = false
    },
    onSelect (date) {
      this.$emit('onSelect', date)
      this.toggle()
    }
  }
}
</script>

<style lang="stylus" scoped>
  .datepicker
    position relative
  .datepicker__main
    position relative
  .datepicker__main__icon
    position absolute
    display flex
    justify-content center
    align-items center
    width 30px
    height 30px
    color #aaa
    cursor pointer
  .datepicker__main__icon--active
    color #59BADD
  .datepicker__main__input
    width 120px
    height 30px
    line-height 30px
    font-family Roboto
    font-weight 500
    padding-left 30px
    border 1px solid #ccc
    border-radius 4px
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15)
    color #666
    cursor pointer
  .datepicker__main__input--active
    border-color #59BADD
    box-shadow: 0 1px 1px rgba(89, 186, 221, 0.5)
  .datepicker__calendar
    position absolute
    top 30px
</style>