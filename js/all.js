let selectData = []
let xhr = new XMLHttpRequest()
xhr.open('get', 'https://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97', true)
xhr.send()
xhr.onload = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
        let callback = JSON.parse(xhr.responseText)
        selectData = callback.result.records
        console.log(typeof(selectData))
        xhrData()
    }
}

let value = []
function xhrData() {
    let areaValue = []
    for (let i = 0; i < selectData.length; i++) {
        const selectArea = selectData[i].Zone
        areaValue.push(selectArea)
    }
    let iterable = new Set(areaValue)
    for (let value of iterable) {
        const area = document.querySelector('.area')
        const oldNode = document.querySelector('option')
        const newNode = document.createElement('option')
        let areaText = document.createTextNode(value)
        newNode.appendChild(areaText)
        area.appendChild(newNode, oldNode)
        strData()
    }
}

// 地區名
let areaTitle = document.querySelector('.areaTitle')

// 選擇行政區資訊
let row = document.querySelector('.row')

// 選擇行政區
let select = document.querySelector('.area')
select.addEventListener('change', function (e) {
    value = e.target.value
    strData()
}, 'false')

let btns = document.querySelector('.starArea')
btns.addEventListener('click', function (e) {
    if (e.target.nodeName !== "BUTTON") { return }
    value = e.target.value
    strData()
}, false)

function strData() {
    let str = ' '
    for (let i = 0; i < selectData.length; i++) {
        if (value === selectData[i].Zone) {
            areaTitle.innerHTML = `${selectData[i].Zone}`
            str +=
                `
            <div class="boxCard">
            <div class="cover">
            <img src="${selectData[i].Picture1}" alt="none">
            </div>
            <div class="barInfo">
            <h3 class="cTitle">${selectData[i].Name}</h3>
            <div class="barName">${selectData[i].Zone}</div>
            </div>
            <div class="areaInfo">
            <div class="time">${selectData[i].Opentime}</div>
            <div class="add">${selectData[i].Add}</div>
            <div class="phone">${selectData[i].Tel}</div>
            </div>
            <div class="ticket">${selectData[i].Ticketinfo}</div>
            </div>
   `
        }
    }
    row.innerHTML = str
}

