<template>
  <van-nav-bar
    :title="title"
    left-text="返回"
    :right-text="rightText"
    left-arrow
    fixed
    @click-left="onClickLeft"
    @click-right="onClickRight"
  >
    <div id="navRight" slot="right" v-if="hasRight">
      <span v-if="!!this.rightText">{{rightText}}</span>
      <span v-if="!!this.rightIcon" id="navRightIcon">
        <van-icon :name="rightIcon" />
      </span>
    </div>
  </van-nav-bar>
</template>

<script>
import { NavBar } from "vant";
export default {
  name: "jitNavBar",
  components: {
    [NavBar.name]: NavBar
  },
  props: {
    title: {
      type: String,
      default: ()=>{
        return '永爱·项目管理'
      }
    },
    rightText:{
      type:String
    },
    rightIcon:{
      type:String
    },
    rightPath:{
       type:String
    }
   
  },
  computed: {
    hasRight(){
      return !!this.rightText||!!this.rightIcon
    }
  },
  data() {
    return {};
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    onClickRight() {
      this.$router.push(this.rightPath);
    }
  }
};
</script>

<style scoped>
#navRightIcon{
  font-size: 1.2rem;
  padding: 10px;
}
</style>