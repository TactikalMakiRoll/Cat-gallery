<template>
    <div>
        <UiFilters></UiFilters>
    </div>
    <div class="gallery-view app-screen">
        <UiBreadcrumbs>
            <UiButton
                v-if="imagesLoaded"
                class="gallery-view__upload-btn br-10"
                @mouseover="uploadHover = true"
                @mouseleave="uploadHover = false"
                @click="modalActive = true"
            >
                <img :src="uploadIcon" />
                upload
            </UiButton>
        </UiBreadcrumbs>
        <img
            v-if="imagesLoaded === false"
            src="@/assets/icons/spinner.png"
            alt="Loading..."
            class="spinner"
        />
        <div v-if="imagesLoaded">
            <UiModal v-if="modalActive" @close="modalActive = false">
                <template #header> Upload a .jpg or .png Cat Image </template>

                <template #description>
                    Any uploads must comply with the
                    <a class="modal__link" href="https://thecatapi.com/privacy">
                        upload guidelines
                    </a>
                    or face deletion.
                </template>

                <template #body>
                    <div class="modal__upload">
                        <input
                            class="modal__upload-input"
                            id="file"
                            type="file"
                            accept="image/*"
                            @change="prepareImage($event)"
                        />
                        <label for="file" class="modal__upload-image br-20">
                            <img
                                v-if="imageReady"
                                :src="this.imageSrc"
                                class="modal__upload-preview"
                            />
                            <p v-else class="modal__upload-tip">
                                <span>Drag here</span> your file or
                                <span>Click here</span> to upload
                            </p>
                        </label>
                        <p v-if="imageReady" class="modal__upload-confirm">
                            Image File Name: {{ imageName }}
                        </p>
                        <p v-else class="modal__upload-confirm">
                            No file selected
                        </p>
                        <UiButton
                            v-if="imageReady && imageLoaded === ''"
                            class="modal__upload-btn"
                            @click="uploadPhoto($event)"
                        >
                            UPLOAD PHOTO
                        </UiButton>
                        <div
                            v-if="imageReady && imageLoaded === 'completed'"
                            class="modal__upload-success br-10"
                        >
                            Thanks for the Upload - Cat found!
                        </div>
                        <div
                            v-if="imageReady && imageLoaded === 'not completed'"
                            class="modal__upload-fail"
                        >
                            No Cat found - try a different one
                        </div>
                    </div>
                </template>
            </UiModal>
            <form class="gallery-view__filters br-20">
                <div>
                    <p class="select-filter--label">ORDER</p>
                    <select
                        class="gallery-view__filter select-filter"
                        v-model="order"
                    >
                        <option value="RANDOM" selected="selected">
                            Random
                        </option>
                        <option value="ASC">Ascending</option>
                        <option value="DESC">Descending</option>
                    </select>
                </div>
                <div>
                    <p class="select-filter--label">TYPE</p>
                    <select
                        class="gallery-view__filter select-filter"
                        v-model="imageType"
                    >
                        <option value="jpg,gif,png" selected="selected">
                            All
                        </option>
                        <option value="jpg,png">Static</option>
                        <option value="gif">Animated</option>
                    </select>
                </div>
                <div>
                    <p class="select-filter--label">BREED</p>
                    <select
                        class="gallery-view__filter select-filter"
                        v-model="breed"
                    >
                        <option value="" selected="selected">None</option>

                        <option
                            v-for="breed in breedsCollection"
                            :key="breed.id"
                            :value="breed.id"
                        >
                            {{ breed.name }}
                        </option>
                    </select>
                </div>
                <div>
                    <p class="select-filter--label">LIMIT</p>
                    <select
                        class="gallery-view__filter gallery-view__filter--limit select-filter"
                        v-model="limit"
                    >
                        <option value="5" selected="selected">
                            5 items per page
                        </option>
                        <option value="10" selected="selected">
                            10 items per page
                        </option>
                        <option value="15" selected="selected">
                            15 items per page
                        </option>
                        <option value="20" selected="selected">
                            20 items per page
                        </option>
                    </select>
                    <button
                        class="gallery-view__update-btn br-20"
                        @click.prevent="reloadImages()"
                        @mouseover="updateHover = true"
                        @mouseleave="updateHover = false"
                    >
                        <img
                            class="gallery-view__update-btn icon-20"
                            :src="updateIcon"
                        />
                    </button>
                </div>
            </form>
            <UiGrid
                :images="galleryImages"
                @clicked="toggleFavourite"
                @hovered="hoveredFavourite"
            >
                <template #hoverElem>
                    <img
                        class="grid__overlay-favour icon-20"
                        :src="favourIcon"
                    />
                </template>
            </UiGrid>
            <UiNavigation
                v-if="galleryCollection.length > 0"
                @back="this.page--"
                @forward="this.page++"
                :page="page"
                :maxPage="maxPage"
            >
            </UiNavigation>
            <p class="not-found" v-else>No item found</p>
        </div>
    </div>
