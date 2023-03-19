chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: () => {
            const magnets = [...document.querySelectorAll('a[href^="magnet:"]')].map(
                (a) => a.href
            );
            if (magnets.length > 0) {
                navigator.clipboard.writeText(magnets.join("\n"));
                console.log(magnets.length + " magnets copied to clipboard");
            } else {
                console.log("No magnets found");
            }
        },
    });
}); 