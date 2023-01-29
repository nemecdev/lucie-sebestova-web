<template>
  <div class="portfolio">
    <div class="portfolio__img-group">
      <Img class="portfolio__img"
           v-for="(img, id) in filteredImgs.slice(0, portfolioState.lastNonLazyImgItemId)"
           :key="id"
           :src="imgDir + '/mobile/' + img.getAlbum() + '/' + img.getName()"
           :srcset="
              imgDir + '/mobile/' + img.getAlbum() + '/' + img.getName() + ' 1024w, ' +
              imgDir + '/desktop/' + img.getAlbum() + '/' + img.getName() + ' 1366w, '
           "
           sizes="(max-width: 1365px) 1024w, 1366w"
      />
      <Img v-for="(img, id) in filteredImgs.slice(portfolioState.lastNonLazyImgItemId, portfolioState.lastLazyImgItemId)"
           :key="id"
           :src="''"
           :data-src="imgDir + '/mobile/' + img.getAlbum() + '/' + img.getName()"
           :srcset="
              imgDir + '/mobile/' + img.getAlbum() + '/' + img.getName() + ' 1024w, ' +
              imgDir + '/desktop/' + img.getAlbum() + '/' + img.getName() + ' 1366w, '
           "
           sizes="(max-width: 1365px) 1024w, 1366w"
           :alt="img.getName()"
           class="portfolio__img lazy-img"
           loading="lazy"
      />
    </div>
    <div class="portfolio__cta-group">
      <Button
        class="portfolio__collapse-btn"
        :class="{ 'btn--hidden': portfolioState.lastLazyImgItemId === initialPortfolioState.initLoadQty }"
        :v-content="( 'Skrýt' )"
        vTheme="dark"
        @click="( resetPortfolioState )"
      />
      <Button
        class="portfolio__show-more-btn"
        :v-content="( 'Načíst další' )"
        @click="( incrementLastImgItemId )"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import axios from "axios"
  
  import { onUpdated, reactive, UnwrapNestedRefs, Ref, computed, ref } from "vue"
  
  import { Img as ImgModel } from "@model/Img/Img"
  
  import Img from "@atom/Img/Img.vue"
  import Button from "@atom/Button/Button.vue";

  onUpdated(() => {
    let lazyImages = document.querySelectorAll("img.lazy-img");
    if ("IntersectionObserver" in window) {
      let lazyImageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            let lazyImage = entry.target as HTMLImageElement;
            lazyImage.src = lazyImage.dataset.src || '';
            lazyImage.classList.remove("lazy-img");
            lazyImageObserver.unobserve(lazyImage);
          }
        });
      });

      lazyImages.forEach(function(lazyImage) {
        lazyImageObserver.observe(lazyImage);
      });
    }
  })

  const incrementLastImgItemId = () => {
    if (portfolioState.lastLazyImgItemId + portfolioState.loadNextIncrement < imgs.length) {
      portfolioState.lastLazyImgItemId += portfolioState.loadNextIncrement
    } else {
      portfolioState.lastLazyImgItemId = imgs.length
    }
  }

  const resetPortfolioState = () => {
    portfolioState = Object.assign(portfolioState, initialPortfolioState)
    portfolioState.lastLazyImgItemId = imgs.length > portfolioState.initLoadQty
        ? portfolioState.initLoadQty
        : imgs.length
  }

  const loadData = async () => {
    await axios({
      method: 'get',
      url: import.meta.env.VITE_API_ENDPOINT_GET_IMG_LIST as string,
    }).then((response) => {
      let data: any = Object.values(response.data)
      errors = data.pop()
      messages = data.pop()
      data.forEach((img: any) => {
        imgs.push(
          new ImgModel(
            String(img.name),
            String(img.album),
            Number(img.width),
            Number(img.height),
            Number(img.contentSize),
            img.encodingFormat
          )
        )

        if (img.album.length > 0)
          albums.push(img.album)
      })

      albums = [...new Set(albums)]

      portfolioState.lastLazyImgItemId = imgs.length > portfolioState.initLoadQty
        ? portfolioState.initLoadQty
        : imgs.length
    }).catch((error) => {
      console.error(error)
    })
  }

  const imgDir = import.meta.env.VITE_ASSETS_IMG_DIR as string + '/portfolio'
  const initialPortfolioState = {
    initLoadQty: 20 as number,
    loadNextIncrement: 15 as number,
    lastNonLazyImgItemId: 4 as number,
    lastLazyImgItemId: 0 as number,
  }

  const albumFilter: Ref<string> = ref('')
  const filteredImgs = computed(() => {
    return imgs.filter((img) => img.getAlbum().includes(albumFilter.value))
  })

  let portfolioState = reactive({ ... initialPortfolioState })
  let imgs: UnwrapNestedRefs<Array<ImgModel>> = reactive([])
  let albums: UnwrapNestedRefs<Array<string>> = reactive([])

  let messages: Array<any> = []
  let errors: Array<any> = []

  loadData()
</script>

<style scoped lang="less">
  @import "./Portfolio.less";
</style>