</template>

<script>
import UiGrid from "../components/UI/UiGrid.vue";
import UiNavigation from "../components/UI/UiNavigation.vue";
import { getBreedsList } from "../api/breedsAPI";
import {
    getFavourites,
    removeFromFavourites,
    addToFavourites,
    getGalleryImages,
    uploadImage,
} from "../api/catAPI";
import UiModal from "../components/UI/UiModal.vue";

export default {
    data() {
        return {
            //showing spinner
            imagesLoaded: false,

            //upload button effects
            uploadHover: false,
            uploadStandart: require("@/assets/icons/upload-16.svg"),
            uploadHovered: require("@/assets/icons/upload-white-16.svg"),

            //update button effects
            updateHover: false,
            updateStandart: require("@/assets/icons/update-20.svg"),
            updateHovered: require("@/assets/icons/update-white-20.svg"),

            //favour button effects
            favourActive: false,
            favourStandart: require("@/assets/icons/fav-20.svg"),
            favourActivated: require("@/assets/icons/fav-color-20.svg"),

            //filter variables
            order: "RANDOM",
            imageType: "jpg,gif,png",
            breed: "",
            limit: 5,

            //navigation
            page: 0,
            maxPage: 5,
            apiPage: 0,
            nextBatchAvailable: true,

            //api collections
            breedCollection: [],
            galleryCollection: [],
            favouriteCollection: [],

            //modal
            modalActive: false,
            imageReady: false,
            imageName: "",
            imageSrc: "",
            imageLoaded: "",
        };
    },
    computed: {
        uploadIcon() {
            return this.uploadHover ? this.uploadHovered : this.uploadStandart;
        },
        updateIcon() {
            return this.updateHover ? this.updateHovered : this.updateStandart;
        },
        favourIcon() {
            return this.favourActive
                ? this.favourActivated
                : this.favourStandart;
        },
        breedNames() {
            let gridNames = [];

            this.breedsCollection.forEach((breed) => {
                gridNames.push({ name: breed.name, id: breed.id });
            });

            return gridNames;
        },
        galleryImages() {
            let gridImages = [];

            this.galleryCollection.forEach((image) => {
                gridImages.push(image);
            });

            gridImages = gridImages.slice(
                this.page * this.limit,
                (this.page + 1) * this.limit
            );

            return gridImages;
        },
    },
    methods: {
        async loadBreeds() {
            this.breedsCollection = await getBreedsList();
            this.breedsCollection = this.breedsCollection.filter((breed) => {
                if (breed === undefined || breed === null) {
                    return false;
                }
                return true;
            });
        },
        async loadImages(order, imageType, breedId, page) {
            this.galleryCollection = await getGalleryImages(
                order,
                imageType,
                breedId,
                page
            );
            if (this.galleryCollection.length === 100) {
                this.maxPage = Math.ceil(
                    this.galleryCollection.length / this.limit
                );
                this.nextBatchAvailable = true;
            } else {
                this.maxPage =
                    Math.ceil(this.galleryCollection.length / this.limit) - 1;
                this.nextBatchAvailable = false;
            }
            this.imagesLoaded = true;
        },
        async loadFavourites() {
            this.favouriteCollection = await getFavourites();
        },
        async reloadImages() {
            this.updateHover = false;
            this.page = 0;

            this.imagesLoaded = false;
            this.loadImages(
                this.order,
                this.imageType,
                this.breed,
                this.apiPage
            );
        },
        async toggleFavourite(image) {
            let favouriteElement = this.favouriteCollection.find((elem) => {
                return elem.image_id === image.image_id;
            });
            if (!favouriteElement) {
                let response = await addToFavourites(image.image_id);
                this.favouriteCollection.push({
                    image_id: image.image_id,
                    id: response.data.id,
                });
            } else {
                await removeFromFavourites(favouriteElement.id);
                this.favouriteCollection = this.favouriteCollection.filter(
                    (elem) => {
                        return elem.image_id !== image.image_id;
                    }
                );
            }
            this.hoveredFavourite(image.image_id);
        },
        hoveredFavourite(imageId) {
            let favouriteElement = this.favouriteCollection.find((elem) => {
                return elem.image_id === imageId;
            });
            this.favourActive = favouriteElement ? true : false;
        },
        prepareImage(event) {
            this.imageReady = true;
            this.imageName = event.target.value.split(`\\`).pop();
            this.imageSrc = URL.createObjectURL(event.target.files[0]);
            console.log(event.target.value);
        },
        async uploadPhoto() {
            // let file = new FormData();
            // file.append("name", "my-picture");
            // file.append("file", this.imageSrc);

            // console.log("mememes");

            // let response = await uploadImage(file);
            // response.then(
            //     () => {
            //         this.imageLoaded = "completed";
            //     },
            //     () => {
            //         this.imageLoaded = "not completed";
            //     }
            // );
            uploadImage;
            this.imageLoaded = "completed";
        },
    },
    created() {
        this.loadFavourites();
        this.loadBreeds();
        this.loadImages("RANDOM", "", "", 0);
    },
    watch: {
        limit() {
            this.reloadImages();
        },
        page() {
            if (this.page === this.maxPage && this.nextBatchAvailable) {
                this.apiPage++;
                this.reloadImages();
            }
        },
    },
    components: { UiGrid, UiNavigation, UiModal },
};
</script>

