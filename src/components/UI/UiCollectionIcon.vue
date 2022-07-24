<template>
    <button
        class="collection-link br-20"
        :class="{
            'collection-link--active': active,
        }"
    >
        <img :src="iconState" :alt="altText" />
    </button>
</template>

<script>
export default {
    name: "UiCollectionIcon",
    data: function () {
        return {
            iconStandart: require(`@/assets/icons/${this.path}-30.svg`),
            iconWhite: require(`@/assets/icons/${this.path}-white-30.svg`),
        };
    },
    props: {
        path: String,
        altText: String,
        active: Boolean,
    },
    computed: {
        iconState() {
            return this.active === true ? this.iconWhite : this.iconStandart;
        },
    },
    watch: {
        path: function (newValue) {
            this.iconStandart = require(`@/assets/icons/${newValue}-30.svg`);
            this.iconWhite = require(`@/assets/icons/${newValue}-white-30.svg`);
        },
    },
};
</script>

<style lang="scss" scoped>
.collection-link {
    padding: 1rem;
    background-color: $color-nav-button-default;
    color: $color-btn-pink;
    &:hover {
        background-color: $color-btn-pink-light;
    }
    &--active {
        background-color: $color-btn-pink;
    }
}
</style>
