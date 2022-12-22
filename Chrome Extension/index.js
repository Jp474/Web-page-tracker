const inputField = document.getElementById("input-field")
const inputBtn = document.getElementById("input-btn")
const tabBtn = document.getElementById("tab-btn")
const deleteBtn = document.getElementById("delete-btn")
const ulEL = document.getElementById("ul-el")
let leadsFromStorage = JSON.parse(localStorage.getItem("myLeads"))
let myLeads = []

if (leadsFromStorage) {
   myLeads = leadsFromStorage
   render(myLeads)
}

function render(leads) {
    
    let baseString = ``
    for (let i = 0; i < leads.length; i++) {
        baseString += `<li><a target="_blank" href="${leads[i]}">${leads[i]}</li>`
    }  ulEL.innerHTML = baseString
    return ulEL.innerHTML
} 

inputBtn.addEventListener("click", function() {
    if (inputField.value){
        myLeads.push(inputField.value)
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    inputField.value = ""
    render(myLeads)
    }
    
})

tabBtn.addEventListener("click", function() {
    chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    })
})

deleteBtn.addEventListener("dblclick", function(){
    myLeads = []
    leadsFromStorage = ""
    localStorage.clear()
    inputField.value = ""
    render(myLeads)
})