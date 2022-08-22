<template>
    <div>
        <UiFilters></UiFilters>
        <div class="search-view app-screen">
            <UiBreadcrumbs></UiBreadcrumbs>
            <div class="search-view__gallery">
                <UiGrid :images="voteImages"> </UiGrid>
                <UiNavigation
                    v-if="likedCollection.length"
                    @back="this.page--"
                    @forward="this.page++"
                    :page="page"
                    :maxPage="
                        Math.ceil(this.likedCollection.length / this.limit - 1)
                    "
                ></UiNavigation>
                <p class="not-found" v-else>No item found</p>
            </div>
        </div>
    </div>
</template>

<script>
import UiGrid from "../components/UI/UiGrid.vue";
import UiNavigation from "../components/UI/UiNavigation.vue";

export default {
    name: "CatLikes",
    components: { UiGrid, UiNavigation },
    data() {
        return {
            likedCollection: [],
            //filters
            limit: 10,

            //navigation
            page: 0,
        };
    },
    methods: {},
    computed: {
        voteImages() {
            let gridImages = [];

            this.likedCollection.forEach((image) => {
                gridImages.push(image);
            });

            gridImages = gridImages.slice(
                this.page * this.limit,
                (this.page + 1) * this.limit
            );

            return gridImages;
        },
    },
    mounted() {
        this.likedCollection = JSON.parse(localStorage.getItem("liked"));
    },
};
</script>

<style lang="scss" scoped>
.spinner {
    display: block;
    margin: 0 auto;
}

.search-view {
    &__title {
        font-size: 1.25em;
        margin-top: 20px;
    }

    &__title span {
        font-weight: $font-weight-bold;
    }
}
</style>
