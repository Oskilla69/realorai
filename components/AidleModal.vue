<template>
  <div class="overlay fixed z-10 inset-0 overflow-y-auto">
    <div class="flex items-center justify-center min-h-screen">
      <div
        class="fixed inset-0 transition-opacity"
        aria-hidden="true"
        @click="closeModal"
      ></div>

      <div
        class="bg-zinc-500 rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full"
      >
        <div class="px-4 pt-3 flex flex-row items-center justify-between">
          <div class="flex flex-row items-center gap-2">
            <slot name="title"></slot>
          </div>
          <button @click="closeModal">
            <svg
              class="h-8 w-8"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div class="px-4 pb-3">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const emits = defineEmits(["isOpen"]);
function closeModal() {
  emits("isOpen", false);
}
</script>
