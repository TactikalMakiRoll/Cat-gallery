<template>
    <div v-for="gridview in gridCollections" :key="gridview.id" class="grid">
        <div
            v-for="(image, index) in gridview.images"
            :key="image.id"
            class="grid__element br-20"
            :class="{
                'grid__element--forward': gridview.id % 2 === 0,
                'grid__element--reverse': gridview.id % 2 !== 0,
            }"
            @click="
                ($event) => {
                    if (breedNameCollections.length !== 0) {
                        $router.push({
                            path: '/breeds',
                            name: 'BreedDetail',
                            params: {
                                id: this.breedNameCollections[gridview.id]
                                    .names[index].id,
                            },
                        });
                    } else {
                        this.$emit('clicked', {
                            image_id: image.id,
                            target: $event.target,
                        });
                    }
                }
            "
            @mouseover="this.$emit('hovered', image.id)"
        >
            <img :src="image.url" :alt="image.alt" class="grid__image br-20" />
            <div class="grid__overlay-breed">
                <div
                    v-if="breedNameCollections.length !== 0"
                    class="grid__overlay-breedtxt br-10"
                >
                    {{
                        this.breedNameCollections[gridview.id].names[index].name
                    }}
                </div>
                <div v-else-if="breedNameCollections.length === 0">
                    <slot name="hoverElem"></slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "UiGrid",
    data() {
        return {
            gridCollections: [],
            breedNameCollections: [],
        };
    },
    emits: ["clicked", "hovered"],
    methods: {
        divideGrid() {
            this.gridCollections = [];
            for (let i = 0; i < this.images.length; i += 5) {
                this.gridCollections.push({
                    images: this.images.slice(i, i + 5),
                    id: Math.floor(i / 5),
                });
            }
        },
        divideGridBreeds() {
            this.breedNameCollections = [];
            for (let i = 0; i < this.images.length; i += 5) {
                this.breedNameCollections.push({
                    names: this.breedNames.slice(i, i + 5),
                });
            }
        },
    },
    props: {
        images: Array,
        breedNames: Array,
    },
    created() {
        for (let i = 0; i < this.images.length; i += 5) {
            this.gridCollections.push({
                images: this.images.slice(i, i + 5),
                id: Math.floor(i / 5),
            });
        }

        if (this.breedNames) {
            for (let i = 0; i < this.breedNames.length; i += 5) {
                this.breedNameCollections.push({
                    names: this.breedNames.slice(i, i + 5),
                });
            }
        }
    },
    watch: {
        images() {
            this.divideGrid();
        },
        breedNames() {
            this.divideGridBreeds();
        },
    },
};
</script>

<style lang="scss" scoped>
.grid {
    display: grid;
    margin: 20px 0;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 15vh);

    gap: 20px;

    &__image {
        object-fit: cover;
        object-position: 50% 50%;
        width: 100%;
        height: 100%;
        transition: 0.5s ease;
    }

    &__element {
        position: relative;
        background-color: rgba(255, 134, 142, 1);
    }

    &__element:hover {
        cursor: pointer;
    }

    &__element:hover &__image {
        opacity: 0.4;
    }

    &__element:hover &__overlay-breed {
        opacity: 1;
    }

    &__element--forward:first-child {
        grid-row: 1 / 3;
    }

    &__element--forward:nth-of-type(5) {
        grid-row: 2 / 4;
        grid-column: 2 / 4;
    }

    &__element--reverse:first-child {
        grid-row: 2 / 4;
        grid-column: 1 / 3;
    }

    &__element--reverse:last-child {
        grid-row: 1 / 3;
    }

    &__overlay-breed {
        transition: 0.5s ease;
        opacity: 0;
    }

    &__overlay-breedtxt {
        background-color: white;
        color: $color-btn-pink;
        font-size: 1em;
        padding: 10px 0;
        position: absolute;
        left: 10px;
        right: 10px;
        bottom: 10px;
        text-align: center;
    }
    .dark-mode &__overlay-breedtxt {
        background-color: $color-background-soft-dark;
    }
}

@media only screen and (max-width: 500px) {
    .breadcrumbs {
        flex-wrap: wrap;
    }

    .grid {
        display: flex;
        flex-direction: column;

        &__overlay-breedtxt {
            // background-color: $color-background-soft-dark;
            color: $color-btn-pink;
            font-size: 1em;
            padding: 10px 0;
            position: absolute;
            left: 10px;
            right: 10px;
            bottom: 10px;
            text-align: center;
        }
    }

    .grid__element {
        max-height: 250px;
        gap: 20px;
        overflow: hidden;

        &__element:focus &__image {
            opacity: 0.4;
        }

        &__element:focus &__overlay-breed {
            opacity: 1;
        }

        &__overlay-breed {
            transition: 0.5s ease;
            opacity: 0;
        }
    }
}
</style>
