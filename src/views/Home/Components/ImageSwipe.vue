<template>
  <van-swipe id="imageSwipe" :autoplay="3000">
    <van-swipe-item v-for="(image, index) in images" :key="index">
      <img v-lazy="image.url" />
    </van-swipe-item>
  </van-swipe>
</template>

<script>
import { Swipe, SwipeItem,Image } from "vant";
export default {
  name: "ImageSwipe",
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Image.name]:Image
  },
  data() {
    return {
      images: [
        {
          url:require('@/assets/images/1.jpg')
        },
        {
          url:require('@/assets/images/2.jpg')
        },
        {
          url:require('@/assets/images/3.jpg')
        },
        {
          url:require('@/assets/images/4.jpg')
        },
      ]
    }
  },
  computed: {
    imgurls(){
      return this.images
    }
  },
};
</script>

<style  scoped>
img {
  height: auto;
  width: auto;
  max-height: 100%;
  max-width: 100%;
}

#imageSwipe{
  text-align: center;
}

</style>