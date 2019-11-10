<template>
  <div>
    <ImageSwipe />

   <!-- <van-button type="primary" @click="OnClick" size="mini">点击</van-button>  -->
    <ProjectList />
  </div>
</template>

<script>


import { GetAccessToken } from "@/api/Project";
import * as dd from "dingtalk-jsapi";
export default {
  name: "Home",
  components: {
    ImageSwipe: () => import("./Components/ImageSwipe"),
    ProjectList: () => import("./Components/ProjectList")
  },
  data() {
    return {
      active: "",
   
    };
  },
  //一开始加载的函数
  created(){

  },


  methods: {

 
  }
};
</script>

<style  scoped>
</style>