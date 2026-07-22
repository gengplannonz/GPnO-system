/* =====================================================
   GENG PLAN & ONZ
   app.js
===================================================== */

const sidebar = document.getElementById("sidebar");
const frame = document.getElementById("mainFrame");
const pageTitle = document.getElementById("pageTitle");

/* ==========================================
      BUKA / TUTUP SIDEBAR
========================================== */

function toggleMenu() {

    sidebar.classList.toggle("show");

}

/* ==========================================
      TUKAR PAGE
========================================== */

function loadPage(page, menu) {

    frame.src = page;

    document.querySelectorAll(".sidebar a").forEach(item => {

        item.classList.remove("active");

    });

    menu.classList.add("active");

    if (pageTitle) {

        pageTitle.innerHTML = menu.innerText.trim();

    }

    if (window.innerWidth <= 768) {

        sidebar.classList.remove("show");

    }

}

/* ==========================================
      AUTO TUTUP SIDEBAR BILA BESAR
========================================== */

window.addEventListener("resize", function () {

    if (window.innerWidth > 768) {

        sidebar.classList.remove("show");

    }

});

/* ==========================================
      CLICK LUAR SIDEBAR
========================================== */

document.addEventListener("click", function (e) {

    if (window.innerWidth > 768) return;

    const menuBtn = document.querySelector(".menuBtn");

    if (
        !sidebar.contains(e.target) &&
        !menuBtn.contains(e.target)
    ) {

        sidebar.classList.remove("show");

    }

});

/* ==========================================
      ESC KEY
========================================== */

document.addEventListener("keydown", function (e) {

    if (e.key === "Escape") {

        sidebar.classList.remove("show");

    }

});

/* ==========================================
      LOAD DEFAULT
========================================== */

window.onload = function () {

    frame.src = "pages/dashboard.html";

};

/* ==========================================
      LOGOUT
========================================== */

function logout() {

    if (confirm("Adakah anda pasti ingin keluar?")) {

        location.reload();

    }

}

/* ==========================================
      DATE & TIME
========================================== */

function currentDateTime() {

    const now = new Date();

    return now.toLocaleString("ms-MY");

}

/* ==========================================
      NOTIFICATION
========================================== */

function notify(msg) {

    alert(msg);

}

/* ==========================================
      FORMAT RM
========================================== */

function money(value) {

    return "RM " + Number(value).toLocaleString("ms-MY", {

        minimumFractionDigits:2,
        maximumFractionDigits:2

    });

}

/* ==========================================
      LOADING
========================================== */

function showLoading() {

    console.log("Loading...");

}

function hideLoading() {

    console.log("Done.");

}

/* ==========================================
      API URL
========================================== */

/*
Masukkan URL Google Apps Script nanti.

Contoh

const API="https://script.google.com/macros/s/AKfycbxxxxxxxxxxxxxxxx/exec";

*/

const API = "";

/* ==========================================
      FETCH GET
========================================== */

async function getData(action) {

    try {

        let res = await fetch(API + "?action=" + action);

        return await res.json();

    }

    catch (err) {

        console.log(err);

    }

}

/* ==========================================
      FETCH POST
========================================== */

async function postData(data) {

    try {

        let res = await fetch(API, {

            method: "POST",

            body: JSON.stringify(data)

        });

        return await res.json();

    }

    catch (err) {

        console.log(err);

    }

}
