const tidy = document.getElementById('tidy');
let probability;

chrome.storage.local.get('probability', (data) => {
    probability = data.probability;
});

tidy.onclick = () => {
    chrome.tabs.query({currentWindow: true}, tidyUp);
}

tidyUp = (tabs) => {
    const numTabsToClose = Math.floor(probability * tabs.length);
    const shuffledTabIds = shuffleTabIds(tabs);
    const tabsToClose = takeFirstN(shuffledTabIds, numTabsToClose);
    closeTabs(tabsToClose);
}

shuffleTabIds = (tabs) => {
    return tabs
        .map(tab => { return { id: tab.id, random: Math.random() }; } )
        .sort((id1, id2) => id1.random - id2.random)
        .map(tabIds => tabIds.id);
}

takeFirstN = (array, n) => array.slice(0, n);

closeTabs = (ids) => chrome.tabs.remove(ids);