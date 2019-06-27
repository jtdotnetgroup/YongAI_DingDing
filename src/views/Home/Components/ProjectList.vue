<template>
  <div>
    <van-tabs v-model="active" type="card" animated swipeable>
      <van-tab title="未完成项目">
        <van-list id="projectList">
          <!-- <div @click="ItemClick(item)" v-for="(item,index) in projectList" :key="index"> -->
            <ProjectItem v-for="(item,index) in projectList" :key="index" :Project="item" />
          <!-- </div> -->
        </van-list>
      </van-tab>
      <van-tab title="全部项目">
        <van-list id="projectList">
          <!-- <div @click="ItemClick(item)" 
          v-for="(item,index) in projectList" :key="index"> -->
            <ProjectItem v-for="(item,index) in projectList" :key="index" :Project="item"/>
          <!-- </div> -->
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { GetProjectList } from "@/api/Project";
import ProjectItem from "./ProjectItem";
export default {
  name: "ProjectList",
  components: {
    ProjectItem
  },
  data() {
    return {
      active: 0,
      projects: []
    };
  },
  created() {
    this._LoadData();
  },
  methods: {
    _LoadData() {
      GetProjectList("")
        .then(res => {
          this.projects = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    
  },
  computed: {
    projectList() {
      if (this.active === 0) {
        return this.projects.filter(e => {
          return !e.finish;
        });
      } else {
        return this.projects;
      }
    }
  }
};
</script>

<style scoped>
</style>