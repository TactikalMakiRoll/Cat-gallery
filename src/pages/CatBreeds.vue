<template>
    <div>
        <UiFilters></UiFilters>
        <div class="breeds-view app-screen">
            <UiBreadcrumbs>
                <div v-if="breedsLoaded" class="breeds-view__filters">
                    <select
                        class="breeds-view__filter breeds-view__filter--breed select-filter"
                        @change="
                            ($event) => {
                                $router.push({
                                    path: '/breeds',
                                    name: 'BreedDetail',
                                    params: { id: $event.target.value },
                                });
                            }
                        "
                    >
                        <option value="All" selected="selected" disabled>
                            All Breeds
                        </option>

                        <option
                            v-for="breed in breedsCollection"
                            :key="breed.id"
                            :value="breed.id"
                        >
                            {{ breed.name }}
                        </option>
                    </select>
                    <select
                        class="breeds-view__filter select-filter"
                        v-model="limit"
                    >
                        <option value="5">Limit: 5</option>
                        <option value="10" selected="selected">
                            Limit: 10
                        </option>
                        <option value="15">Limit: 15</option>
                        <option value="20">Limit: 20</option>
                    </select>
                    <!-- <span class="focus"></span> -->
                    <button
                        class="breeds-view__order-filter icon-20"
                        :class="{
                            'breeds-view__order-filter--active':
                                this.sortingOrder === 'descending',
                        }"
                        @click="this.sortingOrder = 'descending'"
                    >
                        <img :src="dscIcon" alt="Sort in descending order" />
                    </button>
                    <button
                        class="breeds-view__order-filter icon-20"
                        :class="{
                            'breeds-view__order-filter--active':
                                this.sortingOrder === 'ascending',
                        }"
                        @click="this.sortingOrder = 'ascending'"
                    >
                        <img :src="ascIcon" alt="Sort in ascending order" />
                    </button>
                </div>
            </UiBreadcrumbs>
            <img
                v-if="breedsLoaded === false"
                src="@/assets/icons/spinner.png"
                alt="Loading..."
                class="spinner"
            />
            <div v-if="breedsLoaded" class="breeds-view__gallery">
                <UiGrid
                    :images="breedsImages"
                    :breedNames="breedNames"
                ></UiGrid>
                <UiNavigation
                    @back="this.page--"
                    @forward="this.page++"
                    :page="page"
                    :maxPage="
                        Math.ceil(this.breedsCollection.length / this.limit - 1)
                    "
                ></UiNavigation>
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

            ascIconDefault: require("@/assets/icons/sort-revert-20.svg"),
            ascIconActive: require("@/assets/icons/sort-revert-color-20.svg"),

            dscIconDefault: require("@/assets/icons/sort-20.svg"),
            dscIconActive: require("@/assets/icons/sort-color-20.svg"),

            //filters
            limit: 5,
            sortingOrder: "ascending",

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
                return true;
            });
            this.breedsLoaded = true;
        },
    },
    computed: {
        ascIcon() {
            return this.sortingOrder === "ascending"
                ? this.ascIconActive
                : this.ascIconDefault;
        },
        dscIcon() {
            return this.sortingOrder === "descending"
                ? this.dscIconActive
                : this.dscIconDefault;
        },
        breedsImages() {
            let gridImages = [];

            this.breedsCollection.forEach((breed) => {
                gridImages.push(breed.image);
            });

            if (this.sortingOrder === "descending") {
                gridImages = gridImages.reverse();
            }

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

            if (this.sortingOrder === "descending") {
                gridNames = gridNames.reverse();
            }

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
        limit(newVal) {
            this.limit = parseInt(newVal);
            this.page = 0;
        },
    },
};
</script>

<style lang="scss" scoped>
.spinner {
    display: block;
    margin: 0 auto;
}

.breeds-view {
    &__filters {
        width: 100%;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        margin-left: 0.625rem;
        gap: 0.625rem;
    }

    &__filter {
        color: $color-text-accent;
        background-color: $color-background-main;
        font-weight: $font-weight-regular;
        font-size: 1rem;
        font-family: $font-primary;
    }

    &__filter--breed {
        flex-basis: 100%;
    }

    &__filter--breed::-webkit-scrollbar {
        display: none;
    }

    &__order-filter {
        border: 2px solid transparent;
    }

    &__order-filter:not(&__order-filter--active):hover {
        border: 2px solid rgba(251, 224, 220, 1);
    }

    @media only screen and (max-width: 768px) {
        .breadcrumbs {
            flex-wrap: wrap;
        }

        .breeds-view {
            &__filters {
                flex-wrap: wrap;
                justify-content: center;
            }
            &__filter:nth-of-type(2) {
                display: block;
            }
        }
    }
}
</style>
