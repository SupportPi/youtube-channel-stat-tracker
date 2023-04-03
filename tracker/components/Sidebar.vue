<script setup></script>
<script> // Pass down Props representing Channels to the Sidebar
export default {
    props: ['talents'],
    data() {
        return {
            collapsed: false,
            broadcasts: [],
        };
    },
    methods: {
      _toggle(event){
        this.collapsed=!this.collapsed; // Affects Classes Bound rather than Accessing and Modifying DOM Directly.
      },
    },
    created(){
    }
}


</script>

<template>
    <div class="sidebar stackable z5" v-bind:class="{ shrink: collapsed }">
        <!-- Logo + Hamburgler Wrapper -->
        <div class="logo-toggle-wrapper" v-bind:class="{ 'd-flex': collapsed, 'flex-column': collapsed, 'my-3': collapsed, 'mx-auto': collapsed }">

            <button @click="_toggle" class="hamburger" v-bind:class="{ 'hamtoggle mt-2 ms-2': !collapsed, 'mb-1': collapsed }">
                <div>
                    <svg class="hamburger-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path fill-rule="evenodd" d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z" clip-rule="evenodd" />
                    </svg>
                </div>
            </button>
        </div>

        <div>
            <!-- BRANDING Navs - Navs to https://flavr.moe -->
            <!-- TODO - ADD FADE-IN ANIMATION CLASS-->
            <!-- Uncollapsed Logo -->
            <div v-bind:class="{'hide-logo': collapsed, 'ms-10': !collapsed, 'mt-1': !collapsed}">
                <!-- Nav to https://flavr.moe -->
                <a href="https://flavr.moe/">
                    <img class="base-image" src="/logo-light.png" alt="">
                </a>
            </div>
            <!-- Collapsed Logo TODO: REPLACE WITH IMG LATER-->
            <div class="d-flex justify-center mb-3" v-bind:class="{'mt-1': !collapsed}" v-if="collapsed">
                <!-- Nav to https://flavr.moe -->
                <a href="https://flavr.moe/">
                    <h1>FVR</h1>
                </a>
            </div>
        </div>

        <!-- Home Element -->
        <hr class="mx-auto" :class="{'w-75': collapsed}">
        <!-- Always returns to Home Page of Flex -->
        <a href="https://flavr.moe/schedule" class="w-95 my-1 rounded d-flex justify-center homeblock mx-3" :class="{'w-75': collapsed}">
            <SmallIcon class="my-3" :class="{'ms-4': !collapsed}">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 small-icon">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>
            </SmallIcon>
            <h1 class="ms-4 my-auto pt-1 roboto" v-if="!collapsed">Schedule</h1>
        </a>


        <!-- Render Channel List from Prop -->
            <hr class="mx-auto d-none" :class="{'w-75': collapsed}">
            <!-- Section Title: Live -->
            <div class="w-100 d-flex justify-start" v-if="!collapsed">
                <h4 class="align-start text-red ms-3 mt-4 mb-1 roboto d-none">LIVE NOW</h4>
            </div>
            <!-- Live Talents Wrapper -->
            <div class="w-100 d-flex justify-center flex-column items-center">
                <!-- Invisible Buffer -->
                <div class="my-2"></div>

                <li class="live-list" v-for="talent in talents" :key="talent.live">
                    <div v-if="talent.live" class="mx-2">
                        <div class="w-100 navblock rounded">
                            <NavBlock :collapsed="collapsed"
                                      :desc="talent.desc"
                                      :live="talent.live" 
                                      :display-name="talent.name" 
                                      :db_ref="talent.db_ref" 
                                      :profile_src="talent.profile_picture_src"/>
                        </div>
                    </div>
                </li>
            </div>
            
            
        <!-- Render Channel List from Prop -->
        <hr class="mx-auto" v-if="!collapsed" :class="{'w-75': collapsed}">
            <!-- Section Title: Offline -->
            <div class="w-100 d-flex justify-start" v-if="!collapsed">
                <h2 class="align-start text-slate ms-3 mt-4 mb-1 roboto "><strong>CHANNELS</strong></h2>
            </div>
            <!-- Offline Talents Wrapper -->
            <div class="w-100 d-flex justify-center flex-column items-center">
                <!-- Invisible Buffer -->
                <div class="my-2"></div>

                <li class="live-list" v-for="talent in talents" :key="talent.live">
                    <div v-if="!talent.live" class="mx-2">
                        <div class="w-100 navblock rounded">
                            <NavBlock :collapsed="collapsed"
                                      :desc="talent.desc"
                                      :live="talent.live" 
                                      :display-name="talent.name" 
                                      :db_ref="talent.db_ref" 
                                      :profile_src="talent.profile_picture_src"/>
                        </div>
                    </div>
                </li>
            </div>
            <hr class="mx-auto" v-if="!collapsed" :class="{'w-75': collapsed}">
            
            <div class="mt-1" v-if="!collapsed">
                <!-- Nav to https://flavr.moe -->
                <a href="https://flavr.moe">
                    <p class="text-blue py-2">Home</p>
                </a>
            </div>
            
    </div> 
