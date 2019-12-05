function compiler (el, vm) {
  vm.$el = document.querySelector(el)
  const fragment = document.createDocumentFragment();
  while (child = vm.$el.firstChild) {
    fragment.appendChild(child)
  }
  replace(fragment, vm)
  vm.$el.appendChild(fragment)
}

function replace (nodes, vm) {
  Array.from(nodes.childNodes).forEach((node, index) => {
    let txt = node.textContent;
    let reg = /\{\{(.*?)\}\}/g;
    if (node.nodeType === 3 && reg.test(txt)) {
      function replaceTxt (flag) {
        node.textContent = txt.replace(reg, (matched, placeholder) => {
          console.log(placeholder);   // 匹配到的分组 如：song, album.name, singer...
          if (!flag) {
            new Watcher(vm, placeholder, () => replaceTxt(true));   // 监听变化，进行匹配替换内容
          }
          return placeholder.split('.').reduce((val, key) => {
            return val[key];
          }, vm);
        });
      };
      // 替换
      replaceTxt();
    }
    if (node.nodeType === 1) {
      let nodeAttr = node.attributes;
      Array.from(nodeAttr).forEach(attr => {
        let name = attr.name;
        let exp = attr.value;
        if (name.includes('v-')) {
          console.log(vm[exp])
          node.value = vm[exp];
          new Watcher(vm, exp, function (newVal) {
            node.value = newVal;   // 当watcher触发时会自动将内容放进输入框中
          });
          node.addEventListener('input', e => {
            let newVal = e.target.value;
            vm[exp] = newVal;
          });

        }
      })
    }
    if (node.childNodes && node.childNodes.length) {
      replace(node, vm);
    }
  })
}
