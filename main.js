
const vue = new Vue({
  el: '#app',
  data: {
    iptHour: '',
    iptMin: '',
    iptSec: ''
  },
  methods: {
    getIpt (option) {
      switch (option) {
        case 'hour':
          return this.iptHour
          break
        case 'min':
          return this.iptMin
          break
        case 'sec':
          return this.iptSec
          break
        default:
          return null
      }
    },
    /**
     * @returns {Boolean}
     */
    checkValue () {
      if (!this.iptHour && !this.iptMin && !this.iptSec) {
        window.alert('请输入参数')
        return false
      } else {
        this.iptHour = this.iptHour === '' ? 0 : this.iptHour
        this.iptMin = this.iptMin === '' ? 0 : this.iptMin
        this.iptSec = this.iptSec === '' ? 0 : this.iptSec
        return true
      }
    },
    start () {
      if (!this.checkValue()) {
        return
      }
      let start
    },
    pause () { },
    reset () { }
  }
})