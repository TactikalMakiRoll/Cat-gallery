<template>
    <div>
        <UiFilters></UiFilters>
        <div class="search-view app-screen">
            <UiBreadcrumbs></UiBreadcrumbs>
            <img
                v-if="favouritesLoaded === false"
                src="@/assets/icons/spinner.png"
                alt="Loading..."
                class="spinner"
            />
            <div v-if="favouritesLoaded" class="search-view__gallery">
                <UiGrid :images="favImages" @clicked="deleteFavourite">
                    <template #hoverElem>
                        <img
                            class="grid__overlay-favour icon-20"
                            :src="favourIcon"
                        />
                    </template>
                </UiGrid>
                <UiNavigation
                    v-if="favCollection.length"
                    @back="this.page--"
                    @forward="this.page++"
                    :page="page"
                    :maxPage="
                        Math.ceil(this.favCollection.length / this.limit - 1)
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
import { getFavourites, removeFromFavourites } from "../api/catAPI";

export default {
    name: "CatFavourites",
    components: { UiGrid, UiNavigation },
    data() {
        return {
            favouritesLoaded: false,
            favCollection: [],
            favourIcon: require("@/assets/icons/fav-color-20.svg"),

            //filters
            limit: 10,

            //navigation
            page: 0,
        };
    },
    methods: {
        async loadFavourites() {
            this.favCollection = await getFavourites();
            this.favCollection = this.favCollection.filter((elem) => {
                return elem.image.url;
            });
            console.log(this.favCollection);
            this.favouritesLoaded = true;
        },
        async deleteFavourite(image) {
            let imageId = image.image_id;
            let favId = this.favCollection.find((elem) => {
                return elem.image_id === imageId;
            }).id;
            await removeFromFavourites(favId);
            image.target.remove();
            this.page = 0;
            this.loadFavourites();
        },
    },
    computed: {
        favImages() {
            let gridImages = [];

            this.favCollection.forEach((image) => {
                gridImages.push(image.image);
            });

            gridImages = gridImages.slice(
                this.page * this.limit,
                (this.page + 1) * this.limit
            );

            return gridImages;
        },
    },
    created() {
        this.loadFavourites();
    },
    watch: {
        $route() {
            this.favouritesLoaded = false;
            this.loadFavourites();
        },
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
