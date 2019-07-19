<template>
    <div>
   <van-loading v-show="loading" id="loading"  :style="{styleObject}"  type="spinner" color="#1989fa" /> 
    </div>
</template>

<script>
    export default {

        props:{       
            styleObject:{
                type:Object,
                 default: ()=>{return {top:'330px'}}     
            }
        },
        computed:{
              loading(){
                  return this.$store.state.loading
              }
        }
        
    }
</script>

<style  scoped>
#loading{

    position: fixed;
    z-index: 999;
    width: 100%;
    text-align: center;
    
    top:330px

}

</style>