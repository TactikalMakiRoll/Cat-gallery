import axios from "axios";

axios.defaults.headers.common["x-api-key"] =
    "ce06a464-20f1-4c46-8c30-abb97ec14310"; //my API key

let breedsSaved;

async function getBreedsList() {
    try {
        let response = await axios.get("https://api.thecatapi.com/v1/breeds");
        let breedList = response.data;
        breedsSaved = breedList;

        return breedList;
    } catch (err) {
        console.log(err);
    }
}

async function getBreed(id) {
    try {
        if (breedsSaved === undefined) {
            await getBreedsList();
        }

        let neededBreed = breedsSaved.find((elem) => {
            return elem.id === id;
        });

        let response = await axios.get(
            `https://api.thecatapi.com/v1/breeds/search?q=${neededBreed.name}`
        );
        let breed = response.data;

        return breed;
    } catch (err) {
        console.log(err);
    }
}

export { getBreedsList, getBreed };
