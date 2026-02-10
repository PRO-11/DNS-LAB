"use strict";

const data = [
  {
    zone_name: "abc.com",
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
  {
    zone_name: "temp.com",
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

const dns_zone=document.querySelector('.dns_zone');
const dns_action=document.querySelector('.dns_action');
const dns_zone_container=document.querySelector('.dns_zone_container')
const zone_container=document.querySelector('.zone_container')
const addZone=function(data)
{
    const htmlData1=`<div class="row" id="${data.zone_name}">
        <div class="cell" >${data.zone_name}</div>
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

