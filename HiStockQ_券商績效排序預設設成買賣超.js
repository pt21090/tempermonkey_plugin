// ==UserScript==
// @name         HiStockQ 券商績效排序預設設成買賣超
// @namespace    http://tampermonkey.net/
// @version      2024-05-26
// @description  try to take over the world!
// @author       You
// @match        https://histock.tw/stock/brokerprofit.aspx?bno=*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=histock.tw
// @grant        none
// ==/UserScript==

(function() {
    const selectElement = document.querySelector("#CPHB1_bt1_dSort");
    const options = selectElement.options;

    let anyOptionSelected = false;
    let selectOptionInd = 0;
    for (; selectOptionInd < options.length; selectOptionInd++) {
        if (options[selectOptionInd].selected) {
            console.log(selectOptionInd);
            anyOptionSelected = true;
            break;
        }
    }

    if (!anyOptionSelected || selectOptionInd===0) {
        // 没有任何选项被选中时，选择第八个选项并执行 postback
        console.log("redirect to 買賣超");
        options[7].selected = true;
        setTimeout(() => {
            __doPostBack('ctl00$CPHB1$bt1$dSort', '');
        }, 0);
    }
})();
