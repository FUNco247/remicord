(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";var clock=document.querySelector("h1.clock"),calendar=document.querySelector("b.calendar"),daysArr=["일요일","월요일","화요일","수요일","목요일","금요일","토요일"];function getClock(){var t=new Date,e=String(t.getFullYear()),c=String(t.getMonth()+1),a=String(t.getDate()),n=daysArr[t.getDay()],r=String(t.getHours()).padStart(2,"0"),o=String(t.getMinutes()).padStart(2,"0"),g=String(t.getSeconds()).padStart(2,"0");c=c<10?"0"+c:c,a=a<10?"0"+a:a,clock.innerText="".concat(r,":").concat(o,":").concat(g),calendar.innerText="Today : ".concat(e,"년 ").concat(c,"월 ").concat(a,"일 ").concat(n)}getClock(),setInterval(getClock,1e3);

},{}]},{},[1]);