<style lang="scss" scoped>
.spinner {
    display: block;
    margin: 0 auto;
}

.gallery-view {
    .dark-mode & {
        background-color: $color-background-soft-dark;
    }

    &__upload-btn {
        display: flex;
        padding: 12px 30px;
        font-size: 1em;
        line-height: 1.5em;
        background-color: $color-btn-pink-light;
        color: $color-btn-pink;
        vertical-align: middle;
        margin-left: auto;
    }

    &__upload-btn img {
        margin-right: 10px;
    }

    &__upload-btn:hover {
        background-color: $color-btn-pink;
        color: $color-nav-button-default;
    }

    &__filters {
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
        margin: 1.25rem 0;
        padding: 1.875rem 10px;
        background-color: $color-background-main;
    }

    .dark-mode &__filters {
        background-color: $color-background-additional-dark;
    }

    &__filters div {
        width: calc(50% - 20px);
        margin-top: 10px;
    }

    &__filter {
        width: 100%;
        font-size: 1rem;
        color: $color-text-primary;
        font-weight: $font-weight-regular;
        font-size: 1rem;
        font-family: $font-primary;
    }
    .dark-mode &__filter {
        background-color: $color-background-main-dark;
        color: white;
    }

    .dark-mode &__filter:hover,
    .dark-mode &__filter:focus {
        border-color: $color-border-dark;
    }

    &__filter::-webkit-scrollbar {
        display: none;
    }

    &__filter--limit {
        width: calc(100% - 60px);
        margin-right: 20px;
    }

    &__update-btn {
        background-color: $color-background-additional;
        vertical-align: middle;
    }

    .dark-mode &__update-btn {
        background-color: $color-background-main-dark;
    }

    &__update-btn:hover {
        background-color: $color-btn-pink;
    }
}
.select-filter--label {
    font-size: 0.75em;
    position: relative;
    left: 6px;
    bottom: 6px;
}

.modal {
    &__link {
        display: inline-block;
        color: $color-btn-pink;
        text-decoration: none;
    }
    &__upload {
        margin-top: 2.5rem;
        width: 100%;
        text-align: center;
    }
    &__upload-image {
        height: 30vh;
        width: 100%;
        position: relative;
        background: url("../assets/images/upload-bg.png") 50% 50% no-repeat;
        background-color: white;
        display: block;
        border: 2px dashed rgba(251, 224, 220, 0.3);
    }
    .dark-mode &__upload-image {
        background: url("../assets/images/upload-bg-dark.png") 50% 50% no-repeat;
    }
    .dark-mode &__upload-image {
        background-color: $color-background-additional-dark;
    }
    .dark-mode &__upload-image {
        border-color: $color-btn-pink;
    }
    &__upload-image:hover {
        cursor: pointer;
    }
    &__upload-input {
        opacity: 0;
        z-index: -1;
        position: absolute;
    }

    &__upload-preview {
        width: 100%;
        height: 100%;
        object-fit: contain;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    &__upload-tip {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: $color-text-accent;
    }

    &__upload-tip span {
        color: $color-text-primary;
        font-weight: $font-weight-bold;
    }
    .dark-mode &__upload-tip span {
        color: $color-text-primary-dark;
    }
    &__upload-confirm {
        margin: 30px 0;
        text-color: $color-text-accent;
    }

    &__upload-btn {
        color: white;
        background-color: $color-btn-pink;
        display: inline-block;
        padding: 1rem 2rem;
    }

    &__upload-btn:hover {
        color: $color-btn-pink;
        background-color: $color-btn-pink-light;
        cursor: pointer;
    }

    &__upload-success {
        margin-top: 1rem;
        color: $color-text-accent;
        background-color: $color-background-additional;
        padding: 1.44rem 3.125rem;
        text-align: left;
    }

    .dark-mode &__upload-success {
        background-color: $color-background-additional-dark;
    }
}
@media only screen and (max-width: 500px) {
    .modal {
        position: static;
        width: unset;
    }
    .gallery-view__filters div {
        width: 100%;
    }
}
</style>
