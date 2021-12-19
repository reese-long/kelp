function closeTabsRelativeToFocusedTab(direction = null) {
  // noinspection JSUnresolvedVariable, JSCheckFunctionSignatures, JSIgnoredPromiseFromCall
  chrome.tabs.query({currentWindow: true}, (tabs) => {
    const activeTabIdx = tabs.find(tab => tab.active).index

    tabs.forEach(tab => {
      // noinspection EqualityComparisonWithCoercionJS
      const shouldClose = (direction === null && !tab.active)
        || (direction == 'R' ? tab.index > activeTabIdx : tab.index < activeTabIdx)

      // noinspection JSUnresolvedVariable
      shouldClose && chrome.tabs.remove(tab.id)
    })
  });
}

// noinspection JSUnresolvedVariable, JSDeprecatedSymbols
chrome.commands.onCommand.addListener(function (command) {
  switch (command) {
    case 'close-non-focused-tabs':
      closeTabsRelativeToFocusedTab()
      break;
    case 'close-tabs-to-right-of-active-tab':
      closeTabsRelativeToFocusedTab('R');
      break;
    case 'close-tabs-to-left-of-active-tab':
      closeTabsRelativeToFocusedTab('L');
      break;
    default:
      console.log(`no command found ${command}`);
  }
});
