<template>
    <div>
        <UiFilters></UiFilters>
        <div class="voting-view app-screen">
            <UiBreadcrumbs></UiBreadcrumbs>
            <div class="voting-view__vote">
                <div class="voting-view__image-container">
                    <img
                        v-if="imageLoaded === false"
                        src="@/assets/icons/spinner.png"
                        alt="Loading..."
                        class="spinner"
                    />
                    <img
                        v-else
                        class="voting-view__image br-20"
                        :src="this.image.url"
                        alt="Candidate cat"
                    />
                </div>
                <div class="voting-view__vote-buttons">
                    <button
                        class="voting-view__vote-button voting-view__vote-button--like"
                        @mouseover="likeHover = true"
                        @mouseleave="likeHover = false"
                        @click="likeImage()"
                    >
                        <img
                            :src="likeIcon"
                            alt="Like this image"
                            class="voting-view__vote-btn-icon"
                        />
                    </button>
                    <button
                        class="voting-view__vote-button voting-view__vote-button--favorite"
                        @mouseover="favHover = true"
                        @mouseleave="favHover = false"
                        @click="toggleFavourite()"
                    >
                        <img
                            :src="favIcon"
                            alt="Add to favourites"
                            class="voting-view__vote-btn-icon"
                        />
                    </button>
                    <button
                        class="voting-view__vote-button voting-view__vote-button--dislike"
                        @mouseover="dislikeHover = true"
                        @mouseleave="dislikeHover = false"
                        @click="dislikeImage()"
                    >
                        <img
                            :src="dislikeIcon"
                            alt="Like this image"
                            class="voting-view__vote-btn-icon"
                        />
                    </button>
                </div>
                <div class="user-logs">
                    <transition-group name="list">
                        <div
                            v-for="log in userLogs"
                            :key="log.imageID"
                            class="user-logs__log br-10"
                        >
                            <div class="user-logs__time br-5">
                                {{ log.time }}
                            </div>
                            <p>
                                Image ID:
                                <span class="user-logs__image-id">{{
                                    log.imageID
                                }}</span>
                                {{ log.text }}
                            </p>
                            <img
                                class="user-logs__icon"
                                :src="chooseLogIcon(log.icon)"
                            />
                        </div>
                    </transition-group>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {
    getRandomImage,
    voteUp,
    voteDown,
    getLogs,
    sendLogs,
} from "../api/votingAPI.js";
import { addToFavourites, removeLatestFromFavourites } from "../api/catAPI.js";

export default {
    data() {
        return {
            image: null,
            imageLoaded: false,
            processingFavourite: false,

            likeIconStandart: require("@/assets/icons/like-white-30.svg"),
            likeIconHover: require("@/assets/icons/like-30.svg"),
            favIconStandart: require("@/assets/icons/fav-white-30.svg"),
            favIconHover: require("@/assets/icons/fav-30.svg"),
            dislikeIconStandart: require("@/assets/icons/dislike-white-30.svg"),
            dislikeIconHover: require("@/assets/icons/dislike-30.svg"),

            likeHover: false,
            favHover: false,
            dislikeHover: false,

            inFavourites: false,
            favIconActive: require("@/assets/icons/fav-full-white-30.svg"),
            favIconActiveHover: require("@/assets/icons/fav-color-30.svg"),

            likeIconColor: require("@/assets/icons/like-color-30.svg"),
            dislikeIconColor: require("@/assets/icons/dislike-color-30.svg"),

            userLogs: [],
        };
    },
    methods: {
        async loadImage() {
            this.image = await getRandomImage();
            this.imageLoaded = true;
        },
        chooseLogIcon(icon) {
            if (icon === "fav") {
                return this.favIconHover;
            }
            return icon === "like" ? this.likeIconColor : this.dislikeIconColor;
        },
        likeImage() {
            voteUp(this.image.id);
            this.imageLoaded = false;
            sendLogs(this.createUserLog("was added to Likes", "like"));

            this.userLogs = getLogs().reverse();
            this.$emit("addToLikes", this.image);
            this.loadImage();
        },
        dislikeImage() {
            voteDown(this.image.id);
            this.imageLoaded = false;
            sendLogs(this.createUserLog("was added to Dislikes", "dislike"));

            this.userLogs = getLogs().reverse();
            this.$emit("addToDislikes", this.image);
            this.loadImage();
        },
        async favourImage() {
            this.processingFavourite = true;
            await addToFavourites(this.image.id);
            this.processingFavourite = false;

            this.inFavourites = true;
            sendLogs(this.createUserLog("was added to Favourites", "fav"));

            this.userLogs = getLogs().reverse();
        },
        async unfavourImage() {
            this.processingFavourite = true;
            await removeLatestFromFavourites();
            this.processingFavourite = false;

            this.inFavourites = false;
            sendLogs(this.createUserLog("was removed from Favourites", null));

            this.userLogs = getLogs().reverse();
        },
        toggleFavourite() {
            !this.inFavourites ? this.favourImage() : this.unfavourImage();
        },
        createUserLog(actionText, actionIcon) {
            let localTime = new Date();
            let hours =
                (localTime.getHours() < 10 ? "0" : "") + localTime.getHours();
            let minutes =
                (localTime.getMinutes() < 10 ? "0" : "") +
                localTime.getMinutes();
            let miliseconds =
                (localTime.getMilliseconds() < 10 ? "0" : "") +
                localTime.getMilliseconds();
            let log = {
                id: this.image.id + hours + minutes + miliseconds,
                imageID: this.image.id,
                time: hours + ":" + minutes,
                text: actionText,
                icon: actionIcon,
            };
            return log;
        },
    },
    created() {
        this.loadImage();
        this.userLogs = getLogs().reverse();
    },
    computed: {
        likeIcon() {
            return this.likeHover ? this.likeIconHover : this.likeIconStandart;
        },
        favIcon() {
            if (this.inFavourites && !this.favHover) {
                return this.favIconActive;
            } else if (this.inFavourites && this.favHover) {
                return this.favIconActiveHover;
            }
            return this.favHover ? this.favIconHover : this.favIconStandart;
        },
        dislikeIcon() {
            return this.dislikeHover
                ? this.dislikeIconHover
                : this.dislikeIconStandart;
        },
    },
    watch: {
        image() {
            this.likeHover = false;
            this.favHover = false;
            this.dislikeHover = false;
        },
    },
};
</script>

