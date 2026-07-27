/* ============================================================
   GPnO SYSTEM
   Helper.js
   Version : 1.0
============================================================ */

/* ============================================================
   SHORTCUT
============================================================ */

function $(id) {

    return document.getElementById(id);

}

/* ============================================================
   SET TEXT
============================================================ */

function setText(id, value) {

    const el = $(id);

    if (!el) return;

    el.textContent = value;

}

/* ============================================================
   SET HTML
============================================================ */

function setHTML(id, html) {

    const el = $(id);

    if (!el) return;

    el.innerHTML = html;

}

/* ============================================================
   GET VALUE
============================================================ */

function getValue(id) {

    const el = $(id);

    if (!el) return "";

    return String(el.value).trim();

}

/* ============================================================
   SET VALUE
============================================================ */

function setValue(id, value) {

    const el = $(id);

    if (!el) return;

    el.value = value;

}

/* ============================================================
   CLEAR VALUE
============================================================ */

function clearValue(id) {

    const el = $(id);

    if (!el) return;

    el.value = "";

}

/* ============================================================
   ENABLE / DISABLE
============================================================ */

function setDisabled(id, disabled = true) {

    const el = $(id);

    if (!el) return;

    el.disabled = disabled;

}

/* ============================================================
   SHOW / HIDE
============================================================ */

function show(id) {

    const el = $(id);

    if (!el) return;

    el.classList.remove("d-none");

}

function hide(id) {

    const el = $(id);

    if (!el) return;

    el.classList.add("d-none");

}

/* ============================================================
   FORMAT MONEY
============================================================ */

function formatMoney(value) {

    value = Number(value || 0);

    return "RM " + value.toLocaleString(

        "ms-MY",

        {

            minimumFractionDigits: 2,

            maximumFractionDigits: 2

        }

    );

}

/* ============================================================
   FORMAT NUMBER
============================================================ */

function formatNumber(value) {

    value = Number(value || 0);

    return value.toLocaleString(

        "ms-MY"

    );

}

/* ============================================================
   ROUND 2 DECIMAL
============================================================ */

function round2(value) {

    return Math.round(

        Number(value || 0) * 100

    ) / 100;

}

/* ============================================================
   CONVERT TO NUMBER
============================================================ */

function toNumber(value) {

    if (

        value === null ||

        value === undefined ||

        value === ""

    ) {

        return 0;

    }

    return Number(

        String(value)

            .replace(/,/g, "")

            .replace("RM", "")

            .trim()

    ) || 0;

}

/* ============================================================
   TODAY DATE
============================================================ */

function today() {

    const d = new Date();

    return d.getFullYear()

        + "-"

        + String(

            d.getMonth() + 1

        ).padStart(2, "0")

        + "-"

        + String(

            d.getDate()

        ).padStart(2, "0");

}

/* ============================================================
   FORMAT DATE
============================================================ */

function formatDate(date) {

    if (!date) return "";

    const d = new Date(date);

    if (isNaN(d.getTime())) {

        return "";

    }

    return d.toLocaleDateString(

        "ms-MY",

        {

            day: "2-digit",

            month: "2-digit",

            year: "numeric"

        }

    );

}

/* ============================================================
   FORMAT DATETIME
============================================================ */

function formatDateTime(date) {

    if (!date) return "";

    const d = new Date(date);

    if (isNaN(d.getTime())) {

        return "";

    }

    return d.toLocaleString(

        "ms-MY"

    );

}

/* ============================================================
   CHECK EMPTY
============================================================ */

function isEmpty(value) {

    return (

        value === null ||

        value === undefined ||

        String(value).trim() === ""

    );

}

/* ============================================================
   SHOW LOADING
============================================================ */

function showLoading() {

    const loading = $("loadingOverlay");

    if (!loading) return;

    loading.classList.remove("d-none");

    loading.classList.add("d-flex");

}

/* ============================================================
   HIDE LOADING
============================================================ */

function hideLoading() {

    const loading = $("loadingOverlay");

    if (!loading) return;

    loading.classList.remove("d-flex");

    loading.classList.add("d-none");

}

/* ============================================================
   SUCCESS MESSAGE
============================================================ */

function showSuccess(message) {

    if (window.bootstrap && bootstrap.Toast) {

        console.log("SUCCESS :", message);

    }

    alert("✅ " + message);

}

/* ============================================================
   ERROR MESSAGE
============================================================ */

function showError(message) {

    console.error(message);

    alert("❌ " + message);

}

/* ============================================================
   WARNING MESSAGE
============================================================ */

