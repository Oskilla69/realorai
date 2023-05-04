<template>
  <div
    class="h-full w-full flex flex-col align-start justify-start md:w-screen md:block"
  >
    <div
      :class="
        (bannerSize == 'small'
          ? 'h-72'
          : 'h-full') + ' relative flex justify-center md:h-full'
      "
    >
      <img
        class="banner-img top-0 left-0 w-full h-full"
        src="~/assets/rolly_rocket.png"
      />
      <div
        class="absolute top-24 self-center flex flex-col items-center md:mt-8"
      >
        <slot name="title-slot"></slot>
      </div>
      <a
        class="absolute right-0 bottom-0"
        href="https://twitter.com/MrValenberg"
        target="_blank"
        >Credit: Valenberg</a
      >
    </div>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
interface Props {
  bannerSize?: "small" | "full";
}
const props = withDefaults(defineProps<Props>(), {
  bannerSize: "small",
});
</script>

<style>
@media screen and (min-width: 768px) {
  .banner-img {
    filter: brightness(85%);
    object-fit: cover;
    object-position: 90% top;
  }
}

/* banner if screen width < 768 */
@media screen and (max-width: 767px) {
  .banner-img {
    object-fit: cover;
    filter: brightness(85%);
    object-position: 90% top;
  }
}

/* banner if screen width >= 768 */
@media screen and (min-width: 768px) {
  .banner {
    background: url("~/assets/rolly_rocket.png");
    background-size: cover;
    filter: brightness(85%);
    /* background-position: center; */
    background-position-x: 90%;
    /* background-position-y: 30%; */
  }
}

/* banner if screen width < 768 */
@media screen and (max-width: 767px) {
  .banner {
    background: url("~/assets/rolly_rocket.png");
    background-size: cover;
    filter: brightness(85%);
    /* background-position: center; */
    background-position-x: 90%;
    /* background-position-y: 30%; */
  }
}
</style>
