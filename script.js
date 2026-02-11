"use strict";

const data = [
  {
    zone_name: "google.com",
    zoneType:"Authoritative",
    created_on: "12:00pm",
    comment:"asndj",
    records: [
      {
        FQDN: "pro",
        type: "A",
        IP: "129.33.4.1",
      },
      {
        FQDN: "temp",
        type: "TXT",
        IP: "nsjdnc",
      },
      {
        FQDN: "wii",
        type: "CNAME",
        IP: "yocns.com",
      },
    ],
  },
  {
    zone_name: "facebook.com",
    zoneType:"Forward",
    comment:"asjndk",
    created_on: "12:00pm",
    records: [
      {
        FQDN: "pro",
        type: "A",
        IP: "129.33.4.1",
      },
      {
        FQDN: "temp",
        type: "TXT",
        IP: "nsjdnc",
      },
      {
        FQDN: "wii",
        type: "CNAME",
        IP: "yocns.com",
      },
    ],
  },
];

//Zone
const dns_zone=document.querySelector('.dns_zone');
const dns_action=document.querySelector('.dns_action');
const dns_zone_container=document.querySelector('.dns_zone_container')
const zone_container=document.querySelector('.zone_container')

//Modal
const addZonebtn=document.querySelector('.addZonebtn');
const closeModalBtn=document.querySelector('#closeModalBtn');
const addzoneModal=document.querySelector('#modalOverlay');
const zoneForm=document.querySelector('#zoneForm')
const modalAlert=document.getElementById("modalAlert");
const screenAlert=document.getElementById("screenAlert");
const modalTimeout=3000;
function showModalAlert(message, type = "success",alert_type) {
  
  alert_type.textContent = message;
  alert_type.className = `modal-alert ${type} show`;

  // Hide after timeout
  setTimeout(() => {
    alert_type.classList.remove("show");
  }, modalTimeout);
}


//Validations

function validateZoneName(zone)
{
  const regex=/^(?=.{1,253}$)(?:(?!-)[A-Za-z0-9-]{1,63}(?<!-)\.)+[A-Za-z]{2,63}$/
  return regex.test(zone)
}

function valdiateZoneExist(zone_name,zone_type)
{
    const split_data=zone_name.split('.');
    let str=split_data[split_data.length-1];
    for(let i=(split_data.length-2);i>=0;i--)
    {
        str=split_data[i]+'.'+str;
        const res=data.findIndex(d=>d.zone_name==str)
        console.log(str,res,zone_name)
        if(res!=-1 && ((data[res].zoneType=='Delegation' || data[res].zoneType=='Forward') || i==0))
        return `${data[res].zoneType} Zone Exist!!`
    }
    return "success";

}

const addZone=function(data)
{
    const htmlData1=`<div class="row" id="${data.zone_name}">
        <div class="cell" >${data.zone_name}</div>
        <div class="cell" >${data.zoneType}</div>
        <div class="cell" >${data.comment}</div>
        <div class="cell actions">
            <span class="material-icons icon-btn edit">edit</span>
            <span class="material-icons icon-btn delete">delete</span>
        </div>
    </div>`
    zone_container.insertAdjacentHTML('beforeend',htmlData1)
}
const addDeleteEvent=function(data)
{
    data.addEventListener('click',deleteZone);
}
const renderData=function(data)
{
    console.log(data)
    zone_container.innerHTML=''
    data.forEach((ele)=>{

        addZone(ele)
        const deleteEle=document.querySelectorAll('.delete');
        const editEle=document.querySelectorAll('.edit');
        console.log(deleteEle)
        deleteEle.forEach(d=>{
            addDeleteEvent(d);
        })
    })
    if(!data.length)
    zone_container.innerHTML='<h3 class="center">No zone created. Please create zone!!</h3>'
}
const deleteZone=function(e)
{
    const ele=this.closest('.row')
    const zone_name=ele.id;
    const ind=data.findIndex(d=> d.zone_name==zone_name)
    data.splice(ind,1);
    renderData(data)
}


renderData(data)


//Modal
function closeZoneModal()
{
  addzoneModal.classList.remove('show');
}
function openZoneModal()
{
  addzoneModal.classList.add('show');
}



addZonebtn.addEventListener('click',openZoneModal)
closeModalBtn.addEventListener('click',closeZoneModal)

zoneForm.addEventListener('submit',(e)=>{
  e.preventDefault();
  const zone_name=e.target.zoneName.value;
  const zoneType=e.target.zoneType.value;
  const comment=e.target.zoneComment.value;
  if(!validateZoneName(zone_name))
  {
    showModalAlert("Invalid Zone Name","error",modalAlert);
    return ;
  }
  const res=valdiateZoneExist(zone_name,zoneType);
  if(res!="success")
  {
    showModalAlert(res,"error",modalAlert);
    return;
  }
 
  data.push({
    zone_name,
    created_on:(new Date()).toISOString(),
    comment,
    zoneType,
    record:[]
  })
  // con/
  renderData(data);
  closeZoneModal();
  showModalAlert("Zone Created Successfully","success",screenAlert);
})
