chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.local.set({probability: 0.05}, function() {
        console.log('Probability has been set.');
    });
});