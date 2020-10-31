// 最大时间
const limit = 99 * 60 * 60 + 99 * 60 + 60
const vue = new Vue({
  el: '#app',
  data: {
    iptHour: '',
    iptMin: '',
    iptSec: '',
    fMin: 0,
    fHour: 0,
    fSec: 0,
    total: 0,
    timerId: '',
    state: '',
    initialValue: {}
  },
  methods: {
    /**
     * @returns {Boolean}
     */
    checkValue (props) {
      this.fHour = parseInt(this.iptHour) && parseInt(this.iptHour) > 0 ? parseInt(this.iptHour) : 0
      this.fMin = parseInt(this.iptMin) && parseInt(this.iptMin) > 0 ? parseInt(this.iptMin) : 0
      this.fSec = parseInt(this.iptSec) && parseInt(this.iptSec) > 0 ? parseInt(this.iptSec) : 0
      if (!this.fHour && !this.fMin && !this.fSec) {
        this.$notify({
          message: 'Please input some time',
          type: 'error'
        })
        return false
      } else {
        // 处理非法输入
        // 判断是否越界
        this.total = this.fHour * 60 * 60 + this.fMin * 60 + this.fSec
        if (this.total > limit) {
          this.$notify({
            message: `inputs are greater than the limit ${limit}`,
            type: 'error'
          })
          return false
        }
        // 格式化输入
        props === 'start' && this.seconds2Standard(this.total)
        return true
      }
    },
    seconds2Standard (seconds) {
      const sec = seconds % 60
      seconds -= sec * 1
      let min = seconds / 60
      min = min % 60
      seconds -= min * 60
      const hour = seconds / 60 / 60
      this.fHour = hour
      this.fMin = min
      this.fSec = sec
      this.iptHour = hour < 10 ? '0' + hour : hour
      this.iptMin = min < 10 ? '0' + min : min
      this.iptSec = sec < 10 ? '0' + sec : sec
    },
    initial () {
      if (!this.checkValue('initial')) {
        return
      }
      // 保存用户输入
      const h = this.fHour < 10 ? '0' + this.fHour : this.fHour
      const m = this.fMin < 10 ? '0' + this.fMin : this.fMin
      const s = this.fSec < 10 ? '0' + this.fSec : this.fSec
      this.initialValue = {
        h, m, s
      }
    },
    start () {
      if (!this.checkValue('start')) {
        return
      }
      if (this.state === 'playing') {
        return
      }
      this.timerId = setInterval(this.countdown, 1000)
      this.state = 'playing'
    },
    pause () {
      if (this.state === 'playing') {
        console.log(this.total)
        clearInterval(this.timerId)
      }
      this.state = 'paused'
    },
    reset () {
      clearInterval(this.timerId)
      this.iptHour = ''
      this.iptMin = ''
      this.iptSec = ''
      this.state = 'reset'
    },
    countdown () {
      this.total -= 1
      if (this.total === 0) {
        clearInterval(this.timerId)
        this.state = 'paused'
        this.$nextTick(() => {
          this.$notify({
            dangerouslyUseHTMLString: true,
            message: `<strong>${this.initialValue.h}:${this.initialValue.m}:${this.initialValue.s}</strong> is over`,
            type: 'success'
          })
        })
      }
      this.seconds2Standard(this.total)
    },
  }
})
vue.__proto__.$notify = ELEMENT.Notification