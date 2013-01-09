// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Switch to current tab
function TabController($target){
var tabs = chrome.tabs,
	changeToTab,
	killTab,
	getTabList;
	
changeToTab = function (tabId) {
	var tabSwitch = chrome.tabs.update(tabId, {active:true});
	};
	
killTab = function (tabId) {
	var tabKill = chrome.tabs.remove(tabId);
	getTabList();
};
getTabList = function (){
	chrome.tabs.query({}, 
		function(tabList){
			var tabCounter,
				currentTab,
				newUL = $('<ul>',{id:'tab_list'});
			for (tabCounter = 0; tabCounter < tabList.length; tabCounter += 1){
				currentTab = tabList[tabCounter];
				$('<li><a href = "#" data-tab_id = "'+currentTab.id+'">'+currentTab.title+'</a><i class = "close"></i></li>').appendTo(newUL);

			}
			$target.html('');
			$target.append(newUL);
			$target.on('click', 'a', function(evt){
				changeToTab($(this).data('tab_id'));
			});
			$target.on('click', '.close', function(evt){
				killTab($(this).prev('a').data('tab_id'));
			});
		}
	);

	
}
return {
	init : getTabList()
}
}




document.addEventListener('DOMContentLoaded', function () {
 	tabber = new TabController($('#bookmarks'));
 	tabber.init();
});
