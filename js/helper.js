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
