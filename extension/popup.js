// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    const accessToggle = document.getElementById('accessToggle');

    // Load the saved state when popup opens
    chrome.storage.sync.get(['accessEnabled'], (result) => {
        // If there's a saved state, use it. Otherwise default to true
        const isEnabled = result.accessEnabled !== undefined ? result.accessEnabled : true;
        accessToggle.checked = isEnabled;
    });

    // Save state whenever toggle changes
    accessToggle.addEventListener('change', (e) => {
        const isEnabled = e.target.checked;
        chrome.storage.sync.set({ accessEnabled: isEnabled }, () => {
            // Verify the save was successful
            if (chrome.runtime.lastError) {
                console.error('Failed to save state:', chrome.runtime.lastError);
            }
        });
    });
}); 