<template>
  <div>
    <div id="middle">
      <keep-alive>
        <transition mode="out-in" name="pageswich-fade1">
          <router-view v-if="this.$route.meta.keepalive" />
        </transition>
      </keep-alive>
      <transition mode="out-in" name="pageswich-fade1">
        <router-view v-if="!this.$route.meta.keepalive"></router-view>
      </transition>
    </div>
    <TabBar v-if="tabbar" id="tabbar" :activetab="activetab" />
  </div>
</template>

<script>
import "@/assets/css/animate.css";

export default {
  name: "layout",
  components: {
    TabBar: () => import("../components/TabBar"),
    Loading: () => import("@/components/Loading")
  },
  mounted() {
    
  },
  props: {
    tabbar: {
      type: Boolean,
      default: () => {
        return false;
      }
    },
    rightText: {
      type: String
    },
    rightIcon: {
      type: String
    },
    rightPath: {
      type: String
    },
    activetab: {
      type: String
    },
    styleObject: {
      type: Object
    }
  }
};
</script>

<style lang="stylus">
#middle {
  padding: 5px 0 5px 0;
}

#navbar {
  z-index: 999 !important;
}

.pageswich-fade-enter-active, .pageswich-fade-leave-active {
  // 页面切换动画持续时间
  transition: all 0.2s;
}

.pageswich-fade-enter, .pageswich-fade-leave-active {
  // 设置透明度实现淡出淡入效果
  opacity: 0;
}

.pageswich-fade-enter {
  // 进入时从右边偏移50%屏幕宽度位置开始滑入
  transform: translateX(100vw);
}

.pageswich-fade-leave-active {
  // 离开时滑到左边偏移50%屏幕宽度位置结束
  transform: translateX(-100vw);
}
</style>