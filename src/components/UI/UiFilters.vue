<template>
    <div class="filters">
        <form role="search" class="filters__form">
            <input
                v-model="searchValue"
                type="text"
                title="app search"
                name="query"
                placeholder="Search for breeds by name"
                class="filters__input"
            />
            <button
                class="filters__search-btn"
                @mouseover="hover = true"
                @mouseleave="hover = false"
            >
                <img
                    class="filters__search-btn-icon icon-20"
                    :src="searchHover"
                    @click.prevent="
                        (event) => {
                            $router.push({
                                path: '/search',
                                params: { name: searchValue },
                                name: 'Search',
                            });
                        }
                    "
                />
            </button>
        </form>
        <UiCollectionIcon
            class="filters__collection-link"
            :path="'like'"
            :altText="'Liked collection'"
            :active="this.$route.path.includes('liked')"
            @click="$router.push({ path: '/liked' })"
        >
        </UiCollectionIcon>
        <UiCollectionIcon
            class="filters__collection-link"
            :path="'fav'"
            :altText="'Favourite collection'"
            :active="this.$route.path.includes('favourites')"
            @click="$router.push({ path: '/favourites' })"
        >
        </UiCollectionIcon>
        <UiCollectionIcon
            class="filters__collection-link"
            :path="'dislike'"
            :altText="'Disliked collection'"
            :active="this.$route.path.includes('dislikes')"
            @click="$router.push({ path: '/dislikes' })"
        >
        </UiCollectionIcon>
    </div>
</template>

<script>
import UiCollectionIcon from "./UiCollectionIcon.vue";
export default {
    name: "UiFilters",
    data() {
        return {
            searchValue: "",
            searchPink: require("@/assets/icons/search-20.svg"),
            searchWhite: require("@/assets/icons/search-white-20.svg"),
            hover: false,
        };
    },
    computed: {
        searchHover() {
            return this.hover === true ? this.searchWhite : this.searchPink;
        },
    },
    components: { UiCollectionIcon },
};
</script>

<style lang="scss" scoped>
.filters {
    display: flex;
    gap: 0.625rem;
    margin-bottom: 0.625rem;

    .dark-mode & {
        background-color: $color-background-main-dark;
    }

    &__form {
        flex: auto;
        position: relative;
    }

    &__input {
        width: 100%;
        font-size: 1.25rem;
        padding: 1.25rem 0.625rem 1.25rem 1.25rem;
        outline: none;
        border-radius: 20px;
        position: relative;
    }
    .dark-mode &__input {
        background-color: $color-background-soft-dark;
        border: none;
        color: white;
    }

    &__search-btn {
        position: absolute;
        top: 50%;
        right: 0;
        transform: translate(calc(-50% + 0.625rem), -50%);
    }

    &__search-btn-icon {
        background-color: $color-background-soft;
        color: $color-btn-pink;
    }
    .dark-mode &__search-btn-icon {
        background-color: $color-icon-dark;
    }

    &__search-btn-icon:hover {
        background-color: $color-btn-pink;
    }

    &__input::placeholder {
        color: $color-text-accent;
    }
}

@media only screen and (max-width: 500px) {
    .filters {
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
    }
    .filters__form,
    .filters__input {
        width: 100%;
    }
}
</style>
