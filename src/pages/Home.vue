<template>
    <div
        class="app"
        :class="{
            'dark-mode': darkModeActive, // change to dark mode depending on toggle status
        }"
    >
        <section
            class="nav"
            :class="{
                'hide-nav': viewingmode === 'tablet' && this.isInAppView,
            }"
        >
            <header class="nav__header">
                <img
                    :src="navIcon"
                    alt="PetsPaw logo"
                    class="nav__logo"
                    @click="
                        isInAppView = false;
                        $router.push({ path: '/home' });
                        isInAppView = true;
                        activeView = '';
                    "
                />
                <div class="nav__dark-mode">
                    <img
                        :src="darkModeIcon"
                        alt="Dark mode - off"
                        class="nav__mode-icon br-full"
                        :class="{ 'nav__mode-icon--dark': darkModeActive }"
                    />
                    <UiToggle @clicked="toggleDarkMode"> </UiToggle>
                </div>
            </header>
            <h2 class="nav__greetings">Hi intern!</h2>
            <p class="nav__welcome text-accent">
                Welcome to MI 2022 Front-end test
            </p>
            <h4 class="text-bold">Lets start using The Cat API</h4>
            <nav role="navigation" class="nav__cards">
                <div
                    class="nav__tab"
                    role="menu section"
                    :class="{
                        'nav__tab--active': activeView === 'voting',
                    }"
                    @click="
                        (event) => {
                            $router.push({ path: '/voting' });
                            isInAppView = true;
                            activeView = 'voting';
                        }
                    "
                >
                    <div
                        class="nav__card nav__card--voting br-20"
                        :class="{
                            'nav__card--active': activeView === 'voting',
                        }"
                    >
                        <img
                            class="nav__card-image"
                            src="@/assets/images/vote-table.png"
                            alt="Open voting"
                        />
                    </div>
                    <UiButton class="nav__button">Voting</UiButton>
                </div>
                <div
                    role="menu section"
                    class="nav__tab"
                    :class="{
                        'nav__tab--active': activeView === 'breeds',
                    }"
                    @click="
                        (event) => {
                            $router.push({ path: '/breeds' });
                            isInAppView = true;
                            activeView = 'breeds';
                        }
                    "
                >
                    <div
                        class="nav__card nav__card--breeds br-20"
                        :class="{
                            'nav__card--active':
                                activeView === 'breeds' &&
                                this.$route.path === '/breeds',
                        }"
                    >
                        <img
                            class="nav__card-image"
                            src="@/assets/images/pet-breeds.png"
                            alt="Open breeds"
                        />
                    </div>
                    <UiButton class="nav__button">Breeds</UiButton>
                </div>
                <div
                    role="menu section"
                    class="nav__tab"
                    :class="{
                        'nav__tab--active': activeView === 'gallery',
                    }"
                    @click="
                        (event) => {
                            $router.push({ path: '/gallery' });
                            isInAppView = true;
                            activeView = 'gallery';
                        }
                    "
                >
                    <div
                        class="nav__card nav__card--gallery br-20"
                        :class="{
                            'nav__card--active': activeView === 'gallery',
                        }"
                    >
                        <img
                            class="nav__card-image"
                            src="@/assets/images/images-search.png"
                            alt="Open gallery"
                        />
                    </div>
                    <UiButton class="nav__button">Gallery</UiButton>
                </div>
            </nav>
        </section>
        <section
            class="main-screen br-20"
            :class="{
                'main-screen--disabled': this.$route.path.includes('home'),
            }"
            :style="{
                height: this.$route.path.includes('home')
                    ? 'height: calc(100vh - 3.75rem)'
                    : 'unset',
            }"
        >
            <img
                class="main-screen__placeholder"
                src="@/assets/images/girl-and-pet.png"
                alt=""
                v-if="this.$route.path.includes('home')"
            />
            <RouterView></RouterView>
        </section>
    </div>
</template>

