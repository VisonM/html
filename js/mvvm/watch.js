class Watcher {
  constructor (vm, exp, fn) {
    this.fn = fn
    this.vm = vm
    this.exp = exp
    Dep.target = this;
    let arr = this.exp.split('.');
    let val = this.vm;
    arr.forEach(key => {
      val = val[key];   // 通过get获取到新的值
    });
    Dep.target = null;
  }

  update () {
    let arr = this.exp.split('.');
    let val = this.vm;
    arr.forEach(key => {
      val = val[key];   // 通过get获取到新的值
    });
    this.fn(val);
  }
}

class Dep {
  constructor () {
    this.events = []
  }

  add (fn) {
    this.events.push(fn)
    console.log(this.events)
  }

  emit () {
    this.events.forEach(event => {
      event.update()
    })
  }
}
