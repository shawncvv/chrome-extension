import moment from 'moment'
/**
 * 单个元素进入可视界面回调，并停止监听，返回observe实例，
 * 在unmount组件卸载的时候停止监听， if (this.observe) { this.observe.disconnect() }
 * @param {*} ref 组件ref
 * @param {*} options IntersectionObserver 原生options
 * @param {*} callBack 进入屏幕回调
 */
const elementInView = (ref, options = {}, callBack) => {
  let observe = null
  try {
    observe = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          callBack(en)
          if (!options || !options.connect) {
            observe.disconnect()
          }
        }
      })
    }, options)
  } catch {
    callBack(null)
  }
  if (ref && observe) {
    observe.observe(ref)
  }
  return observe
}

/**
 * 单个元素进入或者离开可视界面回调，并停止监听，返回observe实例，
 * 在unmount组件卸载的时候停止监听， if (this.observe) { this.observe.disconnect() }
 * @param {*} ref 组件ref
 * @param {*} options IntersectionObserver 原生options
 * @param {*} callBack 进入屏幕回调
 */
const elementObserve = (ref, options = {}, callBack) => {
  let observe = null
  try {
    observe = new IntersectionObserver(entries => {
      // rhinoman
      // entries.forEach(en => {
      //   callBack(en)
      // })
      entries.forEach(en => {
        callBack(en)
      })
    }, options)
  } catch {
    callBack(null)
  }
  if (ref && observe) {
    observe.observe(ref)
  }
  return observe
}

const distanceFactory = {
  // 今天
  todayDistance: () => {
    return [moment().startOf('days'), moment().endOf('days')]
  },

  // 昨天
  yesterdayDistance: () => {
    return [
      moment()
        .subtract(1, 'days')
        .startOf('days'),
      moment()
        .subtract(1, 'days')
        .endOf('days'),
    ]
  },

  // 本周
  thisWeekDistance: () => {
    return [moment().startOf('week'), moment().endOf('week')]
  },

  // 上周
  lastWeekDistance: () => {
    return [
      moment()
        .subtract(1, 'weeks')
        .startOf('week'),
      moment()
        .subtract(1, 'weeks')
        .endOf('week'),
    ]
  },

  // 1周内
  oneWeekDistance: () => {
    return [
      moment().subtract(1, 'weeks'),
      moment()
    ]
  },

  // 本月
  thisMonthDistance: () => {
    return [moment().startOf('month'), moment().endOf('month')]
  },

  // 上月
  lastMonthDistance: () => {
    return [
      moment()
        .subtract(1, 'months')
        .startOf('month'),
      moment()
        .subtract(1, 'months')
        .endOf('month'),
    ]
  },

  // 本季度
  thisQuarterDistance: () => {
    return [moment().startOf('quarter'), moment().endOf('quarter')]
  },

  // 上季度
  lastQuarterDistance: () => {
    return [
      moment()
        .subtract(1, 'quarters')
        .startOf('quarter'),
      moment()
        .subtract(1, 'quarters')
        .endOf('quarter'),
    ]
  },

  // 本年
  thisYearDistance: () => {
    return [moment().startOf('year'), moment().endOf('year')]
  },

  // 去年
  lastYearDistance: () => {
    return [
      moment()
        .subtract(1, 'year')
        .startOf('year'),
      moment()
        .subtract(1, 'year')
        .endOf('year'),
    ]
  },

  // 过去多少天
  pastDaysDistance: (day) => {
    return [moment().subtract(day, "days"), moment().startOf('days')]
  },

  // 未来多少天
  futureDaysDistance: (day) => {
    return [moment().startOf('days'), moment().add(day, 'days')]
  }
}


module.exports = {
  elementInView,
  elementObserve
};