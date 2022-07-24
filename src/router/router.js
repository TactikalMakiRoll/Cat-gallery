import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: "/home",
        name: "Home",
        component: () => import("@/pages/Home.vue"),
        children:[
            {
                path: "/voting",
                name: "Voting",
                component: () => import("@/pages/CatVoting.vue"),
            },
            {
                path: "/breeds",
                name: "Breeds",
                component: () => import("@/pages/CatBreeds.vue"),
            },
            {
                path: "/breeds/:id",
                name: "BreedDetail",
                component: () => import("@/pages/BreedDetails.vue"),
            },
            {
                path: "/gallery",
                name: "Gallery",
                component: () => import("@/pages/CatGallery.vue"),
            },
            {
                path: "/search/:name",
                name: "Search",
                component: () => import("@/pages/CatSearch.vue"),
            },
            {
                path: "/favourites",
                name: "Favourites",
                component: () => import("@/pages/CatFavourites.vue"),
            },
            {
                path: "/liked",
                name: "Liked",
                component: () => import("@/pages/CatLiked.vue"),
            },
            {
                path: "/dislikes",
                name: "Dislikes",
                component: () => import("@/pages/CatDislikes.vue"),
            },
        ]
    },
    { 
        path: '/', 
        redirect: '/home', 
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
