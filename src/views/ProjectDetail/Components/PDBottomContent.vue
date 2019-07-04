<template>
  <van-tabs v-model="active">
    <van-tab title="项目阶段">
      
      <PDItemSteps />
         
    </van-tab>
    <!-- <van-tab title="项目团队">内容 2</van-tab>
    <van-tab title="联系人">内容 3</van-tab> -->
  </van-tabs>
</template>

<script>
export default {
  components: {
      PDItemSteps:()=>import('./PDItemSteps')
  },
  data() {
    return {
      active: 0,
    
    };
  },
  
};
</script>

<style lang="scss" scoped>
</style>