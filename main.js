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
    state: ''
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
        this.$message({
          message: '请输入参数',
          type: 'error'
        })
        return false
      } else {
        // 处理空值
        this.fHour = this.iptHour === '' ? 0 : parseInt(this.iptHour)
        this.fMin = this.iptMin === '' ? 0 : parseInt(this.iptMin)
        this.fSec = this.iptSec === '' ? 0 : parseInt(this.iptSec)
        // 判断是否越界
        this.total = this.fHour * 60 * 60 + this.fMin * 60 + this.fSec
        if (this.total > limit) {
          this.$message({
            message: '参数过大，请缩小范围',
            type: 'error'
          })
          return false
        } else if (this.total === 0) {
          this.$message({
            message: '参数不能为0',
            type: 'error'
          })
        }
        // 处理非法输入
        this.seconds2Standard(this.total)
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
    start () {
      if (!this.checkValue()) {
        return
      } else if (this.state === 'playing') {
        return
      }
      this.timerId = setInterval(this.countdown, 1000)
    },
    countdown () {
      this.total -= 1
      this.state = 'playing'
      if (this.total === 0) {
        clearInterval(this.timerId)
        this.state = 'paused'
        this.$nextTick(() => {
          this.$notify({
            message: '计时结束',
            type: 'success'
          })
        })
      }
      this.seconds2Standard(this.total)
    },
    pause () { },
    reset () { }
  }
})
vue.__proto__.$notify = ELEMENT.Notification
vue.__proto__.$message = ELEMENT.Message