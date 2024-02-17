// ==UserScript==
// @name         bilibili合集未看時長
// @version      1.0
// @description  計算bilibili视频选集，當前分p之後未觀看的分p時長。未來功能: 1.兼容綜藝合集類型 2.扣除當前分p進度條時間
// @author       Your name
// @match        https://www.bilibili.com/video/*
// @run-at       document-end
// ==/UserScript==

function show_unwatch_time() {
  const ele = document.querySelector(".list-box");
  const li = Array.from(ele.querySelectorAll("li"));

  // 取得所有時長
  let timeList = li.map((item) => {
    let durationString = item.querySelector("a > div > div.duration").innerHTML;
    let [minutes, seconds] = durationString.split(":").map(Number);
    return minutes * 60 + seconds;
  });

  // 取得目前集數
  const nowplay = li.findIndex((li) => li.classList.contains("on"));

  // 加總數組位於現在級數後所有秒數
  const sumup_until_now = (nowEpi) => {
    let sumupTime = timeList.slice(nowEpi).reduce((prev, curr) => prev + curr);
    return sumupTime;
  };

  // 剩餘時長
  let unwatchTime = sumup_until_now(nowplay);
  let unwatchSec = unwatchTime % 60;
  let unwatchMin = Math.floor(unwatchTime / 60) % 60;
  let unwatchHr = Math.floor(unwatchTime / 3600);

  // 在標題統計欄新增未看時長元素
  // 查找父元素
  const report = document.querySelector("#viewbox_report > div");
  // 如果report的子元素中有<p>元素，就删除
  if (report.querySelector("p")) {
    report.removeChild(report.querySelector(".showunwatch"));
  }

  // 创建新的 <p> 元素
  const newParagraph = document.createElement("div");
  newParagraph.setAttribute("class", "showunwatch");
  report.appendChild(newParagraph);
  if (unwatchHr) {
    newParagraph.innerHTML = `
        <p style="position: absolute; top: 0px; right: 0px;">未看時長 ${unwatchHr}時${unwatchMin}分${unwatchSec}秒</p>
    `;
  } else {
    newParagraph.innerHTML = `
        <p class="showunwatch" style="position: absolute; top: 0px; right: 0px;">未看時長${unwatchMin}分${unwatchSec}秒</p>
    `;
  }
}

// 頁面加載即執行
window.addEventListener("load", function () {
  // 在這裡放置頁面加載完事件的代碼
  console.log("Page loaded");
  // setTimeout(show_unwatch_time, 1000);
  show_unwatch_time();
});

// -----------------------
// 監聽DOM节点改变事件
function callback(mutationList, observer) {
  console.log("dom change observed");
  // setTimeout(show_unwatch_time, 1000);
  show_unwatch_time();
}

let ops = document.querySelector(".list-box");
console.log(ops);
let observerOptions = {
  childList: true, // 观察目标子节点的变化，添加或删除
  attributes: true, // 观察属性变动
  subtree: true,
  // attributeFilter: ["class"],
};

var observer = new MutationObserver(callback);
observer.observe(ops, observerOptions);
