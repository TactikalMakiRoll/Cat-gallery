<template>
    <div class="slider">
        <transition name="image">
            <img class="slider__image br-20" :src="currentImg" />
        </transition>
        <div class="slider__links br-20">
            <a
                v-for="(image, index) in images"
                :key="image.id"
                class="slider__link"
                :class="{
                    'slider__link--active': index === currentIndex,
                }"
                @click="this.currentIndex = index"
                href="#"
            ></a>
        </div>
    </div>
</template>

<script>
export default {
    name: "UiSlider",
    data() {
        return {
            currentIndex: 0,
        };
    },

    props: {
        images: Array,
    },

    methods: {
        next: function () {
            this.currentIndex += 1;
        },
        prev: function () {
            this.currentIndex -= 1;
        },
    },

    computed: {
        currentImg: function () {
            return this.images[this.currentIndex].url;
        },
    },
};
</script>

<style lang="scss" scoped>
.slider {
    text-align: center;

    &__links {
        display: inline-block;
        padding: 10px;
        background-color: $color-background-additional;
        transform: translate(0, -50%);
    }

    .dark-mode &__links {
        background-color: $color-background-soft-dark;
    }

    &__link {
        display: inline-block;
        width: 10px;
        height: 10px;
        background-color: rgba(251, 224, 220, 1);
        border-radius: 50%;
    }

    .dark-mode &__link {
        background-color: $color-icon-dark;
    }

    &__link--active,
    .dark-mode &__link--active {
        background-color: rgba(255, 134, 142, 1);
    }

    &__link + &__link {
        margin-left: 5px;
    }
    &__image {
        max-width: 100%;
        min-height: 360px;
        max-height: 550px;
        display: block;
        margin: 0 auto 0 auto;
        object-fit: scale-down;
    }
}

.image-enter-active,
.image-leave-active {
    transition: all 0.9s ease;
    transform: translate(0);
}
.image-enter,
.image-leave-to {
    transform: translate(150px);
}
/* On hover, add a black background color with a little bit see-through */
</style>