</template>

<style scoped>  
/** TODO: 
  *  Modify the Absolute Positioning of the Hamburger Button for Small Screens
  *
  */
    .z5 {
        z-index: 5;
    }
    .stackable {
        filter: brightness(1.01);
    }
    .navblock:hover {
        background-color: rgba(255, 255, 255, 0.1);    
    }
    .homeblock:hover {
        background-color: rgba(255, 255, 255, 0.1);
    }
    .live-list {
        list-style-type: none;
    }
    hr {
        width:95%;
        border-top-color: #444343; /** Gross */
    }
    .hamburger-svg {
        width: 1.7rem;
        height: auto;
    }
    .hamburger {
        color: white;
        border-radius: 100%;
        padding: 3px;
    }

    .hamburger:hover {
        background-color: rgba(255, 255, 255, 0.1);
    }
    .logo-toggle-wrapper {
        margin-right: auto;
        align-self: start;
        align-items: start;
    }
    .base-image {
        width: 15rem;
        height: auto;
        padding-left: 0.1rem;
    }
    /** Styling for the Hamburger Toggle */
    .hamtoggle {
        top: 1rem;
        left: 1rem;
    }
    .shrunkburger {
        position: relative;
        width: 100%;
        height: auto;
        align-self: center;
    }
    .sidebar {
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow: hidden;
        width: 18rem; /** 1\7rem -> 5rem */ 
        height: 100vh;     
        background-color: #363636;
        color: white;
        /* Border Immediately Removed, Other properties follow bezier over 250ms */
        transition: 250ms cubic-bezier(0.075, 0.82, 0.05, 1), border 0s;
        overflow-y: scroll;
        min-width: 18rem;
    }
    /** Custom Style the Scrollbar for the .sidebar class */
    .sidebar::-webkit-scrollbar {
        width: 0.3em;
    }
 
    .sidebar::-webkit-scrollbar-track {
        background-color: rgba(3, 3, 3, 0.2);
        box-shadow: inset 0 0 6px rgba(3, 3, 3, 0.3);
    }
 
    .sidebar::-webkit-scrollbar-thumb {
        background-color: #312d2d;
        outline: 1px solid #121212;
    }



    /** Class Defining Changes to Styling when the Sidebar is Collapsed */
    .shrink {
        width: 3.75rem;
        min-width: 3.5rem;
        transition: 250ms /*cubic-bezier(0.075, 0.82, 0.05, 1)*/;
        overflow-y: auto;
        border-right: solid 1px #5a5757; 
    }

    .hide > img {
        transition: 50ms;
        margin-left: -100%;
        width: 0rem;
        height: 0rem;
    }
    .hide-logo {
        transition: 250ms;
        margin-left: -100%;
        width: 0rem;
        height: 0rem;
    }
    /** All the Small Classes used throughout the Component */
    .roboto {
        font-family: 'Roboto', sans-serif;
    }
    .w-95 {
        width: 95%;
    }
    .text-slate {
        color:#a8a6a6;
    }
    .youtube-red {
        color: red;
    }
</style>