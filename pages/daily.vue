<template>
  <PageWrapper>
    <Transition name="slide-fade">
      <AidleModal
        v-if="displayResultsModal"
        @is-open="(display) => (displayResultsModal = display)"
      >
        <div class="flex flex-col items-center">
          <p class="font-bold">Statistics</p>
          <Bar
            v-if="scoreDistributions"
            :options="{
              indexAxis: 'y',
              backgroundColor: 'red',
              scales: {
                y: {
                  ticks: {
                    color: 'red',
                  },
                },
                x: {
                  ticks: {
                    color: 'red',
                  },
                },
              },
            }"
            :data="{
              labels: Object.keys(scoreDistributions).reverse(),
              datasets: [
                {
                  data: (Object.values(scoreDistributions).reverse()) as number[],
                },
              ],
            }"
          ></Bar>
        </div>
      </AidleModal>
    </Transition>
    <Transition name="slide-fade">
      <AidleModal
        v-if="displayModal"
        ref="howToPlayModal"
        @is-open="(display) => (displayModal = display)"
      >
        <template #title>
          <h3 class="text-lg font-medium secondary-color">How to play</h3>
          <img src="~/assets/notee.webp" />
        </template>
        <p>Guess whether the image is AI generated or not.</p>

        <div class="flex-row flex gap-1 items-center">
          <p>Get 3 out of 5 right to keep your daily streak alive.</p>
          <img src="~/assets/sitt.webp" />
        </div>
        <p>Come back everyday for 5 new images.</p>
        <div class="flex-row flex gap-1 items-center">
          <p>Good luck!</p>
          <img src="~/assets/salutt.webp" />
        </div>
        <p>{{ timeUntilNext }}</p>
      </AidleModal>
    </Transition>
    <Aidle>
      <!-- show two images based on what the prompt was. which one is AI generated vs. Real -->
      <!-- show one image and choose if it is Real or AI generated -->

      <template #title-slot>
        <h1 class="text-3xl font-bold text-outline">A.I.dle</h1>
        <button @click="test">Hellooo</button>
        <!-- <p class="text-xl text-outline">Image n of 5.</p> -->
      </template>
      <div class="w-full h-full flex justify-center">
        <ROAIImg
          class="h-full w-full md:w-3/4 md:h-2/3 md:absolute lg:w-2/3 lg:h-2/3 md:bottom-0"
          :src="currImageData['image_url']"
          @go-next="randomImage"
        />
      </div>
      <div class="fixed top-0 px-2 pb-1 flex flex-row justify-between w-full">
        <p ref="highScoreRef" class="text-2xl">Current streak: {{ score }}</p>
        <p ref="scoreRef" class="text-2xl">Score: {{ currScore }}</p>
      </div>
      <Transition name="fade">
        <ResultsOverlay
          v-if="display"
          :img-data="prevImageData"
          :correct="correct"
          @close-modal="
            () => {
              display = false;
              if (!correct) {
                $router.push('/results');
              }
            }
          "
        ></ResultsOverlay>
      </Transition>
    </Aidle>
  </PageWrapper>
</template>

<script setup lang="ts">
import gsap, { Sine } from "gsap";
import { useSupabase } from "~~/stores/supabase";
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
ChartJS.register(Title, Tooltip, BarElement, CategoryScale, LinearScale);
const displayModal = useState("displayModal", () => false);
const displayResultsModal = useState("displayResultsModal", () => false);
async function test() {
  displayResultsModal.value = true;
  await getScoreDistributions();
}
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
const timeUntilNext = ref();
const scoreDistributions = ref();
const distance = ref();
const breakdownDisplay = ref<{
  0: number;
  1: number;
  2: number;
  3: number;
  4: number;
  5: number;
}>();
// get a random row from image_data table

onMounted(async () => {
  distance.value = (await $fetch("/api/reset_time"))["body"];

  setInterval(() => {
    distance.value -= 1000;
    if (distance.value < 0) {
      $fetch("/api/reset_time").then((res) => {
        distance.value = res["body"];
      });
    }
    const hours = Math.floor(
      (distance.value % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const minutes = Math.floor(
      (distance.value % (1000 * 60 * 60)) / (1000 * 60),
    );
    const seconds = Math.floor((distance.value % (1000 * 60)) / 1000);
    timeUntilNext.value = `${hours}h ${minutes}m ${seconds}s`;
  }, 1000);
  displayModal.value = true;
});
const { data, error } = await supabase.supabase.rpc("get_random_image");
currImageData.value = data[0];

// get the size of the image
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

function updateCorrectCount(image: string, correct: boolean) {
  if (correct) {
    supabase.supabase.from("image_data").update({ correct }).eq("image", image);
  } else {
    supabase.supabase
      .from("image_data")
      .update({ incorrect: true })
      .eq("image", image);
  }
}

async function getScoreDistributions() {
  const userToken = useCookie<string>("userToken");
  const { data, error } = await supabase.supabase.rpc("get_dailies", {
    user_token: userToken.value,
  });
  console.log(data, error);

  console.log(data[0], data[1], data[2], data[3], data[4], data[5]);
  scoreDistributions.value = data;
  scoreDistributions.value = {
    0: 4,
    1: 5,
    2: 2,
    3: 1,
    4: 0,
    5: 2,
  };
}
</script>

<style scoped>
.banner {
  position: static;
}
</style>
