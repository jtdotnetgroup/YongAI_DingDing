<template>
  <div>

    <ImageSwipe/>

    <ProjectList />

    
  </div>
</template>

<script>

export default {
  name: "Home",
  components: {
    ImageSwipe: () => import("./Components/ImageSwipe"),
    ProjectList:()=>import('./Components/ProjectList'),
  },
  data() {
    return {
      active:''
    };
  }
};
</script>

<style  scoped>
</style>