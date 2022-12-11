<template>
  <article class="about-me-article">
    <button class="close-btn" @click="store.hide('about-me-article')">
      <svg class="close-btn__svg" width="50" height="50" viewBox="0 0 50 50">
        <path d="M2.70459e-05 6.93665L6.93668 0L25.0003 18.0636L43.0633 0.000682286L49.9999 6.93734L31.937 25.0003L50 43.0633L43.0633 49.9999L25.0003 31.9369L6.93665 50.0006L0 43.064L18.0637 25.0003L2.70459e-05 6.93665Z"/>
      </svg>
    </button>
    <header>
      <h1>O mě</h1>
      <h2>O mě</h2>
    </header>
    <p class="about-me-article__content">
      Na střední škole jsem se naučila vše z oboru Polygrafie a přidala si navíc ještě rok na specifikaci oboru grafické přípravy tiskovin.
      <br /><br />
      Poté jsem nastoupila do copycentra, kde jsem si mohla vyzkoušet mnohé v praxi. Od samotného přijetí zakázky, přípravy před tiskem,
      přes tisk až k následnému svázání dokumentu, nebo ořezání letáků a vizitek. Časem jsem dostala na starost vedení celé Brněnské pobočky.
      Vracela se k nám řada spokojených stálých zákazníků. Po letech přišel čas na změnu.
      <br /><br />
      Jako pokladní - jsem domů chodila s čistou hlavou a mohla si doma tvořit “do šuplíku”. Nejvíce mě přitahovala myšlenka si doma zařídit malou dílnu.
      Kde budu  tisknout trička s vlastními motivy.
      <br /><br />
      Když jsem dostala příležitost se tomu věnovat jako práci - neváhala jsem.
      Výzva však byla větší - vytvořit celý e-shop. Od začátku až ke spuštění. Nikdy jsem nic podobného nedělala, šlo o to se naučit vše od začátku.
      Vytvořit motivy, zorganizovat sklad, copywriting, vytvořit produktové fotky, vymyslet jak e-shop bude vypadat, jak jej propagovat na sociálních
      sítích a všechno správně nastavit a nahrát do systému shoptet.
      <br /><br />
      Teď už vím, že i kdybych se snažila sebevíc, všechno najednou se naučit nedá.
      Jde o týmovou práci a grafik nebo copywriter nemůže stíhat i práci marketingového odborníka.
      <br /><br />
      Chci se v těchto oblastech nadále co nejvíce zdokonalovat, protože mi příjdou zajímavé a užitečné. Proto hledám to správné místo, kde mohu uplatnit
      a zdokonalit schopnosti nejen z oblasti Designu, ale také online marketingu a e-commerce...
    </p>
    <div class="about-me-artice__cta-group">
      <CallToActionButton class="about-me-article__cta link download-cv-btn" inner-txt="Stáhnout CV" :link-href="CV_FILE" target="_blank" />
      <CallToActionButton class="about-me-article__cta link close-cta-btn" inner-txt="Zavřít" target="_blank" :click-call="(() => store.hide('about-me-article'))" />
    </div>
  </article>
</template>

<script setup lang="ts">
  import CallToActionButton from "@components/CallToActionButton.vue"
  import { useStore } from '@stores/Store'

  const CV_FILE = import.meta.env.VITE_ASSETS_CV_FILE
  const store = useStore()
</script>

<style scoped lang="less">
</style>