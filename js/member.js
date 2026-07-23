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

/* ==========================================
   LOAD MEMBERS FROM GOOGLE APPS SCRIPT
========================================== */

async function loadMembers() {

    showLoading();

    try {

        const response = await fetch(API + "?action=getMembers");

        const result = await response.json();

        if(result.status=="success"){

            members=result.data;

            renderTable(members);

        }else{

            alert(result.message);

        }

    }
    catch(err){

        console.log(err);

        alert("Tidak dapat sambung ke Server.");

    }

    hideLoading();

}

/* ==========================================
   RELOAD DATA
========================================== */

async function refreshMembers(){

    await loadMembers();

}

/* ==========================================
   FORMAT RM
========================================== */

function money(value){

    value=Number(value);

    return "RM " + value.toLocaleString("ms-MY",{

        minimumFractionDigits:2,

        maximumFractionDigits:2

    });

}

/* ==========================================
   STATUS CLASS
========================================== */

function getStatusClass(status){

    switch(status){

        case "Paid":

            return "status-paid";

        case "Partial":

            return "status-partial";

        default:

            return "status-unpaid";

    }

}
/* ==========================================
   RENDER MEMBER TABLE
========================================== */

function renderTable(data){

    tbody.innerHTML="";

    if(data.length==0){

        tbody.innerHTML=`
        <tr>
            <td colspan="9" class="empty">
                Tiada rekod dijumpai
            </td>
        </tr>
        `;

        return;

    }

    data.forEach(member=>{

        let baki = Number(member.baki);

        if(isNaN(baki)){

            baki = Number(member.jumlah) - Number(member.bayar);

        }

        let status = member.status;

        if(!status){

            if(baki<=0){

                status="Paid";

            }else if(Number(member.bayar)>0){

                status="Partial";

            }else{

                status="Belum";

            }

        }

        tbody.innerHTML += `

        <tr>

            <td>${member.id}</td>

            <td>${member.nama}</td>

            <td>${member.telefon}</td>

            <td>${member.program}</td>

            <td>${money(member.jumlah)}</td>

            <td>${money(member.bayar)}</td>

            <td>${money(baki)}</td>

            <td>

                <span class="${getStatusClass(status)}">

                    ${status}

                </span>

            </td>

            <td>

                <button
                    class="edit"
                    onclick="editMember('${member.id}')">

                    Edit

                </button>

                <button
                    class="delete"
                    onclick="deleteMember('${member.id}')">

                    Padam

                </button>

            </td>

        </tr>

        `;

    });

}

/* ==========================================
   FIND MEMBER
========================================== */

function getMemberByID(id){

    return members.find(x=>x.id==id);

}

/* ==========================================
   CLEAR FORM
========================================== */

function clearForm(){

    memberID.value="";

    txtNama.value="";

    txtTelefon.value="";

    txtProgram.value="";

    txtJumlah.value="";

}

/* ==========================================
   OPEN MODAL
========================================== */

function openModal(title){

    modalTitle.innerHTML=title;

    modal.style.display="flex";

}

/* ==========================================
   CLOSE MODAL
========================================== */

function closeMemberModal(){

    modal.style.display="none";

    clearForm();

}

/* ==========================================
   BUTTON EVENT
========================================== */

btnAdd.onclick=function(){

    selectedID="";

    clearForm();

    openModal("Tambah Ahli");

}

btnCancel.onclick=closeMemberModal;

closeModal.onclick=closeMemberModal;

/* ==========================================
   CLOSE WHEN CLICK BACKGROUND
========================================== */

window.onclick=function(e){

    if(e.target==modal){

        closeMemberModal();

    }

    if(e.target==deleteModal){

        deleteModal.style.display="none";

    }

}
/* ==========================================
   LIVE SEARCH
========================================== */

txtSearch.addEventListener("keyup", searchMember);

txtSearch.addEventListener("search", searchMember);

function searchMember(){

    let keyword = txtSearch.value.trim().toLowerCase();

    if(keyword==""){

        renderTable(members);

        return;

    }

    let result = members.filter(member=>{

        return (

            String(member.id).toLowerCase().includes(keyword)

            ||

            String(member.nama).toLowerCase().includes(keyword)

            ||

            String(member.telefon).toLowerCase().includes(keyword)

            ||

            String(member.program).toLowerCase().includes(keyword)

            ||

            String(member.status).toLowerCase().includes(keyword)

        );

    });

    renderTable(result);

}

/* ==========================================
   REFRESH SEARCH
========================================== */

function refreshSearch(){

    txtSearch.value="";

    renderTable(members);

}

/* ==========================================
   ENTER KEY SEARCH
========================================== */

txtSearch.addEventListener("keypress",function(e){

    if(e.key==="Enter"){

        e.preventDefault();

        searchMember();

    }

});

/* ==========================================
   AUTO SEARCH WHEN INPUT
========================================== */

txtSearch.addEventListener("input",function(){

    searchMember();

});

/* ==========================================
   SAVE MEMBER
========================================== */

btnSave.onclick = saveMember;

