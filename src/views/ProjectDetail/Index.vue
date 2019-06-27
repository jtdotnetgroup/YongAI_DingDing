<template>
    <div>
        <PDTopContent/>
        <PDBottomContent/>
    </div>
</template>

<script>
    export default {
        name:'ProjectDetails',
        components:{
            PDTopContent:()=>import('./Components/PDTopContent'),
            PDBottomContent:()=>import('./Components/PDBottomContent')
        }
    }
</script>

<style lang="scss" scoped>

</style>