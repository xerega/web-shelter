<template>
  <div class="flex min-h-screen dark:bg-slate-900">
    <div
      class="flex w-60 flex-col gap-4 border-r-2 border-gray-200 dark:border-gray-600"
    >
      <p class="p-4 text-3xl font-bold text-sky-500 dark:text-sky-400">
        Web Shelter
      </p>
      <div class="flex flex-col gap-2 p-2">
        <NuxtLink
          v-for="{ label, route, link, icon } in menus"
          :to="link"
          @click="routeName = route"
          class="flex items-center gap-2 rounded-xl border-2 p-2 font-bold duration-100 dark:text-gray-200"
          :class="
            routeName === route
              ? 'border-sky-400 bg-sky-200/50 hover:bg-sky-300/60 dark:border-sky-500 dark:bg-sky-950 dark:hover:bg-sky-900'
              : 'border-transparent hover:bg-gray-200/50 dark:hover:bg-slate-700/90'
          "
        >
          <Icon :name="icon" class="h-5 w-5" />
          <p class="capitalize">{{ label }}</p>
        </NuxtLink>
      </div>
      <div
        class="mt-auto flex max-w-fit cursor-pointer items-center gap-2 p-4 font-bold text-red-500 duration-100"
        @click="signOut"
      >
        <Icon name="tabler:logout" class="h-5 w-5" />
        <p>Sign out</p>
      </div>
    </div>
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { useUserStore } from "~/stores/user";

const routeName = useState("route", () =>
  useRoute().name?.toString().toLowerCase(),
);

const userStore = useUserStore();

const signOut = () => {
  userStore.signOut();

  navigateTo("/auth");
};

const menus = [
  {
    label: "Learn",
    route: "learn",
    link: "/learn",
    icon: "tabler:book",
  },
  {
    label: "Profile",
    route: "profile",
    link: "/profile",
    icon: "tabler:user",
  },
  {
    label: "Quests",
    route: "quests",
    link: "/quests",
    icon: "tabler:mail",
  },
  {
    label: "Shop",
    route: "shop",
    link: "/shop",
    icon: "tabler:shopping-cart",
  },
  {
    label: "Settings",
    route: "settings",
    link: "/settings",
    icon: "tabler:settings",
  },
];
</script>

<style></style>
