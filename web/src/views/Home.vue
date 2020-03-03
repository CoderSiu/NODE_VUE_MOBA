<template>
  <div>
    <swiper :options="swiperOption" ref="mySwiper" @someSwiperEvent="callback">
      <!-- slides -->
      <swiper-slide><img class="w-100" src="../assets/images/4ac98a0135826dfb4861d2e5065ed44c.jpeg" alt=""></swiper-slide>
      <swiper-slide><img class="w-100" src="../assets/images/4ac98a0135826dfb4861d2e5065ed44c.jpeg" alt=""></swiper-slide>
      <swiper-slide><img class="w-100" src="../assets/images/4ac98a0135826dfb4861d2e5065ed44c.jpeg" alt=""></swiper-slide>
      <div class="swiper-pagination pagination-home"  slot="pagination"></div>
    </swiper>
    <!-- end of swiper -->
    <div class="nav-icons bg-white mt-3 d-flex flex-wrap text-center pt-3 text-dark">
      <div class="nav-item mb-3" v-for="n in 10" :key=n>
        <i class="sprite sprite-news"></i>
        <div class="pt-2">爆料站</div>
      </div>
    </div>
    <div class="bg-light py-3 fs-sm text-center">
      <i class="nav-icons-bottom"></i><span>收起</span>
    </div>
  </div>
</template>

<script>
export default {
data() {
      return {
        swiperOption: {
          autoplay: {
            delay: 2500,
            disableOnInteraction: false
          },
          pagination: {
            el: '.pagination-home',
          }
        },
        swiperSlides: [1, 2, 3]
      }
    },
}
</script>

<style lang="scss">
  @import '../scss/variables';
  .pagination-home {
    padding-right: 1rem;
    text-align: right !important;
    .swiper-pagination-bullet{
      border-radius: 0.1538rem;
      opacity: 1;
      background-color: map-get($map:$colors , $key: "white");  
    &.swiper-pagination-bullet-active{
      background-color: map-get($map:$colors , $key: "current");
    }
    }
  }
  .nav-icons{
    .nav-item {
      width: 25%;
      border-left: 1px solid map-get($map:$colors , $key: "current");
      &:nth-child(4n+1){
        border-left: none;
      }
    }
  }
  .sprite{
    background: url('../assets/index.png') no-repeat no-repeat 0 0;
    background-size: 375px 455px;
    display: inline-block; 
    &.sprite-news {
      width: 31px;
      height: 25px;
      background-position: 9.302% 0.813%;
    }
  }
  .nav-icons-bottom{
        background: url('../assets/index.png') no-repeat no-repeat 0 0;
    background-size: 375px 455px;
    display: inline-block;
    width: 10px;
    height: 10px;
    background-position: 38.577% 52.076%;
  }
</style>