<style lang="scss" scoped>
.voting-view {
    max-height: calc(100vh - 8rem);

    .dark-mode & {
        background-color: $color-background-soft-dark;
    }

    &__vote {
        margin-top: 1.25rem;
        width: 100%;
    }

    &__image {
        max-width: 100%;
        min-height: 360px;
        max-height: 500px;
        display: block;
        margin: 0 auto 0 auto;
        object-fit: scale-down;
    }

    &__image-container {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 360px;
    }

    &__vote-buttons {
        position: relative;
        transform: translateY(-50%);
        text-align: center;
    }

    &__vote-button {
        padding: 1.5625rem;
        border: 4px white solid;
    }

    .dark-mode &__vote-button {
        border-color: $color-background-soft-dark;
    }

    &__vote-button--like {
        background-color: $color-btn-green;
        border-top-left-radius: 20px;
        border-bottom-left-radius: 20px;
    }

    .dark-mode &__vote-button--like {
        // border-right-color: white;
    }

    &__vote-button--like:hover {
        background-color: $color-btn-green-light;
    }

    &__vote-button--favorite {
        background-color: $color-btn-pink;
        border-left: none;
        border-right: none;
        // margin:0 4px;
    }

    &__vote-button--favorite:hover {
        background-color: $color-btn-pink-light;
    }

    &__vote-button--dislike {
        background-color: $color-btn-yellow;
        border-top-right-radius: 20px;
        border-bottom-right-radius: 20px;
    }

    .dark-mode &__vote-button--dislike {
        // border-left-color: white;
    }

    &__vote-button--dislike:hover {
        background-color: $color-btn-yellow-light;
    }
}

.user-logs {
    &__log {
        display: flex;
        align-items: center;
        margin-top: 0.625rem;
        padding: 0.9375rem;
        background-color: $color-background-main;
        font-weight: $font-weight-regular;
    }

    .dark-mode &__log {
        background-color: $color-background-additional-dark;
        color: $color-text-accent;
    }

    &__time {
        padding: 0.625rem;
        margin-right: 1.25rem;
        background-color: $color-background-additional;
    }
    .dark-mode &__time {
        background-color: $color-background-main-dark;
    }

    &__image-id {
        font-weight: $font-weight-bold;
    }

    &__icon {
        margin-left: auto;
        width: 20px;
    }
}

.list-enter-active {
    transition: all 0.5s ease;
}
.list-leave-active {
    transition: all 0.2s ease;
}
.list-enter-from,
.list-leave-to {
    opacity: 0;
    transform: translateX(100px);
}
</style>
