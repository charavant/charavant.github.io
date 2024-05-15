document.getElementById('startButton').addEventListener('click', () => {
    const inputText = document.getElementById('inputText').value;
    const replaceType = document.getElementById('replaceType').value;
    const outputText = processText(inputText, replaceType);
    document.getElementById('outputText').value = outputText;
});

function processText(text, replaceType) {
    // For simplicity, we will use only one replaceType for now.
    // In the future, you can add different replaceType handling as needed.
    if (replaceType === "1") {
        return transformIframe(text);
    } else {
        // Placeholder for other types
        return "Other replace types not implemented yet.";
    }
}

function transformIframe(htmlContent) {
    const pattern = /<iframe[^>]*src=["']([^"']*)["'][^>]*>/;
    const match = htmlContent.match(pattern);

    if (match) {
        let src = match[1];
        const colorIndex = src.indexOf("&color");
        if (colorIndex !== -1) {
            src = src.substring(0, colorIndex);
        }
        const newParameters = "&color=%23ff5500&inverse=false&auto_play=false&show_user=false";
        const newSrc = `${src}${newParameters}`;
        return `<iframe width="100%" height="20" scrolling="no" frameborder="no" allow="autoplay" src="${newSrc}"></iframe>`;
    } else {
        return "No valid iframe found.";
    }
}
