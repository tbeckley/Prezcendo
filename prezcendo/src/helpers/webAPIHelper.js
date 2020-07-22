import * as R from "ramda";

const WEB_API_URL = "http://localhost:5000";

const COMMON_HEADERS = {
    "Access-Control-Allow-Origin": "*"
};

// #region WEB FUNCTIONS

export async function getFromApi(endpoint, params) {
    return await fetch(`${WEB_API_URL}/${endpoint}`, {
        headers: {
            "content-type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        params,
        method: "GET"
    });
}

export async function postToApi(endpoint, data) {
    return await fetch(`${WEB_API_URL}/${endpoint}`, {
        headers: {
            "content-type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify(data),
        method: "POST"
    });
}

export async function sendFileToApi(endpoint, fileData, mimeType="audio/midi") {
    return await fetch(`${WEB_API_URL}/${endpoint}`, {
        headers: {
            "Content-Type": mimeType,
        },
        body: fileData,
        method: "POST"
    });
}

export async function multipartToApi(endpoint, paramsDict, midisDict) {
    var form = new FormData();

    let Z = R; //eslint-disable-line

    // Parameters
    R.map(p => form.append(p[0], p[1]), R.toPairs(paramsDict));

    // Files
    R.map(p => form.append(p[0], new Blob([p[1]], { type: "audio/midi" })), R.toPairs(midisDict));

    return await fetch(`${WEB_API_URL}/${endpoint}`, {
        headers: {
            ...COMMON_HEADERS
        },
        body: form,
        method: "POST"
    });
}

// #endregion WEB FUNCTIONS

// #region LOGIC
// #endregion LOGIC
