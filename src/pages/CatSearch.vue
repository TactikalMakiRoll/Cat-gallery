<template>
    <div>
        <UiFilters></UiFilters>
        <div class="search-view app-screen">
            <UiBreadcrumbs></UiBreadcrumbs>
            <p class="search-view__title">
                Search results for: <span>{{ this.$route.params.name }}</span>
            </p>
            <img
                v-if="breedsLoaded === false"
                src="@/assets/icons/spinner.png"
                alt="Loading..."
                class="spinner"
            />
            <div v-if="breedsLoaded" class="search-view__gallery">
                <UiGrid
                    :images="breedsImages"
                    :breedNames="breedNames"
                ></UiGrid>
                <UiNavigation
                    v-if="breedsCollection.length"
                    @back="this.page--"
                    @forward="this.page++"
                    :page="page"
                    :maxPage="
                        Math.ceil(this.breedsCollection.length / this.limit - 1)
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
import { getBreedsList } from "../api/breedsAPI";

export default {
    name: "CatBreeds",
    components: { UiGrid, UiNavigation },
    data() {
        return {
            breedsLoaded: false,
            breedsCollection: [],

            //filters
            limit: 10,

            //navigation
            page: 0,
        };
    },
    methods: {
        async loadBreeds() {
            this.breedsCollection = await getBreedsList();
            this.breedsCollection = this.breedsCollection.filter((breed) => {
                if (breed.image === undefined || breed.image === null) {
                    return false;
                }
                return breed.name
                    .toLowerCase()
                    .includes(this.$route.params.name.toLowerCase());
            });

            this.breedsLoaded = true;
        },
    },
    computed: {
        breedsImages() {
            let gridImages = [];

            this.breedsCollection.forEach((breed) => {
                gridImages.push(breed.image);
            });

            gridImages = gridImages.slice(
                this.page * this.limit,
                (this.page + 1) * this.limit
            );

            return gridImages;
        },
        breedNames() {
            let gridNames = [];

            this.breedsCollection.forEach((breed) => {
                gridNames.push({ name: breed.name, id: breed.id });
            });

            gridNames = gridNames.slice(
                this.page * this.limit,
                (this.page + 1) * this.limit
            );

            return gridNames;
        },
    },
    created() {
        this.loadBreeds();
    },
    watch: {
        $route() {
            this.breedsLoaded = false;
            this.loadBreeds();
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