async function saveMember(){

    let nama = txtNama.value.trim();

    let telefon = txtTelefon.value.trim();

    let program = txtProgram.value.trim();

    let jumlah = Number(txtJumlah.value);

    /* ---------- Validation ---------- */

    if(nama==""){

        alert("Sila masukkan nama.");

        txtNama.focus();

        return;

    }

    if(telefon==""){

        alert("Sila masukkan telefon.");

        txtTelefon.focus();

        return;

    }

    if(program==""){

        alert("Sila masukkan program.");

        txtProgram.focus();

        return;

    }

    if(isNaN(jumlah) || jumlah<=0){

        alert("Jumlah tidak sah.");

        txtJumlah.focus();

        return;

    }

    showLoading();

    let action="addMember";

    if(selectedID!=""){

        action="updateMember";

    }

    const payload={

        action:action,

        id:selectedID,

        nama:nama,

        telefon:telefon,

        program:program,

        jumlah:jumlah

    };

    try{

        const response=await fetch(API,{

            method:"POST",

            headers:{

                "Content-Type":"application/json"

            },

            body:JSON.stringify(payload)

        });

        const result=await response.json();

        hideLoading();

        if(result.status=="success"){

            closeMemberModal();

            await loadMembers();

            alert(result.message);

        }else{

            alert(result.message);

        }

    }

    catch(err){

        hideLoading();

        console.log(err);

        alert("Ralat sambungan ke Google Apps Script.");

    }

}


/* ==========================================
   EDIT MEMBER
========================================== */

function editMember(id){

    selectedID=id;

    const member=getMemberByID(id);

    if(!member){

        alert("Rekod tidak dijumpai.");

        return;

    }

    memberID.value=member.id;

    txtNama.value=member.nama;

    txtTelefon.value=member.telefon;

    txtProgram.value=member.program;

    txtJumlah.value=member.jumlah;

    modalTitle.innerHTML="Edit Ahli";

    modal.style.display="flex";

}

/* ==========================================
   UPDATE BUTTON
========================================== */

function setEditMode(id){

    editMember(id);

}

/* ==========================================
   RESET MODE
========================================== */

function resetMode(){

    selectedID="";

}

/* ==========================================
   AFTER SAVE
========================================== */

function afterSave(){

    resetMode();

    closeMemberModal();

    loadMembers();

}

/* ==========================================
   ESC KEY CLOSE MODAL
========================================== */

document.addEventListener("keydown",function(e){

    if(e.key==="Escape"){

        closeMemberModal();

    }

});

/* ==========================================
   DOUBLE CLICK ROW = EDIT
========================================== */

tbody.addEventListener("dblclick",function(e){

    const row=e.target.closest("tr");

    if(!row) return;

    const id=row.cells[0].innerText;

    if(id!=""){

        editMember(id);

    }

});

/* ==========================================
   DELETE MEMBER
========================================== */

function deleteMember(id){

    selectedID=id;

    deleteModal.style.display="flex";

}

/* ==========================================
   CANCEL DELETE
========================================== */

btnDeleteCancel.onclick=function(){

    deleteModal.style.display="none";

    selectedID="";

}

/* ==========================================
   CONFIRM DELETE
========================================== */

btnDeleteYes.onclick=async function(){

    if(selectedID=="") return;

    showLoading();

    try{

        const formData=new URLSearchParams();

        formData.append("action","deleteMember");

        formData.append("id",selectedID);

        const response=await fetch(API,{

            method:"POST",

            body:formData

        });

        const result=await response.json();

        hideLoading();

        deleteModal.style.display="none";

        if(result.status=="success"){

            selectedID="";

            await loadMembers();

            alert("Rekod berjaya dipadam.");

        }else{

            alert(result.message);

        }

    }

    catch(err){

        hideLoading();

        deleteModal.style.display="none";

        console.log(err);

        alert("Tidak dapat sambung ke Server.");

    }

}

/* ==========================================
   DELETE BY KEYBOARD
========================================== */

document.addEventListener("keydown",function(e){

    if(e.key=="Delete"){

        if(selectedID!=""){

            deleteMember(selectedID);

        }

    }

});

/* ==========================================
   TOAST NOTIFICATION
========================================== */

function showToast(message,type="success"){

    let toast=document.getElementById("toast");

    if(!toast){

        toast=document.createElement("div");

        toast.id="toast";

        document.body.appendChild(toast);

    }

    toast.className="toast "+type;

    toast.innerHTML=message;

    toast.style.display="block";

    setTimeout(()=>{

        toast.classList.add("show");

    },100);

    setTimeout(()=>{

        toast.classList.remove("show");

        setTimeout(()=>{

            toast.style.display="none";

        },300);

    },3000);

}

/* ==========================================
   PHONE VALIDATION
========================================== */

function validPhone(phone){

    phone=phone.replace(/\s/g,'');

    const regex=/^(01)[0-9]{8,9}$/;

    return regex.test(phone);

}

/* ==========================================
   MONEY VALIDATION
========================================== */

function validAmount(value){

    value=Number(value);

    if(isNaN(value)) return false;

    if(value<=0) return false;

    return true;

}

/* ==========================================
   RESET FORM
========================================== */

function resetForm(){

    selectedID="";

    memberID.value="";

    txtNama.value="";

    txtTelefon.value="";

    txtProgram.value="";

    txtJumlah.value="";

}

/* ==========================================
   AUTO REFRESH
========================================== */

function autoRefresh(){

    loadMembers();

}

/* refresh setiap 60 saat */

setInterval(autoRefresh,60000);

/* ==========================================
   FORMAT DATE
========================================== */

function today(){

    const d=new Date();

    return d.toLocaleDateString("ms-MY");

}

/* ==========================================
   CAPITALIZE
========================================== */

function capitalize(text){

    return text.replace(/\b\w/g,l=>l.toUpperCase());

}

/* ==========================================
   INPUT EVENT
========================================== */

txtNama.addEventListener("blur",()=>{

    txtNama.value=capitalize(txtNama.value.trim());

});

txtProgram.addEventListener("blur",()=>{

    txtProgram.value=capitalize(txtProgram.value.trim());

});

/* ==========================================
   ENTER KEY
========================================== */

document.addEventListener("keypress",function(e){

    if(e.key==="Enter"){

        if(modal.style.display==="flex"){

            saveMember();

        }

    }

});

/* ==========================================
   END MEMBER.JS
========================================== */

console.log("Member.js Loaded Successfully");
