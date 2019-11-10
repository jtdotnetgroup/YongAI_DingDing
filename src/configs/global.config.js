import * as dd from "dingtalk-jsapi";

dd.ready(() => {
    dd.biz.navigation.setLeft({
        control: false, //是否控制点击事件，true 控制，false 不控制， 默认false
        text: "返回", //控制显示文本，空字符串表示显示默认文本
        onSuccess: function (result) {
            /*
          {}
          */
            //如果control为true，则onSuccess将在发生按钮点击事件被回调
        },
        onFail: function (err) { }
    });
});