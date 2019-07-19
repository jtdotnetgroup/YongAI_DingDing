import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import moment from 'moment'

 import * as dd from 'dingtalk-jsapi'

Vue.config.productionTip = false

moment.locale('cn')
Vue.prototype.$moment=moment
Vue.prototype.$dd=dd;  //全局变量共用的方法

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
  DatetimePicker,  
  Loading,
  Search,
  Grid,
  GridItem,
  RadioGroup, 
  Radio,
  Collapse, 
  CollapseItem
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
.use(Loading)
.use(Search)
.use(Grid)
.use(GridItem)
.use(RadioGroup)
.use(Radio)
.use(Collapse)
.use(CollapseItem)
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

// 放在new vue 里面必须是vue组件库实习的
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
