<script setup>
const { data: talent } = await useFetch('/api/talents')
</script>

<script>
// On Load, Makes Request to Server for Updated Data
export default {
  mounted(){
    console.log("Page Hydrated!");
  },
  async setup(){
  }
}
</script>
<template>
      <NuxtLayout :talents="talent" >
        <NuxtPage :talents="talent" />
      </NuxtLayout>
</template>
