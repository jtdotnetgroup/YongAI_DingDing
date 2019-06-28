<template>
  <div>
    <NavBar id="navbar" :title="title"
        :rightText="rightText"
        :rightIcon="rightIcon"
        :rightPath="rightPath"
    />
    <div id="middle">
       <keep-alive >    
         <!-- 组件缓存，用于缓存组件的意思 -->
      <!-- <router-view  v-if="this.$route.meta.keepalive" /> -->
       <transition mode="out-in" :duration="{ enter:250, leave: 250 }" 
        enter-active-class="animated fadeInLeft" 
        leave-active-class="animated fadeOutRight">
        <router-view  v-if="this.$route.meta.keepalive" />
      </transition>
      </keep-alive>


      <transition mode="out-in" :duration="{ enter:250, leave: 250 }" 
      enter-active-class="animated fadeInLeft" 
      leave-active-class="animated fadeOutRight"
      >
      <router-view v-if="!this.$route.meta.keepalive"></router-view>
      </transition>
    </div>
    <TabBar v-if="tabbar" id="tabbar" :activetab="activetab"/>
  </div>
</template>

<script>
import "@/assets/css/animate.css"
export default {
  name: "layout",
  components: {
    NavBar: () => import("../components/NavBar"),
    TabBar: () => import("../components/TabBar")
  },
  props: {
    tabbar: {
      type: Boolean,
      default: () => {
        return false;
      }
    },
    title: {
      type: String,
      default: () => {
        return "永爱";
      }
    },
    rightText: {
      type: String
    },
    rightIcon: {
      type: String
    },
    rightPath:{
      type:String
    },
    activetab:{
      type:String
    }
  }
};
</script>

<style lang="stylus">
#middle {
  padding: 25px 0 25px 0
}
#navbar{
  z-index 999 !important;
}
</style>