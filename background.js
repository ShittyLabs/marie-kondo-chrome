chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.local.set({percent: 5}, function() {
        console.log('Percent has been set.');
    });
});