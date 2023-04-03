<script setup></script>
<script> // Pass down Props representing Channels to the Sidebar
export default {
    props: ["talents"],
}
</script>
<template>
    <div class="d-flex dark">
        <Sidebar :talents="talents"/>
        <div >
            <slot />
        </div>
    </div>
</template>

<style scoped>
    .dark {
        background-color: #121212; 
    }
</style>