const percentElement = document.getElementById('percent');
const tidyElement = document.getElementById('tidy');
let percent;

tidyElement.onclick = () => {
    percent = percentElement.value;
    setPercent(percent);
    chrome.tabs.query({currentWindow: true}, tidyUp);
}

tidyUp = (tabs) => {
    const numTabsToClose = Math.floor(percent / 100 * tabs.length);
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

getPercent = () => {
    chrome.storage.local.get('percent', (data) => {
        percent = data.percent;
        percentElement.value = percent;
    });
}

setPercent = (percent) => {
    chrome.storage.local.set({percent}, function() {
        console.log('Percent has been set.');
    });
}

getPercent();