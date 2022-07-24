<template>
    <div class="pagination">
        <UiButton
            class="pagination__btn"
            :class="{
                'pagination__btn--disabled': this.currentPage === 0,
            }"
            @mouseover="prevHover = true"
            @mouseleave="prevHover = false"
            @click="
                if (this.currentPage > 0) {
                    this.currentPage--;
                    this.$emit('back', this.currentPage);
                }
            "
        >
            <img
                :src="this.currentPage === 0 ? navIconDisabled : prevIcon"
                alt="Back"
                class="pagination__btn-icon"
            />
            <span>PREV</span>
        </UiButton>
        <UiButton
            class="pagination__btn"
            :class="{
                'pagination__btn--disabled':
                    this.currentPage === currentMaxPage,
            }"
            @mouseover="nextHover = true"
            @mouseleave="nextHover = false"
            @click="
                if (this.currentPage < currentMaxPage) {
                    this.currentPage++;
                    this.$emit('forward', this.currentPage);
                }
            "
        >
            <span>NEXT</span
            ><img
                :src="
                    this.currentPage === currentMaxPage
                        ? navIconDisabled
                        : nextIcon
                "
                alt="Back"
                class="pagination__btn-icon pagination__btn-icon--next"
            />
        </UiButton>
    </div>
</template>

<script>
export default {
    name: "UiNavigation",
    data() {
        return {
            currentPage: 0,
            currentMaxPage: 0,

            prevHover: false,
            nextHover: false,

            navIconStandart: require("@/assets/icons/back-20.svg"),
            navIconHover: require("@/assets/icons/back-white-20.svg"),
            navIconDisabled: require("@/assets/icons/dropdown-12.svg"),
        };
    },
    props: {
        page: Number,
        maxPage: Number,
    },
    computed: {
        prevIcon() {
            return this.prevHover ? this.navIconHover : this.navIconStandart;
        },

        nextIcon() {
            return this.nextHover ? this.navIconHover : this.navIconStandart;
        },
    },
    watch: {
        page(newVal) {
            this.currentPage = newVal;
        },
        maxPage(newVal) {
            this.currentMaxPage = newVal;
        },
    },
    mounted() {
        this.currentPage = this.page;
        this.currentMaxPage = this.maxPage;
    },
};
</script>

<style lang="scss" scoped>
.pagination {
    display: flex;
    justify-content: center;
    gap: 2.5rem;

    &__btn {
        position: relative;
        font-size: 0.75rem;
        color: $color-btn-pink;
        background-color: $color-btn-pink-light;
        padding: 15px 30px;
    }

    &__btn--disabled {
        background-color: $color-background-main;
    }

    &__btn--disabled &__btn-icon {
        transform: rotate(90deg);
    }

    &__btn--disabled &__btn-icon--next {
        transform: rotate(270deg) scaleX(-1);
    }

    &__btn-icon {
        width: 16px;
        height: 16px;
        margin-right: 16px;
        vertical-align: middle;
    }

    &__btn-icon--next {
        transform: scaleX(-1);
        margin-left: 16px;
        margin-right: 0;
    }
}
</style>
