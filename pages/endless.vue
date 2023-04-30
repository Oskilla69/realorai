<template>
  <PageWrapper>
    <Transition name="slide-fade">
      <HowToPlayModal
        v-if="displayModal"
        ref="howToPlayModal"
        title="How to play"
        :is-open="true"
        @is-open="(display) => (displayModal = display)"
      >
        <div class="flex flex-row gap-1 items-end">
          <p>Guess whether the image is AI generated or not.</p>
          <img src="~/assets/hmjj.webp" />
        </div>
        <div class="flex-row flex gap-1 items-center">
          <p>Good luck!</p>
          <img src="~/assets/salutt.webp" />
        </div>
      </HowToPlayModal>
    </Transition>
    <Aidle>
      <!-- show two images based on what the prompt was. which one is AI generated vs. Real -->
      <!-- show one image and choose if it is Real or AI generated -->
      <div class="w-full h-full flex justify-center">
        <ROAIImg
          class="h-full w-full md:w-3/4 md:h-2/3 md:absolute lg:w-2/3 lg:h-2/3 md:bottom-0"
          :src="currImageData['image_url']"
          @go-next="randomImage"
        />
      </div>
      <div class="fixed top-0 px-2 pb-1 flex flex-row justify-between w-full">
        <p ref="highScoreRef" class="text-2xl">High score: {{ score }}</p>
        <p ref="scoreRef" class="text-2xl">Score: {{ currScore }}</p>
      </div>
      <Transition name="fade">
        <ResultsOverlay
          v-if="display"
          class="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 md:h-full"
          :img-data="prevImageData"
          :correct="correct"
          @click="display = false"
        ></ResultsOverlay>
      </Transition>
    </Aidle>
  </PageWrapper>
</template>

<script setup lang="ts">
import gsap, { Sine } from "gsap";
import { useSupabase } from "~~/stores/supabase";

const displayModal = useState("displayModal", () => false);
const display = useState("display", () => false);
const correct = useState("correct", () => false);
const score = useCookie<number>("numCorrect");
score.value = score.value || 0;
const currScore = useState<number>("currScore", () => 0);

const scoreRef = ref();
const highScoreRef = ref();
const supabase = useSupabase();
const prevImageData = ref();
const currImageData = ref();
// get a random row from image_data table

onMounted(() => {
  displayModal.value = true;
});
const { data, error } = await supabase.supabase.rpc("get_random_image");
currImageData.value = data[0];

// get the size of the image
const usedQueue: string[] = [];
async function randomImage(isAI: boolean) {
  prevImageData.value = currImageData.value;

  display.value = true;
  if (isAI === prevImageData.value["ai_generated"]) {
    correct.value = true;
    currScore.value++;
    gsap.to(scoreRef.value, {
      duration: 0.36,
      fontSize: "36px",
      yoyo: true,
      ease: Sine.easeInOut,
      repeat: 1,
    });
    if (currScore.value > score.value) {
      score.value = currScore.value;
      gsap.to(scoreRef.value, {
        duration: 0.36,
        fontSize: "36px",
        yoyo: true,
        ease: Sine.easeInOut,
        repeat: 1,
      });
    }
  } else {
    correct.value = false;
    currScore.value = 0;
  }
  // get a random row from image_data table
  // if there is a prevImage, pass it in to the rpc call
  const { data, error } = await supabase.supabase.rpc("get_random_image", {
    exclude_image: prevImageData.value.image,
  });
  currImageData.value = data[0];
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
