import router from "@/router";
import * as dd from "dingtalk-jsapi";

router.afterEach((to, from) => {
  // to and from are both route objects.
  dd.ready(() => {
    dd.biz.navigation.setTitle({
      title: to.meta.title,//控制标题文本，空字符串表示显示默认文本
      onSuccess: function (result) {
        /*结构
        {
        }*/
      },
      onFail: function (err) { }
    })
  })
})




router.onError(error => { });
