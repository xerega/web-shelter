<template>
  <div class="dark:bg-slate-900">
    <div
      class="mx-auto flex h-screen max-w-xl flex-col items-center justify-center p-2"
    >
      <FormsSignUp v-if="isSigningUp" />
      <FormsSignIn v-else />
    </div>
    <div
      class="absolute right-2 top-2 min-w-20 cursor-pointer rounded-lg border-2 border-sky-400 bg-sky-300/50 p-2 text-center dark:border-transparent dark:bg-sky-900 dark:text-white dark:hover:bg-sky-800"
      @click="switchSignUp"
    >
      {{ isSigningUp ? "Sign In" : "Sign Up" }}
    </div>
  </div>
</template>

<script lang="ts" setup>
const isSigningUp = ref(true);

const switchSignUp = () => {
  isSigningUp.value = !isSigningUp.value;
};
</script>
