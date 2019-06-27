<template>
  <div>
    <van-tabs v-model="active" type="card">
      <van-tab title="未完成任务">
        <van-list id="MissionList">      
          <MissionItem v-for="(item,index) in MissionList" :key="index"  :Mission="item" />
        </van-list>
      </van-tab>
      <van-tab title="全部任务">
         <van-list id="MissionList">       
          <MissionItem  v-for="(item,index) in MissionList" :key="index" :Mission="item" />      
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { GetMissionList } from "@/api/Mission";
import MissionEditVue from './Components/MissionEdit.vue';

export default {
  name: "MissionList",
  components: {
    MissionItem:()=>import('./Components/MissionItem')
  },
  data() {
    return {
      active: 0,
      MissionData: []
    };
  },

  mounted() {
    this._LoadData();
  },

  methods: {
    _LoadData() {
      GetMissionList("")
        .then(res => {
          this.MissionData = res.data;
           console.log(res.data)
        })
        .catch(err => {
          console.log(err);
        });
    },
   
  },
  computed: {
    MissionList() {
      if (this.active === 0) {
        return this.MissionData.filter(e => {
          return !e.finish;
        });
      } else {
        return  this.MissionData;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>