<template>
  <div>
    <van-list>
     
      <template v-for="(item,index) in ListData">
        <van-cell class="van-cell" is-link :key="index">
          <template slot="title">
            <van-row>
              <van-col span="4">
                <!-- <van-icon name="todo-list-o"/> -->
                <img :src="item.icon" class="imgstyle" />
              </van-col>
              <van-col span="20">
                <span class="spancolor">{{item.text}}</span>
              </van-col>
            </van-row>
          </template>
        </van-cell>
      </template>
    </van-list>
  </div>
</template>



<script>
export default {
 
  data() {
    return {
      ListData: [
        { icon: require("@/assets/images/histogram.png"), text: "应收账款汇总表" },
        { icon: require("@/assets/images/pie.png"), text: "应收账款明细表" },
        { icon: require("@/assets/images/analyze02.png"), text: "收账进度分析" }
      ]
    };
  }
};
</script>

<style  scoped>

.imgstyle{
width: 30px;
margin-top: 6px
}
.van-cell{
padding: 0px 0px 0px 10px
}
.spancolor {
  line-height: 2.5;
  font-size: 1rem;
}
.van-icon {
  font-size: 1.5rem;
  padding: 10px;
}
</style>