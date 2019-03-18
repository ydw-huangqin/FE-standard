import Vue from 'vue'

// 自动加载global下的index.js文件
const componentsContext = require.context('./global', true, /\.js$/)
componentsContext.keys().forEach(component => {
  const componentConfig = componentsContext(component)
  //  兼容import export 和 require module.export
  const ctrl = componentConfig.default || componentConfig
  Vue.component(ctrl.name, ctrl)
})
