// ==UserScript==
// @name         quizlet自動定義詞語語言(英語) 定義語言(繁體中文)
// @namespace    http://tampermonkey.net/
// @version      2024-02-19
// @description  try to take over the world!
// @author       You
// @match        https://quizlet.com/create-set*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=quizlet.com
// @grant        none
// ==/UserScript==

window.onload = function () {

    setTimeout(() => {
        // 開啟匯入方塊時，自動選擇逗號分隔選項，執行失敗
        // const importbox = document.querySelector("#__next > main > div > div.c180kq88 > div:nth-child(3) > div > div.c173eb8f > button:nth-child(1)");
        let importbox = document.querySelector("#__next > main > div > div[class*=im423hq]");

        // 創建一個 MutationObserver 實例，並指定回調函數
        let observer = new MutationObserver((mutationsList, observer) => {
            for (let mutation of mutationsList) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class' && importbox.classList.contains("is-showing")) {
                    // 在這裡處理 classList 的變化
                    // 勾選逗號
                    commacheckbox = importbox.querySelector("input[value='Delimiter.COMMA']");
                    commacheckbox.checked = true;
                    // 取消勾選TAB
                    tabcheckbox = importbox.querySelector("input[value='Delimiter.TAB']");
                    tabcheckbox.checked = false;
                    console.log("comma checked");
                }
            } 
        });

        // 配置觀察選項
        let config = { attributes: true, attributeFilter: ['class'] };

        // 開始監視目標元素的變化
        observer.observe(importbox, config);
    }, 2000);

    // 自動定義詞語語言(英語) 定義語言(繁體中文)
    setTimeout(() => {
        document.querySelector("#__next > main > div > div:nth-child(2) > div > div > div.StudiableItems > div:nth-child(6) > div:nth-child(1) > div:nth-child(1) > div > div.TermContent.has-richTextToolbar.rt-clean-design.tbpft35 > div.t2cexx7 > div.i1dekk30 > div.edlakav > div > div > span.ContextToggle.TermContent--mobile-expand-icon > span > button").click();
        document.querySelector("#__next > main > div > div:nth-child(2) > div > div > div.StudiableItems > div:nth-child(6) > div:nth-child(1) > div:nth-child(1) > div > div.TermContent.has-expandedActions.has-richTextToolbar.rt-clean-design.is-active-word.tbpft35 > div.t2cexx7 > div.i1dekk30 > div:nth-child(1) > div > div.t1fzgjyz.tnnr0j1 > div > div > span > div > div > div > select").value = "en";
        document.querySelector("#__next > main > div > div:nth-child(2) > div > div > div.StudiableItems > div:nth-child(6) > div:nth-child(1) > div:nth-child(1) > div > div.TermContent.has-expandedActions.has-richTextToolbar.rt-clean-design.is-active-word.tbpft35 > div.t2cexx7 > div.i1dekk30 > div:nth-child(1) > div > div.TermContent-side--definition.t1qzmi4e.tnnr0j1 > div > div > div.RichTextEditor > span > div > div > div > select").value = "zh-TW";
    }, 1000); // 等待 1000 毫秒 (1 秒) 再執行

}();