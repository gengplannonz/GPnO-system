/* ============================================================
   GPnO SYSTEM
   Dashboard.js
============================================================ */

/* ============================================================
   GLOBAL VARIABLE
============================================================ */

let dashboardData = {};

let dashboardProgram = [];

let latestPayment = [];

/* ============================================================
   INITIALIZE
============================================================ */

document.addEventListener(

    "DOMContentLoaded",

    async function () {

        await loadDashboard();

    }

);

/* ============================================================
   LOAD DASHBOARD
============================================================ */

async function loadDashboard() {

    const result = await apiGet(

        "getDashboard"

    );

    if (result.status !== "success") {

        return;

    }

    dashboardData = result.data || {};

    renderDashboard();
  
  await loadProgramDashboard();

  await loadLatestPayment();

}

/* ============================================================
   REFRESH DASHBOARD
============================================================ */

async function refreshDashboard() {

    await loadDashboard();

}

/* ============================================================
   AUTO REFRESH
============================================================ */

let dashboardTimer = null;

function startDashboardRefresh() {

    stopDashboardRefresh();

    dashboardTimer = setInterval(

        refreshDashboard,

        60000

    );

}

function stopDashboardRefresh() {

    if (dashboardTimer) {

        clearInterval(

            dashboardTimer

        );

        dashboardTimer = null;

    }

}

/* ============================================================
   RENDER DASHBOARD
============================================================ */

function renderDashboard() {

    renderSummaryCard();

    renderStatisticCard();

    renderCollectionCard();

    renderPaymentCard();

}

/* ============================================================
   SUMMARY CARD
============================================================ */

function renderSummaryCard() {

    setText(

        "totalMember",

        dashboardData.totalMember || 0

    );

    setText(

        "activeMember",

        dashboardData.activeMember || 0

    );

    setText(

        "totalProgram",

        dashboardData.totalProgram || 0

    );

    setText(

        "activeProgram",

        dashboardData.activeProgram || 0

    );

}

/* ============================================================
   COLLECTION CARD
============================================================ */

function renderCollectionCard() {

    setText(

        "budgetNeed",

        formatMoney(

            dashboardData.totalBudget || 0

        )

    );

    setText(

        "budgetCollected",

        formatMoney(

            dashboardData.totalCollected || 0

        )

    );

    setText(

        "budgetOutstanding",

        formatMoney(

            dashboardData.totalOutstanding || 0

        )

    );

    setText(

        "collectionPercent",

        (dashboardData.collectionPercent || 0)

        + "%"

    );

}

/* ============================================================
   PAYMENT STATISTIC
============================================================ */

function renderPaymentCard() {

    setText(

        "paidMember",

        dashboardData.totalPaid || 0

    );

    setText(

        "partialMember",

        dashboardData.totalPartial || 0

    );

    setText(

        "unpaidMember",

        dashboardData.totalUnpaid || 0

    );

}

/* ============================================================
   DASHBOARD STATISTIC
============================================================ */

function renderStatisticCard() {

    if (

        typeof renderChart !== "function"

    ) {

        return;

    }

    renderChart(

        dashboardData

    );

}

/* ============================================================
   LOAD PROGRAM DASHBOARD
============================================================ */

async function loadProgramDashboard() {

    const result = await apiGet(

        "getProgramDashboard"

    );

    if (result.status !== "success") {

        return;

    }

    dashboardProgram = result.data || [];

    renderProgramDashboard();

}

/* ============================================================
   LOAD LATEST PAYMENT
============================================================ */

async function loadLatestPayment() {

    const result = await apiGet(

        "getLatestPayment",

        {

            limit: 10

        }

    );

    if (result.status !== "success") {

        return;

    }

    latestPayment = result.data || [];

    renderLatestPayment();

}

/* ============================================================
   RENDER PROGRAM LIST
============================================================ */

function renderProgramDashboard() {

    const tbody = document.getElementById(

        "programDashboardBody"

    );

    if (!tbody) {

        return;

    }

    tbody.innerHTML = "";

    dashboardProgram.forEach(function (item) {

        tbody.innerHTML += `

<tr>

<td>${item.programName}</td>

<td class="text-end">${formatMoney(item.totalBudget)}</td>

<td class="text-end">${formatMoney(item.totalCollected)}</td>

<td class="text-end">${formatMoney(item.totalOutstanding)}</td>

<td class="text-center">${item.collectionPercent}%</td>

</tr>

`;

    });

}

/* ============================================================
   RENDER LATEST PAYMENT
============================================================ */

function renderLatestPayment() {

    const tbody = document.getElementById(

        "latestPaymentBody"

    );

    if (!tbody) {

        return;

    }

    tbody.innerHTML = "";

    latestPayment.forEach(function (item) {

        tbody.innerHTML += `

<tr>

<td>${item.paymentDate}</td>

<td>${item.memberName}</td>

<td>${item.programName}</td>

<td class="text-end">${formatMoney(item.amount)}</td>

</tr>

`;

    });

}

/* ============================================================
   REFRESH BUTTON
============================================================ */

async function refreshDashboardData() {

    await loadDashboard();

}

/* ============================================================
   EXPORT DASHBOARD
============================================================ */

function exportDashboard() {

    window.open(

        API +

        "?action=exportDashboard",

        "_blank"

    );

}

/* ============================================================
   CALCULATE PROGRESS
============================================================ */

function calculateProgress(total, collected) {

    total = Number(total || 0);

    collected = Number(collected || 0);

    if (total <= 0) {

        return 0;

    }

    let percent = Math.round(

        (collected / total) * 100

    );

    if (percent > 100) {

        percent = 100;

    }

    if (percent < 0) {

        percent = 0;

    }

    return percent;

}

/* ============================================================
   UPDATE PROGRESS BAR
============================================================ */

function updateProgressBar(id, total, collected) {

    const bar = document.getElementById(id);

    if (!bar) {

        return;

    }

    const percent = calculateProgress(

        total,

        collected

    );

    bar.style.width = percent + "%";

    bar.innerHTML = percent + "%";

    bar.setAttribute(

        "aria-valuenow",

        percent

    );

}

/* ============================================================
   OPEN PROGRAM
============================================================ */

function openProgram(programID) {

    location.href =

        "program-member.html?id=" +

        encodeURIComponent(programID);

}

/* ============================================================
   DASHBOARD READY
============================================================ */

async function dashboardReady() {

    await loadDashboard();

    // Aktifkan jika mahu auto refresh
    // startDashboardRefresh();

}

/* ============================================================
   WINDOW LOAD
============================================================ */

window.addEventListener(

    "load",

    dashboardReady

);
