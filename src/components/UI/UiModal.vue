<template>
    <div class="modal-backdrop">
        <div class="modal br-20">
            <h2 class="modal__heading"><slot name="header"></slot></h2>

            <p class="modal__description"><slot name="description"></slot></p>

            <slot name="body"> </slot>

            <button
                class="modal__close-btn icon-20"
                @click="close"
                @mouseover="closeHover = true"
                @mouseleave="closeHover = false"
            >
                <img :src="closeIcon" />
            </button>
        </div>
    </div>
</template>

<script>
export default {
    name: "Modal",
    data() {
        return {
            closeHover: false,
            closeStandart: require("@/assets/icons/close-20.svg"),
            closeHovered: require("@/assets/icons/close-white-20.svg"),
        };
    },
    computed: {
        closeIcon() {
            return this.closeHover ? this.closeHovered : this.closeStandart;
        },
    },
    methods: {
        close() {
            this.$emit("close");
        },
    },
};
</script>

<style lang="scss" scoped>
.modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: flex-end;
    align-items: center;
    z-index: 9999;
}
.modal {
    background: $color-background-main;
    width: calc(60% - 9rem);
    height: calc(100vh - 3.75rem);
    position: relative;
    right: 1.875rem;
    padding-left: 20px;
    padding-right: 20px;
    // text-align: center;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;

    &__close-btn {
        display: inline-block;
        position: absolute;
        right: 20px;
        top: 20px;
        background-color: $color-background-additional;
    }

    &__close-btn:hover {
        background-color: $color-btn-pink;
    }

    &__heading {
        font-weight: $font-weight-bold;
        font-size: 2.5em;
        margin: 6.875rem 0 1.875rem 0;
    }

    &__description {
        color: $color-text-accent;
        font-size: 1.25em;
        margin-bottom: 3rem;
    }
}
</style>
