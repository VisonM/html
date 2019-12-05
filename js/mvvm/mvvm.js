class Mvvm {
  constructor (options = {}) {
    this.$options = options
    this.$el = options.el
    this.$data = options.data
    Observe(options.data)//数据劫持
    ProxyData.call(this)//数据代理
    initComputed.call(this)
    compiler(options.el, this)
  }
}

function ProxyData () {
  const { data } = this.$options
  for (let key in data) {
    Object.defineProperty(this, key, {
      configurable: true,
      get () {
        return this.$data[key]
      },
      set (newVal) {
        if (newVal === this.$data[key]) {
          return
        }
        this.$data[key] = newVal
      },
    })
  }
}

function Observe (data) {
  let dep = new Dep();
  for (let key in data) {
    let value = data[key]
    deepObserve(value)
    Object.defineProperty(data, key, {
      configurable: true,
      get () {
        Dep.target && dep.add(Dep.target);
        // if (Dep.target) {
        //   let flag = dep.events.some(event => event.exp === Dep.target.exp)
        //   if (!flag) {
        //     dep.add(Dep.target);
        //   }
        // }
        return value
      },
      set (newVal) {
        if (newVal === value) {
          return
        }
        value = newVal
        deepObserve(value)
        dep.emit()
      },
    })
  }
}

function deepObserve (obj) {
  if (!obj || typeof obj !== 'object') return;
  return new Observe(obj)
}

function initComputed () {
  const { computed } = this.$options
  Object.keys(computed).forEach(key => {
    Object.defineProperty(this, key, {
      get: typeof computed[key] === 'function' ? computed[key] : computed[key].get,
      set (v) {},
    })
  })
}

