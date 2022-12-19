const inputField = document.getElementById("input-txt")
const inputBtn = document.getElementById("input-btn")
const tabBtn = document.getElementById("tab-btn")
const deleteBtn = document.getElementById("delete-btn")
const ulEl = document.getElementById("ul-el")
const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") )

let myLeads = []

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

tabBtn.addEventListener("click", function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    })
})

function render(leads) {
    let baseList = ""
    for (let i = 0; i < leads.length; i ++) {
        baseList += `<li> 
                        <a href="${leads[i]}" target="_blank">${leads[i]}
                        </a> 
                     </li>`
    }
    ulEl.innerHTML = baseList
}

deleteBtn.addEventListener("dblclick", function() {
    inputField.value = ""
    localStorage.clear()
    myLeads = []
    render(myLeads)

}) 
    
inputBtn.addEventListener("click", function() {
    if (inputField.value) {
        myLeads.push(inputField.value)
        inputField.value = ""
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    }
    
})