import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import moment from 'moment'

 import * as dd from 'dingtalk-jsapi'

Vue.config.productionTip = false

moment.locale('cn')
Vue.prototype.$moment=moment

require('./mock.js')

import{
  Lazyload,
  Icon,
  Row,
  Col,
  Button,
  Tab,
  Tabs,
  List,
  Panel,
  Step, 
  Steps,
  Uploader, 
  Field ,
  Cell,
  CellGroup,
  Picker,
  Popup,
  DatetimePicker  
} from 'vant'

Vue.use(Lazyload)
.use(Icon)
.use(Row)
.use(Col)
.use(Button)
.use(Tab)
.use(Tabs)
.use(List)
.use(Panel)
.use(Step)
.use(Steps)
.use(Uploader)
.use(Field)
.use(Cell)
.use(CellGroup)
.use(Picker)
.use(Popup)
.use(DatetimePicker)


// dd.config({
//   agentId:'273268283',
//   corpId:'ding2ced2e5420af006835c2f4657eb6378f',
//   timeStamp:'',
//   nonceStr:'',
//   signature:'',
//   type:0,
//   jsApiList:[
//     'biz.map.locate',
//     'biz.map.search',
//     'device.geolocation.get'
//   ]
// })


new Vue({
  router,
  store,
  dd,
  render: h => h(App)
}).$mount('#app')
