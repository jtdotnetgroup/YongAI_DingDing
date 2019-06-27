<template>
  <div class="layout">
    <div class="divbrCord">
      <span>应收账款到期提醒:</span>
    </div>
    <van-list >
      <InformationItem v-for="(item,index) in InformationDataList"  :key="index" :Information="item"/>
      
    </van-list>
    <div class="divbrCord">
      <span>项目任务到期期提醒:</span>
    </div>
    <van-list>
      <InformationItem
        v-for="(item,index) in InformationDataList01"
        :key="index"
        :Information="item"
      />
    </van-list>
  </div>
</template>

<script>
import { GetInformationList } from "@/api/Information";
export default {
  name: "Information",
  components: {
    InformationItem:() => import("./Components/InformationItem")
     
  },
  data() {
    return {
      
      InformationData: [], 
    };
  },
  created() {

       
     this._LoadData();
      
  },
  methods: {
    _LoadData() {
      GetInformationList("")
        .then(res => {
          this.InformationData = res.data;
            // console.log(res.data)
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  computed: {
    
    InformationDataList(){

       return this.InformationData.filter(e=>{
                 return e.TypeName==="应收"
             });
    },
    InformationDataList01(){

        return this.InformationData.filter(e=>{
                 return e.TypeName!=="应收"
             });
    }


  }
};
</script>

<style  scoped>
.layout {
  padding: 0px 15px 0px 15px;
  font-size: 1rem;
}
.divbrCord {
  background-color: #f9ffcc;
}
.divbrCord span {
  color: blue;
}
</style>