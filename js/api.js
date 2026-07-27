/* ============================================================
   GPnO SYSTEM
   API Manager
   Version : 1.0
============================================================ */

/* ============================================================
   GOOGLE APPS SCRIPT API
============================================================ */

const API = "https://script.google.com/macros/s/AKfycbyl4Jg1MREjbkaz-iZ4XdwLZxnQgpQGpfsN1BnWtZnoME4xl1DjZtp9K5vWWopQOt_j/exec";

/* ============================================================
   DEFAULT FETCH OPTION
============================================================ */

const API_OPTION = {

    method: "GET",

    cache: "no-cache"

};

/* ============================================================
   BUILD URL
============================================================ */

function buildURL(action, params = {}) {

    const url = new URL(API);

    url.searchParams.append("action", action);

    Object.keys(params).forEach(key => {

        if (
            params[key] !== undefined &&
            params[key] !== null &&
            params[key] !== ""
        ) {

            url.searchParams.append(

                key,

                params[key]

            );

        }

    });

    return url.toString();

}

/* ============================================================
   CHECK API RESPONSE
============================================================ */

function checkResponse(result) {

    if (!result) {

        throw new Error("Server tidak memberi respon.");

    }

    if (result.status === "error") {

        throw new Error(result.message);

    }

    return result;

}

/* ============================================================
   GET REQUEST
============================================================ */

async function apiGet(action, params = {}) {

    try {

        const url = buildURL(

            action,

            params

        );

       apiLoading(true);

const response = await fetchTimeout(
    url,
    API_OPTION
);

apiLoading(false);

        if (!response.ok) {

            throw new Error(

                "HTTP Error : " +

                response.status

            );

        }

        const result = await response.json();

        return checkResponse(result);

    }

    catch (err) {

        console.error(

            err

        );

       apiLoading(false);

return apiError(err);

    }

}

/* ============================================================
   POST REQUEST
============================================================ */

async function apiPost(action, data = {}) {

    try {

        const form = new URLSearchParams();

        form.append(

            "action",

            action

        );

        Object.keys(data).forEach(function (key) {

            if (

                data[key] !== undefined &&

                data[key] !== null

            ) {

                form.append(

                    key,

                    data[key]

                );

            }

        });

        apiLoading(true);

        const response = await fetchTimeout(
            API,

            {

                method: "POST",

                body: form

            }

        );

        if (!response.ok) {

            throw new Error(

                "HTTP Error : " +

                response.status

            );

        }

        const result = await response.json();

        return checkResponse(result);

    }

    catch (err) {

        apiLoading(false);

return apiError(err);
        return {

            status: "error",

            message: err.message

        };

    }

}

/* ============================================================
   REQUEST TIMEOUT
============================================================ */

const API_TIMEOUT = 30000;

/* ============================================================
   FETCH WITH TIMEOUT
============================================================ */

async function fetchTimeout(url, option = {}) {

    const controller = new AbortController();

    const timer = setTimeout(function () {

        controller.abort();

    }, API_TIMEOUT);

    try {

        const response = await fetch(

            url,

            {

                ...option,

                signal: controller.signal

            }

        );

        clearTimeout(timer);

        return response;

    }

    catch (err) {

        clearTimeout(timer);

        throw err;

    }

}

/* ============================================================
   SHOW LOADING
============================================================ */

function apiLoading(show = true) {

    if (typeof showLoading === "function") {

        if (show) {

            showLoading();

        } else {

            hideLoading();

        }

    }

}

/* ============================================================
   API ERROR
============================================================ */

function apiError(err) {

    console.error(err);

    let message = "Ralat tidak diketahui.";

    if (typeof err === "string") {

        message = err;

    }

    else if (err.message) {

        message = err.message;

    }

    if (message.includes("Failed to fetch")) {

        message = "Tidak dapat sambung ke Google Apps Script.";

    }

    if (message.includes("abort")) {

        message = "Server mengambil masa terlalu lama.";

    }

    alert(message);

    return {

        status: "error",

        message: message

    };

}

/* ============================================================
   RELOAD CURRENT PAGE DATA
============================================================ */

async function reloadCurrentPage() {

    if (typeof loadDashboard === "function") {

        await loadDashboard();

        return;

    }

    if (typeof loadMembers === "function") {

        await loadMembers();

        return;

    }

    if (typeof loadPrograms === "function") {

        await loadPrograms();

        return;

    }

    if (typeof loadPayments === "function") {

        await loadPayments();

        return;

    }

    if (typeof loadReport === "function") {

        await loadReport();

        return;

    }

    if (typeof loadSettings === "function") {

        await loadSettings();

        return;

    }

}

