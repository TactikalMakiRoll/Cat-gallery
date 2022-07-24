// ce06a464-20f1-4c46-8c30-abb97ec14310
import axios from "axios";

axios.defaults.headers.common["x-api-key"] =
    "ce06a464-20f1-4c46-8c30-abb97ec14310"; //my API key

async function getRandomImage() {
    try {
        let response = await axios.get(
            "https://api.thecatapi.com/v1/images/search",
            { params: { limit: 1, size: "full" } }
        );
        // Ask for 1 Image, at full resolution
        let image = response.data[0]; // the response is an Array, so just use the first item as the Image

        return image;
    } catch (err) {
        console.log(err);
    }
}

async function voteUp(imageId) {
    try {
        let body = {
            image_id: imageId,
            sub_id: "MakiRoll",
            value: 1, // Voting up (you like it) so send 1
        };
        axios.post("https://api.thecatapi.com/v1/votes", body); // Send the body to create a Vote in your Account
    } catch (err) {
        console.log(err);
    }
}

async function voteDown(imageId) {
    try {
        let body = {
            image_id: imageId,
            sub_id: "MakiRoll",
            value: 0, // Voting down (you don't like) so send 0
        };
        axios.post("https://api.thecatapi.com/v1/votes", body); // Send the body to create a Vote in your Account
    } catch (err) {
        console.log(err);
    }
}

function getLogs() {
    let userLogs = JSON.parse(localStorage.getItem("userLogs")) || [];
    return userLogs;
}

function sendLogs(log) {
    let userLogs = getLogs();

    userLogs.push(log);
    if (userLogs.length > 4) {
        userLogs.shift();
    }

    localStorage.setItem("userLogs", JSON.stringify(userLogs));
}

export { getRandomImage, voteUp, voteDown, getLogs, sendLogs };