<script>
export default {
    name: "Home",
    data() {
        return {
            // app selected view
            isInAppView: false,
            activeView: null,

            // dark mode state, icon, logo
            darkModeActive: true,
            darkModeStandart: require(`@/assets/icons/eye.svg`),
            darkModeActivated: require(`@/assets/icons/eye-closed.svg`),
            logoDark: require(`@/assets/icons/logo-white.svg`),
            logoStandart: require(`@/assets/icons/logo.svg`),

            // device mode depending on width
            viewingmode: "desktop",
        };
    },
    methods: {
        resized() {
            if (outerWidth < 768) {
                this.viewingmode = "tablet";
            }
        },
        toggleDarkMode() {
            this.darkModeActive = !this.darkModeActive;
            localStorage.setItem("dark-mode", this.darkModeActive);
            document.body.style.backgroundColor = this.darkModeActive
                ? "rgba(29, 29, 29, 1)"
                : "rgba(248, 248, 247, 1)";
        },
    },
    computed: {
        darkModeIcon() {
            return this.darkModeActive
                ? this.darkModeActivated
                : this.darkModeStandart;
        },
        navIcon() {
            return this.darkModeActive ? this.logoDark : this.logoStandart;
        },
    },
    mounted() {
        window.addEventListener("resize", this.resized);
        this.darkModeActive =
            localStorage.getItem("dark-mode") === "true" ? true : false;
        document.body.style.backgroundColor = this.darkModeActive
            ? "rgba(29, 29, 29, 1)"
            : "rgba(248, 248, 247, 1)";
    },
    unmounted() {
        window.removeEventListener("resize", this.resized);
    },
    created() {
        if (window.innerWidth < 768) {
            this.viewingmode = "tablet";
        }
        this.isInAppView = false;
    },
    watch: {
        $route() {
            if (this.$route.path.includes("home")) this.isInAppView = false;
        },
    },
};
</script>

<style lang="scss" scoped>
.app {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
}

.nav {
    width: 40%;
    max-width: 1080px;

    font-size: 1.25em;
    padding-left: 6em;
    position: sticky;
    align-self: flex-start;
    top: 1.875rem;

    &__header {
        display: flex;
        justify-content: space-between;
    }

    &__dark-mode {
        display: flex;
    }

    &__logo:hover {
        cursor: pointer;
    }

    &__mode-icon {
        padding: 4px;
        background-color: $color-background-soft;
    }

    &__mode-icon--dark {
        background-color: $color-background-soft-dark;
    }

    &__greetings {
        font-size: 2.2em;
        margin-top: 2.1em;
    }

    &__welcome {
        margin-top: 1.2em;
        margin-bottom: 3.7em;
    }

    &__cards {
        display: flex;
        gap: 1rem;
        margin-top: 1.4em;
    }

    &__tab:not(&__card--tab):hover {
        cursor: pointer;
    }

    &__card {
        width: 100%;
        margin-bottom: 0.5em;
        border: 4px solid;
    }

    &__tab:hover &__card:not(&__card--active) {
        border-color: white;
        cursor: pointer;
    }

    &__tab:hover &__card:not(&__card--active) + &__button {
        border: 1px solid black;
        background-color: $color-btn-pink-light;
    }

    &__card--active {
        border-color: $color-btn-pink-light;
    }

    &__card--active + &__button {
        color: white;
        background-color: $color-btn-pink;
    }

    &__card-image {
        width: 100%;
    }

    &__card--voting {
        background-color: rgba(180, 183, 255, 1);
        border-color: rgba(180, 183, 255, 0.4);
    }

    &__card--breeds {
        background-color: rgba(151, 234, 185, 1);
        border-color: rgba(151, 234, 185, 0.4);
    }

    &__card--gallery {
        background-color: rgba(255, 210, 128, 1);
        border-color: rgba(255, 210, 128, 0.4);
    }

    &__button {
        background-color: white;
        color: $color-btn-pink;
    }
}

.main-screen {
    width: calc(60% - 3.75rem);
    margin-left: 8.5rem;

    &--disabled {
        background-color: $color-background-soft;
    }

    .dark-mode &--disabled {
        background-color: $color-background-soft-dark;
    }

    &__app {
        margin-left: 6.6875em;
    }

    &__placeholder {
        width: calc(100% + 8.375em);
        position: relative;
        top: -1.875rem;
        left: -6.375rem;
    }
}

.dark-mode {
    background-color: rgba(29, 29, 29, 1);
    color: $color-text-primary-dark;

    & .nav__tab:hover .nav__card:not(.nav__card--active) + .nav__button {
        border: 1px solid white;
    }

    & .nav__button {
        background-color: $color-background-additional-dark;
    }
}

@media only screen and (max-width: 1200px) {
    .nav__button {
        font-size: 1rem;
    }
}

@media only screen and (min-width: 2000px) {
    .nav__cards {
        justify-content: space-between;
        margin-top: 3rem;
    }
    .nav__tab{
        width:25%;
    }
}

@media only screen and (max-width: 1000px) {
    .app {
        flex-direction: column;
    }

    .nav {
        width: 100%;
        padding: 0;
        height: 100vh;
        text-align: center;

        &__cards {
            justify-content: space-evenly;
        }
        &__mode-icon {
            width: 25px;
            height: 25px;
        }
    }
    .hide-nav {
        position: absolute;
        left: -100%;
    }
    .main-screen {
        width: 100%;
        margin: 0;
    }
}
</style>
