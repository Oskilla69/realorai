<template>
  <div
    class="h-full fixed w-full overflow-hidden box-content primary-background secondary-color"
  >
    <div
      class="flex flex-col justify-center align-center items-center h-full w-full flex-grow"
    >
      <Banner class="h-2/5 md:h-full"></Banner>
      <!-- show two images based on what the prompt was. which one is AI generated vs. Real -->
      <!-- show one image and choose if it is Real or AI generated -->
      <ROAIImg
        class="h-3/5 w-full md:w-3/4 md:h-2/3 md:absolute lg:w-2/3 lg:h-2/3 md:bottom-0"
        :src="images[randomIndex].imageUrl"
        @go-next="randomImage"
      />
      <div class="fixed top-0 px-2 pb-1 flex flex-row justify-between w-full">
        <p ref="highScoreRef" class="text-2xl">High score: {{ score }}</p>
        <p ref="scoreRef" class="text-2xl">Score: {{ currScore }}</p>
      </div>
      <Transition name="fade">
        <ResultsOverlay
          v-if="display"
          class="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 md:h-full"
          :correct="correct"
          @click="display = false"
        ></ResultsOverlay>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import gsap, { Sine } from "gsap";
// color schemes:
const display = useState("display", () => false);
const correct = useState("correct", () => false);
const score = useCookie<number>("numCorrect");
score.value = score.value || 0;
const currScore = useState<number>("currScore", () => 0);
const scoreRef = ref();
const highScoreRef = ref();
const images = [
  {
    imageUrl:
      "https://bigthink.com/wp-content/uploads/2022/09/rosenberg1.jpg?resize=1200,630",
    isReal: true,
  },
  {
    imageUrl:
      "https://cdn.theatlantic.com/thumbor/twER9npRHGz5TbICvao6Rs_xmMY=/900x598/media/img/photo/2020/11/photos-scenes-new-zealand/a30_1280110200/original.jpg",
    isReal: false,
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1481349518771-20055b2a7b24?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cmFuZG9tfGVufDB8fDB8fA%3D%3D&w=1000&q=80",
    isReal: true,
  },
  {
    imageUrl:
      "https://media.istockphoto.com/id/173682323/photo/says.jpg?s=612x612&w=0&k=20&c=7jnXQrYzUWNTnLhjPgimxHIbjsaHvZmAMALGVzYNARQ=",
    isReal: false,
  },
];
// get random index in images
const randomIndex = useState("randomIndex", () => {
  return Math.floor(Math.random() * images.length);
});
const usedQueue: string[] = [];
function randomImage(isReal: boolean) {
  display.value = true;
  if (isReal === images[randomIndex.value].isReal) {
    correct.value = true;
    currScore.value++;
    gsap.to(scoreRef.value, {
      duration: 0.5,
      fontSize: "40px",
      yoyo: true,
      ease: Sine.easeInOut,
      repeat: 1,
    });
    if (currScore.value > score.value) {
      score.value = currScore.value;
      gsap.to(scoreRef.value, {
        duration: 0.5,
        fontSize: "40px",
        yoyo: true,
        ease: Sine.easeInOut,
        repeat: 1,
      });
    }
  } else {
    correct.value = false;
    currScore.value = 0;
  }
  randomIndex.value = Math.floor(Math.random() * images.length);
}
</script>

<style scoped>
.banner {
  position: static;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
