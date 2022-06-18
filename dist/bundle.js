!function(){"use strict";var e=function(){function e(){}return e.convertRowValuesToGroupedValues=function(e){for(var t=[],i=[],r=0,n=0,l=0;l<81;l++)0!=l&&(l%27==0&&(r+=3,n=0),l%9==0&&(t.push(i),i=[],r-=3,n+=3),l%3==0&&(r++,n-=3)),i.push(e[r][n]),n++;return t.push(i),t},e.convertGroupedValuesToRowValues=function(t){return e.convertRowValuesToGroupedValues(t)},e.concatArraysInArray=function(e){for(var t=[],i=0;i<e.length;i++)t=t.concat(e[i]);return t},e.arraysInArray=function(e,t){void 0===t&&(t=9);for(var i=[],r=[],n=0;n<e.length;n++)n&&n%t==0&&(i.push(r),r=[]),r.push(e[n]);return i.push(r),i},e}(),t=function(e){var t="function"==typeof Symbol&&Symbol.iterator,i=t&&e[t],r=0;if(i)return i.call(e);if(e&&"number"==typeof e.length)return{next:function(){return e&&r>=e.length&&(e=void 0),{value:e&&e[r++],done:!e}}};throw new TypeError(t?"Object is not iterable.":"Symbol.iterator is not defined.")},i=function(e,t){var i="function"==typeof Symbol&&e[Symbol.iterator];if(!i)return e;var r,n,l=i.call(e),o=[];try{for(;(void 0===t||t-- >0)&&!(r=l.next()).done;)o.push(r.value)}catch(e){n={error:e}}finally{try{r&&!r.done&&(i=l.return)&&i.call(l)}finally{if(n)throw n.error}}return o},r=function(e,t,i){if(i||2===arguments.length)for(var r,n=0,l=t.length;n<l;n++)!r&&n in t||(r||(r=Array.prototype.slice.call(t,0,n)),r[n]=t[n]);return e.concat(r||Array.prototype.slice.call(t))},n=function(){function n(){this.userEditableCell=null,this.cells=[],this.correctValues=[],this.DOMContainer=this.initBoard()}return n.prototype.getBoard=function(){return this.DOMContainer},n.prototype.initBoard=function(){var e=document.createElement("div");e.id="grid";for(var t=1;t<=9;t++){var i=document.createElement("div");i.dataset.groupIndex=t.toString(),i.classList.add("group");for(var r=1;r<=9;r++){var n=document.createElement("div");n.classList.add("cell"),n.dataset.cellIndex=r.toString(),n.addEventListener("click",this.cellEditableListener.bind(this)),i.append(n),this.cells.push(n)}e.append(i)}return this.setCellsInStaticMode(),e},n.prototype.cellEditableListener=function(e){var t=e.target;t.classList.contains("static")||(this.clearVerifyMode(),this.userEditableCell&&this.unsetEditableCell(),this.setEditableCell(t))},n.prototype.setEditableCell=function(e){this.userEditableCell=e,this.userEditableCell.classList.add("editable"),this.highlightCells(this.userEditableCell)},n.prototype.unsetEditableCell=function(){this.userEditableCell&&this.userEditableCell.classList.remove("editable"),this.userEditableCell=null,this.unsetHighlightCells()},n.prototype.highlightCells=function(e){this.unsetHighlightCells(),this.highlightAttachedCells(e),this.highlightAllConflictCells()},n.prototype.highlightAttachedCells=function(e){for(var t=this.getCellsAttachedToEditableCell(e),i=0;i<t.length;i++)t[i].classList.add("attached-to-editable")},n.prototype.highlightAllConflictCells=function(){var e,n,l,o;try{for(var s=t(this.cells),a=s.next();!a.done;a=s.next()){var u=a.value;if(this.getCellValue(u)){var d=r(r(r([],i(this.getGroupOfCells(u)),!1),i(this.getRowOfCells(u)),!1),i(this.getColumnOfCells(u)),!1);try{for(var c=(l=void 0,t(d)),h=c.next();!h.done;h=c.next()){var p=h.value;u!=p&&this.getCellValue(u)==this.getCellValue(p)&&p.classList.add("incorrect")}}catch(e){l={error:e}}finally{try{h&&!h.done&&(o=c.return)&&o.call(c)}finally{if(l)throw l.error}}}}}catch(t){e={error:t}}finally{try{a&&!a.done&&(n=s.return)&&n.call(s)}finally{if(e)throw e.error}}},n.prototype.unsetHighlightCells=function(){for(var e=0;e<this.cells.length;e++)this.cells[e].classList.remove("attached-to-editable"),this.cells[e].classList.remove("incorrect")},n.prototype.updateCellValue=function(e,t,i){void 0===i&&(i=!0);var r=document.createElement("span");r.innerText="number"==typeof t?t.toString():"",e.innerHTML=r.outerHTML,i&&this.highlightCells(e)},n.prototype.removeCellValue=function(e,t){void 0===t&&(t=!0),e.innerHTML="",t&&this.highlightCells(e)},n.prototype.getRowedCellsDataFormat=function(){return e.concatArraysInArray(e.convertGroupedValuesToRowValues(e.arraysInArray(this.cells)))},n.prototype.getCellsAttachedToEditableCell=function(e){var t=r(r(r(r([],i(this.getGroupOfCells(e)),!1),i(this.getRowOfCells(e)),!1),i(this.getColumnOfCells(e)),!1),i(this.getCellsWithSameValue(e)),!1);return r([],i(new Set(t)),!1)},n.prototype.getGroupOfCells=function(e){var t=this.getGroupIndex(e);return this.cells.slice(9*(t-1),9*t)},n.prototype.getRowOfCells=function(e){var t=this,i=this.getRowIndex(e);return this.cells.filter((function(e){return t.getRowIndex(e)==i}))},n.prototype.getColumnOfCells=function(e){var t=this,i=this.getColumnIndex(e);return this.cells.filter((function(e){return t.getColumnIndex(e)==i}))},n.prototype.getCellsWithSameValue=function(e){var t=this,i=this.getCellValue(e);return i?this.cells.filter((function(e){return t.getCellValue(e)==i})):[]},n.prototype.getRowIndex=function(e){return Math.floor(this.getRowedCellsDataFormat().indexOf(e)/9)},n.prototype.getColumnIndex=function(e){return this.getRowedCellsDataFormat().indexOf(e)%9},n.prototype.getCellValue=function(e){return e&&e.innerText?parseInt(e.innerText):null},n.prototype.getGroupIndex=function(e){return parseInt(e.parentElement.dataset.groupIndex)},n.prototype.isGridFullyFilled=function(){var e,i;try{for(var r=t(this.cells),n=r.next();!n.done;n=r.next()){var l=n.value;if(!this.getCellValue(l))return!1}}catch(t){e={error:t}}finally{try{n&&!n.done&&(i=r.return)&&i.call(r)}finally{if(e)throw e.error}}return!0},n.prototype.isGridSolved=function(){if(this.correctValues){for(var e=0;e<this.correctValues.length;e++){var t=this.cells[e];if(!this.getCellValue(t))return;if(this.getCellValue(t)!=this.correctValues[e])return}return!0}},n.prototype.displayConfettis=function(e){void 0===e&&(e=!0);var t=e?"100%":"0%";this.DOMContainer.style.setProperty("--confetti-element-size",t)},n.prototype.setVerifyMode=function(){if(this.correctValues)for(var e=0;e<this.correctValues.length;e++){var t=this.cells[e];t.classList.add(this.getCellValue(t)==this.correctValues[e]?"correct":"incorrect")}},n.prototype.clearVerifyMode=function(){for(var e=0;e<this.cells.length;e++)this.cells[e].classList.remove("correct"),this.cells[e].classList.remove("incorrect")},n.prototype.setCellsInStaticMode=function(){for(var e=0;e<this.cells.length;e++)this.cells[e].classList.add("static")},n.prototype.clearBoard=function(){for(var e=0;e<this.cells.length;e++)this.cells[e].innerHTML="",this.cells[e].classList.remove("static"),this.clearVerifyMode()},n}(),l=function(){function e(){this.time=0,this.tick=void 0,this.timerSpan=document.createElement("span")}return e.prototype.getTimer=function(){var e=document.createElement("div");e.id="timer",this.timerSpan.innerText="00:00";var t=document.createElement("i");return t.classList.add("gg-timer"),e.append(t),e.append(this.timerSpan),e},e.prototype.start=function(){this.reset(),this.time--,this.update(),this.tick=setInterval(this.update.bind(this),1e3)},e.prototype.update=function(){this.time++,this.timerSpan.innerText=this.getTime()},e.prototype.stop=function(){clearInterval(this.tick)},e.prototype.reset=function(){this.time=0,clearInterval(this.tick)},e.prototype.getTime=function(){var e=Math.floor(this.time/60),t=this.time%60;return"".concat(e<10?"0"+e:e,":").concat(t<10?"0"+t:t)},e}(),o=function(){function e(e){this.timer=new l,this.grid=e}return e.prototype.getTopElements=function(){var e=document.createElement("div");return e.id="game-ui-top",e.append(this.getButtonsElements()),e.append(this.timer.getTimer()),e},e.prototype.getButtonsElements=function(){var e=document.createElement("div");return e.id="game-ui-buttons",e.append(this.getNewGameButton()),e.append(this.getDifficultySelector()),e.append(this.getVerifyButton()),e},e.prototype.getNewGameButton=function(){var e=document.createElement("button");return e.id="new-game",e.innerText="New Game",e},e.prototype.getDifficultySelector=function(){var e=document.createElement("select");return e.id="difficulty-selector",e.append(this.getDifficultyOption("easy",!0)),e.append(this.getDifficultyOption("medium")),e.append(this.getDifficultyOption("hard")),e},e.prototype.getDifficultyOption=function(e,t){void 0===t&&(t=!1);var i=document.createElement("option");return i.value=e,i.innerText=e.charAt(0).toUpperCase()+e.slice(1),i.selected=t,i},e.prototype.getUserDifficulty=function(){return document.getElementById("difficulty-selector").value},e.prototype.getVerifyButton=function(){var e=document.createElement("button");return e.id="verify",e.innerText="Verify",e},e.prototype.getBottomElements=function(){var e=document.createElement("div");return e.id="game-ui-bottom",e.append(this.getPadNumbers()),e.append(this.getGridCellActionsButtons()),e},e.prototype.getPadNumbers=function(){var e=document.createElement("div");e.id="pad-numbers";for(var t=1;t<=9;t++)e.append(this.getPadNumber(t));return e},e.prototype.getPadNumber=function(e){var t=document.createElement("div");t.classList.add("pad-number");var i=document.createElement("span");return i.innerText=e.toString(),t.append(i),t},e.prototype.getGridCellActionsButtons=function(){var e=document.createElement("div");return e.id="grid-actions-buttons",e.append(this.getCellEraseButton()),e.append(this.getCellTipButton()),e},e.prototype.getCellEraseButton=function(){var e=document.createElement("div");e.id="cell-erase";var t=document.createElement("span");return t.innerHTML='<i class="fa-solid fa-eraser"></i>',e.append(t),e},e.prototype.getCellTipButton=function(){var e=document.createElement("div");e.id="cell-tip";var t=document.createElement("span");return t.innerHTML='<i class="fa-solid fa-lightbulb"></i>',e.append(t),e},e}(),s=function(){function t(e,t){this.gridValues=this.getBaseGrid(),this.grid=e,this.difficulty=t}return t.prototype.generateValues=function(){for(var t=0;t<200;t++)this.shuffleDigits();for(t=0;t<20;t++)this.shuffleRows([0,2]),this.shuffleRows([3,5]),this.shuffleRows([6,8]);for(t=0;t<20;t++)this.shuffleColumns([0,2]),this.shuffleColumns([3,5]),this.shuffleColumns([6,8]);var i=e.concatArraysInArray(e.convertRowValuesToGroupedValues(this.gridValues));for(t=0;t<i.length;t++)this.grid.updateCellValue(this.grid.cells[t],i[t],!1);return this.hideSomeCells(),i},t.prototype.getBaseGrid=function(){return[[1,2,3,4,5,6,7,8,9],[4,5,6,7,8,9,1,2,3],[7,8,9,1,2,3,4,5,6],[2,3,1,5,6,4,8,9,7],[5,6,4,8,9,7,2,3,1],[8,9,7,2,3,1,5,6,4],[3,1,2,6,4,5,9,7,8],[6,4,5,9,7,8,3,1,2],[9,7,8,3,1,2,6,4,5]]},t.prototype.shuffleDigits=function(){var t=[1,2,3,4,5,6,7,8,9],i=Math.ceil(Math.random()*t.length);t.splice(t.indexOf(i),1);for(var r=Math.ceil(Math.random()*t.length),n=e.convertRowValuesToGroupedValues(this.gridValues),l=0;l<n.length;l++){var o=n[l].indexOf(i),s=n[l].indexOf(r);this.gridValues[l][o]=r,this.gridValues[l][s]=i}},t.prototype.shuffleRows=function(e){var t=e[0],i=e[1],r=Math.floor(Math.random()*(i-t+1)+t),n=Math.floor(Math.random()*(i-t+1)+t),l=this.gridValues[r];this.gridValues[r]=this.gridValues[n],this.gridValues[n]=l},t.prototype.shuffleColumns=function(e){var t=this,i=e[0],r=e[1],n=Math.floor(Math.random()*(r-i+1)+i),l=Math.floor(Math.random()*(r-i+1)+i),o=this.gridValues.map((function(e){return e[n]}));this.gridValues.map((function(e,i){return e[n]=t.gridValues[i][l]})),this.gridValues.map((function(e,t){return e[l]=o[t]}))},t.prototype.hideSomeCells=function(){var e;switch(this.difficulty){case"easy":e=4;break;case"medium":e=5;break;case"hard":e=6;break;default:e=0}for(var t=[0,1,2,3,4,5,6,7,8],i=[],r=0;r<this.grid.cells.length;r++){if(r%9==0){i=[];for(var n=0;n<e;n++){var l=Math.floor(Math.random()*t.length);i.push(t[l]),t.splice(t.indexOf(t[l]),1)}t=[0,1,2,3,4,5,6,7,8]}i.includes(r%9)?this.grid.removeCellValue(this.grid.cells[r],!1):this.grid.cells[r].classList.add("static")}},t}(),a=function(){function e(e,t){this.grid=e,this.gameUI=t,this.initEventListeners(),this.newGame()}return e.prototype.initEventListeners=function(){var e,t,i,r,n,l;null===(i=document.getElementById("new-game"))||void 0===i||i.addEventListener("click",this.newGame.bind(this)),null===(r=document.getElementById("verify"))||void 0===r||r.addEventListener("click",this.verifyValues.bind(this));var o=Array.from(document.getElementsByClassName("pad-number"));try{for(var s=function(e){var t="function"==typeof Symbol&&Symbol.iterator,i=t&&e[t],r=0;if(i)return i.call(e);if(e&&"number"==typeof e.length)return{next:function(){return e&&r>=e.length&&(e=void 0),{value:e&&e[r++],done:!e}}};throw new TypeError(t?"Object is not iterable.":"Symbol.iterator is not defined.")}(o),a=s.next();!a.done;a=s.next())a.value.addEventListener("click",this.handlePadNumber.bind(this))}catch(t){e={error:t}}finally{try{a&&!a.done&&(t=s.return)&&t.call(s)}finally{if(e)throw e.error}}null===(n=document.getElementById("cell-erase"))||void 0===n||n.addEventListener("click",this.handleCellErase.bind(this)),null===(l=document.getElementById("cell-tip"))||void 0===l||l.addEventListener("click",this.handleCellTip.bind(this)),document.addEventListener("keydown",this.handleUserKeyInputs.bind(this))},e.prototype.newGame=function(){this.grid.clearBoard(),this.grid.displayConfettis(!1),this.grid.correctValues=new s(this.grid,this.gameUI.getUserDifficulty()).generateValues(),this.gameUI.timer.start()},e.prototype.verifyValues=function(){this.grid.correctValues&&(this.grid.clearVerifyMode(),this.grid.setVerifyMode())},e.prototype.handlePadNumber=function(e){if(this.grid.userEditableCell){var t=e.target;this.grid.updateCellValue(this.grid.userEditableCell,parseInt(t.innerText)),this.handleMaybeSolvedGrid()}},e.prototype.handleCellErase=function(){this.grid.userEditableCell&&this.grid.removeCellValue(this.grid.userEditableCell)},e.prototype.handleCellTip=function(){if(this.grid.userEditableCell){var e=this.grid.cells.indexOf(this.grid.userEditableCell);this.grid.updateCellValue(this.grid.userEditableCell,this.grid.correctValues[e]),this.handleMaybeSolvedGrid()}},e.prototype.handleUserKeyInputs=function(e){this.grid.userEditableCell instanceof HTMLElement&&("Backspace"==e.key&&this.grid.removeCellValue(this.grid.userEditableCell),parseInt(e.key)>0&&parseInt(e.key)<=9&&this.grid.updateCellValue(this.grid.userEditableCell,parseInt(e.key)),this.grid.highlightCells(this.grid.userEditableCell),this.handleMaybeSolvedGrid())},e.prototype.handleMaybeSolvedGrid=function(){this.grid.isGridSolved()?this.gameWon():this.grid.isGridFullyFilled()&&this.verifyValues()},e.prototype.gameWon=function(){this.grid.setVerifyMode(),this.gameUI.timer.stop(),this.grid.displayConfettis(!0),this.grid.setCellsInStaticMode(),this.grid.unsetEditableCell()},e}(),u=function(){function e(){this.socialMedia={github:{icon:"fa-brands fa-github",href:"https://github.com/hugoderre"},website:{icon:"fa-solid fa-globe",href:"https://www.hugoderre.fr"}}}return e.prototype.getElement=function(){var e=document.createElement("div");e.id="social-media";var t=function(t){var r=document.createElement("a");r.href=i.socialMedia[t].href,r.target="_blank",r.rel="noopener noreferrer";var n=document.createElement("i");i.socialMedia[t].icon.split(" ").forEach((function(e){n.classList.add(e)})),r.append(n),e.append(r)},i=this;for(var r in this.socialMedia)t(r);return e},e}();new(function(){function e(){this.rootDOM=document.getElementById("root"),this.container=document.createElement("div"),this.grid=new n,this.gameUI=new o(this.grid),this.init()}return e.prototype.init=function(){this.container.classList.add("container"),this.container.append(this.grid.getBoard()),this.container.prepend(this.gameUI.getTopElements()),this.container.append(this.gameUI.getBottomElements()),this.rootDOM.append(this.container),this.rootDOM.append((new u).getElement()),new a(this.grid,this.gameUI)},e}())}();