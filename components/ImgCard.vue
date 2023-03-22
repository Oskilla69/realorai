<template>
  <div
    v-if="isShowing"
    ref="interactElement"
    :class="{
      isAnimating: isInteractAnimating,
      isCurrent: isCurrent,
    }"
    class="card"
    style="
       {
        transform: transformString;
      }
    "
  >
    <h3 class="cardTitle">{{ card }}</h3>
  </div>
</template>

<script setup lang="ts">
import { Target } from "@interactjs/core/types";
import interact from "interactjs";
import { ref, onMounted, onBeforeUnmount } from "vue";
const ACCEPT_CARD = "cardAccepted";
const REJECT_CARD = "cardRejected";
const SKIP_CARD = "cardSkipped";

const strictData = {
  interactMaxRotation: 15,
  interactOutOfSightXCoordinate: 500,
  interactOutOfSightYCoordinate: 600,
  interactYThreshold: 150,
  interactXThreshold: 100,
};
const interactElement = ref<Target>();
interface Props {
  card: {
    type: string;
    required: boolean;
  };
  isCurrent: {
    type: boolean;
    required: boolean;
  };
}
const props = defineProps<Props>();
const emits = defineEmits([ACCEPT_CARD, REJECT_CARD, SKIP_CARD, "hideCard"]);

let isShowing = true;
let isInteractAnimating = true;
let isInteractDragged = null;
let interactPosition = {
  x: 0,
  y: 0,
  rotation: 0,
};

function transformString() {
  if (!isInteractAnimating || isInteractDragged) {
    const { x, y, rotation } = interactPosition;
    return `translate3D(${x}px, ${y}px, 0) rotate(${rotation}deg)`;
  }

  return null;
}
onMounted(() => {
  const element = interactElement.value;

  interact(element).draggable({
    onstart: () => {
      isInteractAnimating = false;
    },

    onmove: (event) => {
      const { interactMaxRotation, interactXThreshold } = strictData;
      const x = interactPosition.x + event.dx;
      const y = interactPosition.y + event.dy;

      let rotation = interactMaxRotation * (x / interactXThreshold);

      if (rotation > interactMaxRotation) rotation = interactMaxRotation;
      else if (rotation < -interactMaxRotation) rotation = -interactMaxRotation;

      interactSetPosition({ x, y, rotation });
    },

    onend: () => {
      const { x, y } = interactPosition;
      const { interactXThreshold, interactYThreshold } = strictData;
      isInteractAnimating = true;

      if (x > interactXThreshold) playCard(ACCEPT_CARD);
      else if (x < -interactXThreshold) playCard(REJECT_CARD);
      else if (y > interactYThreshold) playCard(SKIP_CARD);
      else resetCardPosition();
    },
  });
});

onBeforeUnmount(() => {
  interact(interactElement.value).unset();
});

function hideCard() {
  setTimeout(() => {
    isShowing = false;
    emits("hideCard", props.card);
  }, 300);
}

function playCard(interaction) {
  const {
    interactOutOfSightXCoordinate,
    interactOutOfSightYCoordinate,
    interactMaxRotation,
  } = strictData;

  interactUnsetElement();

  switch (interaction) {
    case ACCEPT_CARD:
      interactSetPosition({
        x: interactOutOfSightXCoordinate,
        rotation: interactMaxRotation,
      });
      emits(ACCEPT_CARD);
      break;
    case REJECT_CARD:
      interactSetPosition({
        x: -interactOutOfSightXCoordinate,
        rotation: -interactMaxRotation,
      });
      emits(REJECT_CARD);
      break;
    case SKIP_CARD:
      interactSetPosition({
        y: interactOutOfSightYCoordinate,
      });
      emits(SKIP_CARD);
      break;
  }

  hideCard();
}

function interactSetPosition(coordinates) {
  const { x = 0, y = 0, rotation = 0 } = coordinates;
  interactPosition = { x, y, rotation };
}

function interactUnsetElement() {
  interact(interactElement.value).unset();
  isInteractDragged = true;
}

function resetCardPosition() {
  interactSetPosition({ x: 0, y: 0, rotation: 0 });
}
</script>

<style lang="scss" scoped>
@import "../styles/index.scss";

$cardsTotal: 3;
$cardsWidth: 300px;
$cardsPositionOffset: 55vh * 0.06;
$cardsScaleOffset: 0.08;
$defaultTranslation: $cardsPositionOffset * $cardsTotal;
$defaultScale: 1 - ($cardsScaleOffset * $cardsTotal);
$fs-card-title: 1.125em;

.card {
  @include absolute(0);
  @include sizing(100% 80vw);
  @include flex-center();

  @include after() {
    @include sizing(21px 3px);
    @include absolute(right 0 bottom 11px left 0);

    margin: auto;
    border-radius: 100px;
    background: rgba($c-black, 0.3);
  }

  display: flex;
  max-height: 350px;
  margin: auto;
  font-size: $fs-h2;
  font-weight: $fw-bold;
  color: $c-white;
  background-image: linear-gradient(
    -180deg,
    $primary-gradient-start 2%,
    $primary-gradient-end 100%
  );
  opacity: 0;
  transform: translateY($defaultTranslation) scale($defaultScale);
  transform-origin: 50%, 100%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  user-select: none;
  pointer-events: none;
  will-change: transform, opacity;

  height: 100vw;

  &.isCurrent {
    pointer-events: auto;
  }

  &.isAnimating {
    transition: transform 0.7s $ease-out-back;
  }
}

.cardTitle {
  margin: 0 0 15px;
  font-size: $fs-card-title;
}

@for $i from 1 through $cardsTotal {
  $index: $i - 1;
  $translation: $cardsPositionOffset * $index;
  $scale: 1 - ($cardsScaleOffset * $index);

  .card:nth-child(#{$i}) {
    z-index: $cardsTotal - $index;
    opacity: 1;
    transform: translateY($translation) scale($scale);

    @if $i == 3 {
      color: $c-red-25;
      background-color: $c-red-25;
    } @else if $i == 2 {
      color: $c-red-50;
      background-color: $c-red-50;
    }

    @if $i != 1 {
      background-image: none;

      @include after() {
        @include sizing(0 0);
      }
    }
  }
}
</style>
