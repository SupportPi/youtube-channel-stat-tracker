<template>
    <div class="icon-wrapper">
        <slot class="fill"/>
    </div>
</template>

<style scoped>
    .icon-wrapper {
        width: 1.5rem;
        height: auto;
    }
    /** NOTE - This is Meant to have a  */
    .fill {
        width: 100%;
        height: 100%;
    }
</style>