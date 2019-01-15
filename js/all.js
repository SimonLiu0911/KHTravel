let selectData = []
// 用AJAX撈資料
let xhr = new XMLHttpRequest()
// true: 非同步，不等資料傳回來先往下跑
//false: 等資料傳回來，程式再往下跑
xhr.open('get', 'https://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97', true)
xhr.send()
//等資料回傳回來之後執行程式(JS課程講座122)
xhr.onload = function () {
    // HTTP狀態碼：200, 404...
    if (xhr.readyState === 4 && xhr.status === 200) {
        // 因回傳回來的數字是“字串”，所以要轉成物件
        let callback = JSON.parse(xhr.responseText)
        // console.log(callback)
        // 回傳回來的資料在節點result.records下，所以用callback.result.records呼叫，再丟進前面設置的空集合selectData
        selectData = callback.result.records
        // console.log(selectData)
        console.log(typeof(selectData))
        // 把 load 回來的資料從 xhr 傳出去做處理
        xhrData()
    }
}

// jquery ajax 改寫
// let url = 'https://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97'
// let selectData = []
// $.ajax({
//   url:url,
//       error: function(){
//       console.log("載入失敗")
//     },
//     success: function(res){
//       console.log("載入所有資料")
//      selectData = res.result.records
//      xhrData()
//     }
// })



let value = []
function xhrData() {
    let areaValue = []
    for (let i = 0; i < selectData.length; i++) {
        const selectArea = selectData[i].Zone
        areaValue.push(selectArea)
    }
    // 用 set 把多餘的地區值移除
    let iterable = new Set(areaValue)
    for (let value of iterable) {
        // append 到 select 選單
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
    value = e.target.value   // 篩選後的值帶入當作 value 為了之後的info比對
    strData()
}, 'false')

// 熱門行政區 點選顯示區域資料
// 改寫 由父元素裡頭監聽裡頭子元素的作法。好處就是效能較好，網頁上不會有太多監聽影響效能。
let btns = document.querySelector('.starArea')
btns.addEventListener('click', function (e) {
    if (e.target.nodeName !== "BUTTON") { return }
    value = e.target.value
    strData()
    // if (e.target.nodeName == 'BUTTON') {
    //     value = e.target.value;
    //     strData();
    // } else {
    //     return;
    // }
}, false)


function strData() {
    let str = ' ' // 取出變數為單一地區值，不取出則在選擇到另外一個區域，區域值會累加
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
           <h3 class="cityTitle">${selectData[i].Name}</h3>
           <div class="barName">${selectData[i].Zone}</div>
         </div>
         <div class="areaInfo">
           <div class="time"><span><i class="fas fa-clock"></i></span>${selectData[i].Opentime}</div>
           <div class="add"><span><i class="fas fa-map-marker-alt"></i></span>${selectData[i].Add}</div>
           <div class="phone"><span><i class="fas fa-phone"></i></span>${selectData[i].Tel}</div>
         </div>
         <div class="ticket">${selectData[i].Ticketinfo}</div>
       </div>
   `
        }
    }
    row.innerHTML = str
}

