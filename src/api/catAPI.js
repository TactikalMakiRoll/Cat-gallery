import axios from "axios";

let latestAddedFavorite = "";

axios.defaults.headers.common["x-api-key"] =
    "ce06a464-20f1-4c46-8c30-abb97ec14310"; //my API key

async function addToFavourites(imageId) {
    try {
        let body = {
            image_id: imageId,
        };
        let response = await axios.post(
            "https://api.thecatapi.com/v1/favourites",
            body
        );
        // Send the body to create a Vote in your Account
        latestAddedFavorite = response.data.id;
        return response;
    } catch (err) {
        console.log(err);
    }
}

async function getFavourites() {
    try {
        let response = await axios.get(
            "https://api.thecatapi.com/v1/favourites"
        );
        return response.data;
    } catch (err) {
        console.log(err);
    }
}

async function removeFromFavourites(favId) {
    try {
        let response = await axios.delete(
            "https://api.thecatapi.com/v1/favourites/" + favId
        ); // Send the body to create a Vote in your Account
        return response.data;
    } catch (err) {
        console.log(err);
    }
}
async function removeLatestFromFavourites() {
    try {
        if (latestAddedFavorite === undefined) {
            let favourites = getFavourites();
            latestAddedFavorite = favourites[favourites.length - 1].id;
        }
        //first we want to get that specific favourite
        let response = removeFromFavourites(latestAddedFavorite);
        return response.data;
    } catch (err) {
        console.log(err);
    }
}

async function getBreedImages(breedId) {
    try {
        let response = await axios.get(
            `https://api.thecatapi.com/v1/images/search?breed_id=${breedId}&limit=5`
        );
        return response.data;
    } catch (err) {
        console.log(err);
    }
}

async function getGalleryImages(order, imageType, breedId = "", page) {
    try {
        let response = await axios.get(
            `https://api.thecatapi.com/v1/images/search?size=full&order=${order}&mime_types=${imageType}&limit=100&page=${page}&breed_id=${breedId}`
        );
        return response.data;
    } catch (err) {
        console.log(err);
    }
}

async function uploadImage(imageFile) {
    try {
        let imagebody = {
            file: imageFile,
        };

        let config = {
            body: imagebody,
            header: {
                "Content-Type": "multipart/form-data",
                "Access-Control-Allow-Origin": "*",
            },
        };
        let response = await axios.post(
            "https://api.thecatapi.com/v1/images/upload",
            config
        );

        return response;
    } catch (err) {
        console.log(err);
    }
}

async function getVotes(page) {
    try {
        // let body = {
        //     sub_id: "MakiRoll",
        //     limit: 100,
        //     page: page,
        // };
        let response = await axios.get(
            `https://api.thecatapi.com/v1/votes?sub_id=MakiRoll&limit=100&page=${page}`
        );
        return response.data;
    } catch (err) {
        console.log(err);
    }
}

async function loadImage(imageId) {
    try {
        let response = await axios.post(
            "https://api.thecatapi.com/v1/images/" + imageId
        );
        return response.data;
    } catch (err) {
        console.log(err);
    }
}

export {
    addToFavourites,
    removeFromFavourites,
    removeLatestFromFavourites,
    getFavourites,
    getBreedImages,
    getGalleryImages,
    uploadImage,
    getVotes,
    loadImage,
};
