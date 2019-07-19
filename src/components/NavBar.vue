<template>



  <van-nav-bar 
    :title="title"
    fixed
     >

     <div  slot="left" v-if="returnTextLeft"  @click="onClickLeft"   >   
      <span><van-icon  class="returnTextIcon"  name="arrow-left"/> <span class="returnspan" >返回</span> </span>
     </div>

    

    <div id="navRight"  @click="onClickRight" slot="right" v-if="hasRight">
      <span v-if="!!this.rightText">{{rightText}}</span>
      <span v-if="!!this.rightIcon" id="navRightIcon">
        <van-icon :name="rightIcon" />
      </span>
    </div>
  </van-nav-bar>

  <!-- <div v-if="returnTextLeft">
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
   </div>

  <div v-else>
   <van-nav-bar
    :title="title"
    :right-text="rightText"
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
   </div> -->


 
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
    },
    returnText:{
       type:String
    }

   
  },
  computed: {
    hasRight(){
      return !!this.rightText||!!this.rightIcon
    },
    returnTextLeft(){
       return !!this.returnText
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
.navbar{
  z-index: 999;
}
.returnTextIcon{
  font-size: 1.2rem;
  margin-top: -3px
}
.returnspan{
  color:#2c93fa;
}
 
</style>