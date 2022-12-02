<template>
  <div class="portfolio">
    <div class="portfolio__img-group">
      <img class="portfolio__img"
           v-for="(img, id) in imgs.slice(0, portfolioState.lastNonLazyImgItemId)"
           :key="id"
           :src="imgDir + '/mobile/' + img.getName()"
           :srcset="
              imgDir + '/mobile/' + img.getName() + ' 1024w, ' +
              imgDir + '/desktop/' + img.getName() + ' 1366w, '
           "
           sizes="(max-width: 1365px) 1024w, 1366w"
      />
      <img v-for="(img, id) in imgs.slice(portfolioState.lastNonLazyImgItemId, portfolioState.lastLazyImgItemId)"
           :key="id"
           :src="''"
           :data-src="imgDir + '/mobile/' + img.getName()"
           :srcset="
              imgDir + '/mobile/' + img.getName() + ' 1024w, ' +
              imgDir + '/desktop/' + img.getName() + ' 1366w, '
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

  import { onUpdated, reactive, UnwrapNestedRefs } from "vue"

  import { Img } from "@model/Img/Img"

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
          new Img(
            String(img.name),
            Number(img.width),
            Number(img.height),
            Number(img.contentSize),
            img.encodingFormat
          )
        )
      })

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

  let portfolioState = reactive({ ... initialPortfolioState })
  let imgs: UnwrapNestedRefs<Array<Img>> = reactive([])

  let messages: Array<any> = []
  let errors: Array<any> = []

  loadData()
</script>

<style scoped lang="less">
  @import "./Portfolio.less";
</style>