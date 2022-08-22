<template>
    <div>
        <UiFilters></UiFilters>
        <div class="breed-view app-screen">
            <UiBreadcrumbs></UiBreadcrumbs>
            <img
                v-if="breedLoaded === false"
                src="@/assets/icons/spinner.png"
                alt="Loading..."
                class="spinner"
            />
            <div v-else class="breed-view__details">
                <div class="breed-view__image">
                    <UiSlider :images="breedImages"></UiSlider>
                </div>
                <h2 class="breed-view__name br-20">{{ breedInfo.name }}</h2>
                <div class="breed-view__info br-20">
                    <h3 class="breed-view__description">
                        {{ breedInfo.description.split(".")[0] }}
                    </h3>
                    <div class="breed-view__stats">
                        <div>
                            <h3 class="breed-view__heading">Temperament:</h3>
                            <p>{{ breedInfo.temperament }}</p>
                        </div>
                        <div>
                            <div class="breed-view__stat">
                                <span class="breed-view__heading"
                                    >Origin:
                                </span>
                                <span>{{ breedInfo.origin }}</span>
                            </div>
                            <div class="breed-view__stat">
                                <span class="breed-view__heading"
                                    >Weight:
                                </span>
                                <span>{{ breedInfo.weight.metric }} kgs</span>
                            </div>
                            <div class="breed-view__stat">
                                <span class="breed-view__heading"
                                    >Life span:
                                </span>
                                <span>{{ breedInfo.life_span }} years</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getBreed } from "../api/breedsAPI";
import { getBreedImages } from "../api/catAPI";
import UiSlider from "../components/UI/UiSlider.vue";

export default {
    name: "CatBreeds",
    data() {
        return {
            breedInfo: {},
            breedImages: [],
            breedLoaded: false,
        };
    },
    methods: {
        async loadBreed() {
            this.breedInfo = (await getBreed(this.$route.params.id))[0];
            this.breedImages = await getBreedImages(this.breedInfo.id);
            this.breedLoaded = true;
        },
    },
    created() {
        this.loadBreed();
    },
    components: { UiSlider },
};
</script>

<style lang="scss" scoped>
.breed-view {
    height: calc(100vh - 8rem);
    text-align: center;
    .dark-mode & {
        background-color: $color-background-soft-dark;
    }

    &__image {
        margin-top: 1.25rem;
    }

    &__details {
        text-align: center;
    }

    &__name {
        display: inline-block;
        padding: 5px 2.5em;
        background-color: $color-background-additional;
        color: black;
        font-size: 2.25rem;
        font-weight: $font-weight-bold;
        transform: translate(0, 50%);
    }

    .dark-mode &__name {
        background-color: $color-background-soft-dark;
        color: white;
    }

    &__info {
        border: 3px solid rgba(251, 224, 220, 1);
        max-width: 1000px;
        margin: 0 auto;
    }

    .dark-mode &__info {
        border-color: $color-border-dark;
    }

    &__description {
        max-width: 50%;
        margin: 1.875rem auto 0 auto;
        word-break: break-word;
        font-size: 1.25em;
        color: $color-text-accent;
    }

    &__stats {
        display: flex;
        flex: 1 1 0px;
        justify-content: space-evenly;
        margin-top: 1.25rem;
        padding: 2.5rem;
        text-align: left;
        line-height: 1.45em;
    }

    &__stats > div {
        flex-basis: 33%;
    }

    &__stat + &__stat {
        margin-top: 0.25rem;
    }

    &__heading {
        font-weight: $font-weight-bold;
        color: $color-text-primary;
    }

    .dark-mode &__heading {
        color: white;
    }

    &__heading + span {
        color: $color-text-accent;
    }

    &__heading + p {
        color: $color-text-accent;
    }
}

@media only screen and (max-height: 1000px) {
    .breed-view__stats{
        padding: 0;
        padding-bottom: 0.25rem;
    }

}
</style>
