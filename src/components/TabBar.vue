<template>
  <van-tabbar v-model="active" @change="onChange">
    <van-tabbar-item name="home" icon="todo-list-o">我的项目</van-tabbar-item>
    <van-tabbar-item name="missionList" icon="completed">任务管理</van-tabbar-item>
    <van-tabbar-item name="ReportForms" icon="bar-chart-o">我的报表</van-tabbar-item>
    <van-tabbar-item name="Information" icon="chat-o">提醒我</van-tabbar-item>
  </van-tabbar>
</template>

<script>
import { Tabbar, TabbarItem } from "vant";
export default {
  name:'JITTabbar',
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem
  },
  data() {
    return {
      
    }
  },
  methods: {
    onChange(value) {
      this.$router.push(value)
    },
    
  },
  props: {
    activetab: {
      type: String,
    },
  },
  computed: {
    active: {
      get(){
        return this.activetab
      },
      set(val){
        this.$emit('input',val)
        this.$emit('change',val)
      }
    }
  },
};
</script>

<style lang="scss" scoped>
</style>