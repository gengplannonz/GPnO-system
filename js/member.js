/* ==========================================
   GENG PLAN & ONZ
   MEMBER.JS
========================================== */

let members = [];

let selectedID = "";

const tbody = document.getElementById("memberTable");

const txtSearch = document.getElementById("txtSearch");

const modal = document.getElementById("memberModal");

const deleteModal = document.getElementById("deleteModal");

const btnAdd = document.getElementById("btnAdd");

const btnSave = document.getElementById("btnSave");

const btnCancel = document.getElementById("btnCancel");

const btnDeleteYes = document.getElementById("btnDeleteYes");

const btnDeleteCancel = document.getElementById("btnDeleteCancel");

const closeModal = document.getElementById("closeModal");

const loading = document.getElementById("loading");

const memberID = document.getElementById("memberID");

const txtNama = document.getElementById("txtNama");

const txtTelefon = document.getElementById("txtTelefon");

const txtProgram = document.getElementById("txtProgram");

const txtJumlah = document.getElementById("txtJumlah");

const modalTitle = document.getElementById("modalTitle");

/* ==========================================
   START
========================================== */

window.onload = () => {

    loadMembers();

}

/* ==========================================
   LOADING
========================================== */

function showLoading(){

    loading.style.display="flex";

}

function hideLoading(){

    loading.style.display="none";

}
