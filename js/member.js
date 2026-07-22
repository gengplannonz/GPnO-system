/* Geng Plan & Onz - member.js */
const members=[
{id:"M001",nama:"Ali",telefon:"60123456789",program:"Cameron",jumlah:150,bayar:150},
{id:"M002",nama:"Siti",telefon:"60111111111",program:"Langkawi",jumlah:200,bayar:50},
];
let editIndex=-1,deleteIndex=-1;
const tbody=document.getElementById("memberTable");
const search=document.getElementById("txtSearch");
const modal=document.getElementById("memberModal");
const delModal=document.getElementById("deleteModal");
function render(list=members){
 tbody.innerHTML="";
 if(!list.length){tbody.innerHTML='<tr><td colspan="9" class="empty">Tiada rekod</td></tr>';return;}
 list.forEach((m,i)=>{
 const baki=m.jumlah-m.bayar;
 const status=baki<=0?"Paid":m.bayar>0?"Partial":"Belum";
 const cls=baki<=0?"status-paid":m.bayar>0?"status-partial":"status-unpaid";
 tbody.innerHTML+=`<tr>
<td>${m.id}</td><td>${m.nama}</td><td>${m.telefon}</td><td>${m.program}</td>
<td>RM ${m.jumlah}</td><td>RM ${m.bayar}</td><td>RM ${baki}</td>
<td class="${cls}">${status}</td>
<td><button class="edit" onclick="editMember(${i})">Edit</button>
<button class="delete" onclick="askDelete(${i})">Padam</button></td></tr>`;
 });
}
function clearForm(){
memberID.value="";txtNama.value="";txtTelefon.value="";
txtProgram.value="";txtJumlah.value="";
}
btnAdd.onclick=()=>{editIndex=-1;clearForm();modal.style.display="flex";modalTitle.innerText="Tambah Ahli";}
closeModal.onclick=btnCancel.onclick=()=>modal.style.display="none";
btnSave.onclick=()=>{
 const obj={
 id:memberID.value||("M"+String(Date.now()).slice(-4)),
 nama:txtNama.value.trim(),
 telefon:txtTelefon.value.trim(),
 program:txtProgram.value.trim(),
 jumlah:Number(txtJumlah.value||0),
 bayar: editIndex>=0?members[editIndex].bayar:0
 };
 if(!obj.nama){alert("Nama diperlukan");return;}
 if(editIndex>=0) members[editIndex]=obj; else members.push(obj);
 modal.style.display="none";render();
}
function editMember(i){
 editIndex=i;const m=members[i];
 memberID.value=m.id;txtNama.value=m.nama;txtTelefon.value=m.telefon;
 txtProgram.value=m.program;txtJumlah.value=m.jumlah;
 modalTitle.innerText="Edit Ahli";modal.style.display="flex";
}
function askDelete(i){deleteIndex=i;delModal.style.display="flex";}
btnDeleteCancel.onclick=()=>delModal.style.display="none";
btnDeleteYes.onclick=()=>{members.splice(deleteIndex,1);delModal.style.display="none";render();}
search.oninput=()=>{
 const q=search.value.toLowerCase();
 render(members.filter(m=>m.nama.toLowerCase().includes(q)||m.telefon.includes(q)));
}
window.onclick=e=>{if(e.target===modal)modal.style.display="none";if(e.target===delModal)delModal.style.display="none";}
render();
// TODO: Sambung Google Apps Script menggunakan fetch(API_URL)
