<template>
   <van-panel class="InformationItem" :title="Information.addr" > 

    <template  slot="header" v-if="Information.TypeName==='应收'">
      <van-row class="rowbottom" >
        <van-col  span="24">{{Information.addr}}</van-col>
      </van-row>
      <van-row class="rowbottom">
        <van-col class="rowcol" span="3"><span>金额:</span></van-col>
        <van-col class="rowcol" span="7">{{Information.money}}</van-col>
        <van-col class="rowcol" span="6"><span>到期日期:</span></van-col>
        <van-col  class="rowcol" span="7">{{Information.expire}}</van-col>
      </van-row>
    </template>

    <template slot="header" v-else>
      <van-row class="rowbottom">
        <van-col span="24">{{Information.addr}}</van-col>
      </van-row>
      <van-row class="rowbottom">
        <!-- <van-col span="5">项目名称</van-col> -->
        <van-col class="rowcol"  span="10">{{Information.project}}</van-col>
        <van-col class="rowcol" span="6">到期日期:</van-col>
        <van-col class="rowcol" span="7">{{Information.expire}}</van-col>
      </van-row>
    </template>

   </van-panel>
</template>

<script>
    export default {
        props:{
            Information:{
                type:Object,
                required:true
            }
        }
        
    }
</script>

<style  scoped>

.InformationItem {
  font-size: 0.8rem;
  padding: 10px 15px 0px 15px;
}

.rowbottom{
 padding: 0px 0px 10px 0px;
 
}

.rowcol{
  color: blue
}
</style>