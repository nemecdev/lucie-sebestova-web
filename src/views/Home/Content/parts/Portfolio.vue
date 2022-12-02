<template>
  <div class="portfolio" id="portfolio">
    <h1>Portfolio</h1>
    <h2>Portfolio</h2>
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
      <CallToActionButton class="portfolio__collapse-btn"
                          :click-call="resetPortfolioState"
                          :inner-txt="'Skrýt'"
                          :class="{ 'btn--hidden': portfolioState.lastLazyImgItemId === initialPortfolioState.initLoadQty }"
      />
      <CallToActionButton class="portfolio__show-more-btn"
                          :click-call="incrementLastImgItemId"
                          :inner-txt="'Načíst další'"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import axios from "axios"

  import { onUpdated, reactive, UnwrapNestedRefs } from "vue"

  import { Img } from "@cls/Img/Img"
  import CallToActionButton from "@components/CallToActionButton.vue";

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

<style scoped lang="scss">
  .portfolio {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;

    overflow-x: hidden;

    background: $primaryColor;

    h1 {
      background: linear-gradient(to bottom, $accentColor 5%, $secondaryColorLight 60%);
      background-clip: text;
      -webkit-background-clip: text;

      color: $primaryColor;

      @include since-computer-size {
        width: 100%;
      }
    }

    h2 {
      color: $secondaryColor;

      @include since-computer-size {
        width: 100%;
      }
    }
  }

  .portfolio__img-group {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;

    margin: 30px 0;

    @include since-tablet-size {
      margin: 50px 0;
    }

    @include since-computer-size {
      margin-top: 100px;
      display: flex;
      flex-flow: row wrap;
      align-items: center;
      justify-content: center;
      row-gap: 0;
    }
  }

  .portfolio__img {
    width: 80%;
    margin-bottom: 30px;

    border-radius: $borderRadius;

    &:last-of-type {
      margin-bottom: 0;
    }

    @include since-tablet-size {
      width: 60%;
    }

    @include since-computer-size {
      height: 300px;
      margin-left: 15px;
      margin-right: 15px;
      width: auto;
    }
  }

  .btn--hidden {
    display: none;
  }

  .portfolio__cta-group {
    width: 60%;

    display: flex;
    flex-flow: column nowrap;

    align-items: stretch;

    @include since-computer-size {
      flex-flow: row nowrap;

      align-items: center;
      justify-content: center;
    }
  }

  .portfolio__show-more-btn,
  .portfolio__collapse-btn {
    margin: 20px 0;

    font-weight: 500;
    color: $primaryColor;
    border-color: transparent;
    background: $secondaryColor;
    text-align: center;

    @include since-computer-size {
      margin: 0 20px;
      margin-top: 50px;
    }
  }

  .portfolio__show-more-btn {
    background: $accentColor;
    color: $secondaryColor;
  }
</style>