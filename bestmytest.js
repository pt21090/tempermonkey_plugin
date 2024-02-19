// ==UserScript==
// @name         vocabulary downloader
// @namespace    http://tampermonkey.net/
// @version      2024-02-19
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

let textToSave = texts.join('\n');

let blob = new Blob([textToSave], { type: 'text/plain' });
let url = window.URL.createObjectURL(blob);

let a = document.createElement('a');
a.href = url;
a.download = 'output.txt';
document.body.appendChild(a);

a.click();

window.URL.revokeObjectURL(url);

})();