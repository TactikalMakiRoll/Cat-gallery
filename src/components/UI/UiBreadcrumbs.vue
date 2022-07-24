<template>
    <div class="breadcrumbs">
        <button
            class="breadcrumbs__back icon-20"
            @mouseover="hover = true"
            @mouseleave="hover = false"
            @click="$router.back()"
        >
            <img :src="backHover" />
        </button>
        <button
            v-for="(crumb, index) in breadCrumbs"
            :key="crumb.toString()"
            class="breadcrumbs__crumb"
            :class="{
                'breadcrumbs__crumb--active': index === breadCrumbs.length - 1,
            }"
            @click="
                (event) => {
                    if (index < breadCrumbs.length - 1)
                        $router.push({
                            path: '/' + crumb,
                        });
                }
            "
        >
            {{ crumb.toUpperCase() }}
        </button>
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: "UiBreadcrumbs",
    data() {
        return {
            backPink: require("@/assets/icons/back-20.svg"),
            backWhite: require("@/assets/icons/back-white-20.svg"),
            hover: false,
            breadCrumbs: this.$route.path
                .slice(1)
                .split("/")
                .filter((elem) => elem !== "search"),
        };
    },
    computed: {
        backHover() {
            return this.hover === true ? this.backWhite : this.backPink;
        },
    },
};
</script>

<style lang="scss" scoped>
.breadcrumbs {
    display: flex;
    gap: 0.625rem;

    &__back {
        background-color: $color-background-soft;
    }

    &__back:hover {
        background-color: $color-btn-pink;
    }

    &__crumb {
        padding: 0.875rem 1.875rem;
        border-radius: 10px;
        background-color: $color-background-soft;
        color: $color-btn-pink;
        font-size: 1.25em;
        font-weight: $font-weight-bold;
        letter-spacing: 2px;
    }

    &__crumb:not(&__crumb--active):hover {
        cursor: pointer;
        color: $color-nav-button-default;
    }

    &__crumb--active {
        cursor: auto;
        background-color: $color-btn-pink;
        color: $color-nav-button-default;
    }
}
</style>
