<script setup></script>
<script>
    export default {
    props: ['displayName', 'collapsed', 'live', 'desc', 'profile_src', 'db_ref'], // Ref Used to Internally Compute Links
    computed: {
        dest(){
            return "/c/" + this.db_ref;
        }
    },
}
</script>
<template>
    <NuxtLink :href="dest">
        <div class="mb-1 nav-block">
        <div class="d-flex justify-stretch items-center w-100 py-1" :class="{'mb-2 py-2': collapsed}">
            <div :class="{'me-10 my-auto': !collapsed, 'mx-auto my-auto': collapsed}">
                <img class="profile-pic" :src="profile_src" alt="404" loading="lazy">
            </div>
            <div class="roboto" v-bind:class="{'overflow-ellipses': !collapsed}">
                <h1 class="roboto overflow-ellipses" v-if="!collapsed" v-bind:class="{'pt-2': desc === 'none'}"> {{ displayName }} </h1>
                <p class="mx-3 desc-text overflow-ellipses" v-if="!collapsed && desc !== 'none'">{{ desc }}</p>
            </div>
        </div>
    </div>
    </NuxtLink>

</template>

<style scoped>
    .overflow-ellipses {
        text-overflow: ellipsis;
    }
    .profile-pic {
        width: 2.3rem;
        height: 2.3rem;
        border-radius: 100%;
    }
    .roboto {
        font-family: 'Roboto', sans-serif;
    }
    .dynamic-text {
        font-size: 1rem;
    }
    .nav-block {
        margin-left: auto;
        margin-right: auto;
        width: 90%;
        transition: 250ms;
    }
    .overflow-none {
        overflow: hidden;
        white-space: nowrap;
    }
    .desc-text {
        font-size: 0.7rem;
        color:#a8a6a6;
    }


</style>