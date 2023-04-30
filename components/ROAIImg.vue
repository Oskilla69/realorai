<template>
  <div class="flex flex-col align-center justify-start w-full">
    <div class="flex-row h-14 flex">
      <div
        class="w-full h-full secondary-background tertiary-color real-button"
        data-modal-target="defaultModal"
        data-modal-toggle="defaultModal"
        @click="() => emits('goNext', false)"
      >
        <h1 class="text-3xl font-bold underline w-full">Real</h1>
      </div>
      <div
        class="w-full h-full tertiary-background ai-button"
        data-modal-target="defaultModal"
        data-modal-toggle="defaultModal"
        @click="emits('goNext', true)"
      >
        <h1 class="text-3xl font-bold underline w-full">AI</h1>
      </div>
    </div>
    <Transition @enter="onEnter" @leave="onLeave">
      <!-- <img
        v-if="show"
        class="w-full h-full object-cover"
        :src="src"
        :alt="alt"
      /> -->
      <div id="dragon-container" class="w-full h-full"></div>
    </Transition>
  </div>
</template>
<script setup lang="ts">
import gsap from "gsap";
import OpenSeaDragon from "openseadragon";
interface Props {
  src: string;
  alt?: string;
}
const viewer = ref();
onMounted(() => {
  viewer.value = OpenSeaDragon({
    id: "dragon-container",
    prefixUrl: "https://openseadragon.github.io/openseadragon/images/",
    // prefixUrl: "../assets/icons/",
    // zoomInButton: "add_icon.svg",
    // zoomOutButton: "remove_icon.svg",
    // homeButton: "home_icon.svg",
    // fullPageButton: "zoom_icon.svg",
    showNavigator: true,
    navigatorAutoFade: false,
    constrainDuringPan: true,
    tileSources: {
      type: "image",
      url: props.src,
    },
  });
});
const show = useState("showImg", () => true);
const props = withDefaults(defineProps<Props>(), {
  alt: "",
});
const emits = defineEmits(["goNext"]);
watch(
  () => props.src,
  (newVal) => {
    show.value = false;
    viewer.value.open({
      type: "image",
      url: newVal,
    });
    setTimeout(() => {
      show.value = true;
    }, 250);
  }
);

function onEnter(el: HTMLElement, done: () => void) {
  gsap.from(el, {
    duration: 0.7,
    scaleX: 0,
    scaleY: 0,
    x: -500,
    ease: "elastic.out(2.5, 1)",
  });
  gsap.from(el, {
    duration: 0.2,
    delay: 0.5,
    opacity: 0,
    onComplete: done,
  });
}

function onLeave(el: HTMLElement, done: () => void) {
  gsap.to(el, {
    duration: 2.5,
    scaleX: 1,
    scaleY: 1,
    x: 200,
    ease: "power4.out",
    onComplete: done,
  });
  // gsap.to(el, {
  //   duration: 0.2,
  //   delay: 0.5,
  //   opacity: 0,
  //   onComplete: done,
  // });
}
</script>
<style scoped>
.ai-button:active {
  filter: brightness(75%);
}
.real-button:active {
  filter: brightness(75%);
}
.openseadragon-container {
  border-color: transparent;
}
</style>
