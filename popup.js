// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Search the bookmarks when entering the search keyword.
$(function() {
  $('#search').change(function() {
     $('#bookmarks').empty();
     dumpBookmarks($('#search').val());
  });
});

// Switch to current tab

function changeToTab(tabId){
	var tabSwitch = chrome.tabs.update(tabId, {active:true});
}
function getTabList($target, query){
	chrome.tabs.query({}, 
		function(tabList){
			var tabCounter,
				currentTab,
				newUL = $('<ul>',{id:'tab_list'});
			for (tabCounter = 0; tabCounter < tabList.length; tabCounter += 1){
				currentTab = tabList[tabCounter];
				$('<li><a href = "#" data-tab_id = "'+currentTab.id+'">'+currentTab.title+'</a>').appendTo(newUL);

			}
			$target.html('');
			$target.append(newUL);
			$target.on('click', 'a', function(evt){
				changeToTab($(this).data('tab_id'));
			})
		}
	);

	
}



document.addEventListener('DOMContentLoaded', function () {
  getTabList($('#bookmarks'));
});