function showWarning(message) {

    alert("⚠️ " + message);

}

/* ============================================================
   INFO MESSAGE
============================================================ */

function showInfo(message) {

    alert("ℹ️ " + message);

}

/* ============================================================
   CONFIRM
============================================================ */

function showConfirm(message) {

    return confirm(message);

}

/* ============================================================
   ASK DELETE
============================================================ */

function confirmDelete() {

    return showConfirm(

        "Adakah anda pasti mahu memadam rekod ini?"

    );

}

 /* ============================================================
   CLEAR TABLE
============================================================ */

function clearTable(tableID) {

    const tbody = $(tableID);

    if (!tbody) return;

    tbody.innerHTML = "";

}

/* ============================================================
   EMPTY TABLE
============================================================ */

function emptyTable(tableID, colspan = 1, message = "Tiada Rekod") {

    const tbody = $(tableID);

    if (!tbody) return;

    tbody.innerHTML = `

<tr>

<td colspan="${colspan}"

class="text-center text-muted py-4">

${message}

</td>

</tr>

`;

}

/* ============================================================
   CREATE OPTION
============================================================ */

function createOption(value, text) {

    const option = document.createElement("option");

    option.value = value;

    option.textContent = text;

    return option;

}

/* ============================================================
   FILL SELECT
============================================================ */

function fillSelect(id, data, valueField, textField, firstText = "-- Sila Pilih --") {

    const select = $(id);

    if (!select) return;

    select.innerHTML = "";

    select.appendChild(

        createOption("", firstText)

    );

    data.forEach(function(item){

        select.appendChild(

            createOption(

                item[valueField],

                item[textField]

            )

        );

    });

}

/* ============================================================
   SET SELECT VALUE
============================================================ */

function setSelectValue(id, value) {

    const select = $(id);

    if (!select) return;

    select.value = value;

}

/* ============================================================
   GET SELECT VALUE
============================================================ */

function getSelectValue(id) {

    const select = $(id);

    if (!select) return "";

    return select.value;

}

/* ============================================================
   STATUS BADGE
============================================================ */

function badgeStatus(status) {

    switch(String(status).toLowerCase()){

        case "aktif":

        case "active":

            return `<span class="badge bg-success">Aktif</span>`;

        case "tidak aktif":

        case "inactive":

            return `<span class="badge bg-secondary">Tidak Aktif</span>`;

        case "paid":

            return `<span class="badge bg-success">Paid</span>`;

        case "partial":

            return `<span class="badge bg-warning text-dark">Partial</span>`;

        case "unpaid":

            return `<span class="badge bg-danger">Unpaid</span>`;

        default:

            return `<span class="badge bg-light text-dark">${status}</span>`;

    }

}

/* ============================================================
   COPY TEXT
============================================================ */

async function copyText(text) {

    try {

        await navigator.clipboard.writeText(text);

        showSuccess("Berjaya disalin.");

    }

    catch (err) {

        showError("Gagal menyalin teks.");

    }

}

/* ============================================================
   DOWNLOAD FILE
============================================================ */

function downloadFile(url, filename = "") {

    const link = document.createElement("a");

    link.href = url;

    if (filename !== "") {

        link.download = filename;

    }

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

}

/* ============================================================
   RANDOM ID
============================================================ */

function randomID(prefix = "ID") {

    return prefix +

        "-" +

        Date.now() +

        "-" +

        Math.floor(

            Math.random() * 10000

        );

}

/* ============================================================
   UUID
============================================================ */

function uuid() {

    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx"

        .replace(/[xy]/g, function (c) {

            const r = Math.random() * 16 | 0;

            const v = c === "x"

                ? r

                : (r & 0x3 | 0x8);

            return v.toString(16);

        });

}

/* ============================================================
   DEBOUNCE
============================================================ */

function debounce(func, delay = 500) {

    let timer;

    return function () {

        const context = this;

        const args = arguments;

        clearTimeout(timer);

        timer = setTimeout(function () {

            func.apply(

                context,

                args

            );

        }, delay);

    };

}

/* ============================================================
   SLEEP
============================================================ */

function sleep(ms) {

    return new Promise(function(resolve){

        setTimeout(

            resolve,

            ms

        );

    });

}

/* ============================================================
   SCROLL TO TOP
============================================================ */

function scrollTopPage() {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}

/* ============================================================
   VERSION
============================================================ */

const APP = {

    name: "GPnO System",

    version: "3.1"

};

/* ============================================================
   END Helper.js
============================================================ */
