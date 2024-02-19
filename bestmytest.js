// ==UserScript==
// @name         vocabulary downloader
// @namespace    http://tampermonkey.net/
// @version      2024-02-20
// @description  將bestmytest網頁單字下載成檔案
// @author       You
// @match        https://www.bestmytest.com/toeic/vocabulary-blog/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=bestmytest.com
// @grant        none
// ==/UserScript==

(function() {
    let texts = [];

document.querySelectorAll('h3.vocab-title').forEach(item => {
    let text = item.textContent.trim();
    // 使用正则表达式将最后一个空格替换为逗号
    text = text.replace(/(.*?)\s(?!.*\s)/, '$1,');
    texts.push(text);
});

let textToCopy = texts.join('\n');

navigator.clipboard.writeText(textToCopy)
    .then(() => {
        alert('Text copied to clipboard');
    })
    .catch(err => {
        console.error('Unable to copy text to clipboard: ', err);
    });


})();