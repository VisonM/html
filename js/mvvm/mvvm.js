class Mvvm {
  constructor (options = {}) {
    this.$options = options
    this.$el = options.el
    this.$data = options.data
    Observe(options.data)//数据劫持
    ProxyData.call(this, options.data)//数据代理
  }
}

function ProxyData (data) {
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
  for (let key in data) {
    let value = data[key]
    deepObserve(value)
    Object.defineProperty(data, key, {
      configurable: true,
      get () {
        return value
      },
      set (newVal) {
        if (newVal === value) {
          return
        }
        value = newVal
        deepObserve(value)
      },
    })
  }
}

function deepObserve (obj) {
  if (!obj || typeof obj !== 'object') return;
  return new Observe(obj)
}

