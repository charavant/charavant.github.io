document.getElementById('startButton').addEventListener('click', () => {
    const inputText = document.getElementById('inputText').value;
    const replaceType = document.getElementById('replaceType').value;
    const outputText = processText(inputText, replaceType);
    document.getElementById('outputText').value = outputText;
});

function processText(text, replaceType) {
    switch (replaceType) {
        case "Songs":
            return transformIframe(text, "Songs");
        case "Story":
            return transformIframe(text, "Story");
        case "PendingCategory":
            return transformIframe(text, "PendingCategory");
        default:
            return "Invalid replace type selected.";
    }
}

function transformIframe(htmlContent, type) {
    const pattern = /<iframe[^>]*src=["']([^"']*)["'][^>]*>/;
    const match = htmlContent.match(pattern);

    if (match) {
        let src = match[1];
        const colorIndex = src.indexOf("&color");
        if (colorIndex !== -1) {
            src = src.substring(0, colorIndex);
        }
        let newParameters;
        switch (type) {
            case "Songs":
                newParameters = "&color=%23ff5500&inverse=false&auto_play=false&show_user=false";
                break;
            case "Story":
                newParameters = "&color=%2300ff00&inverse=true&auto_play=true&show_user=true";
                break;
            case "PendingCategory":
                newParameters = "&color=%230000ff&inverse=false&auto_play=true&show_user=false";
                break;
            default:
                newParameters = "";
        }
        const newSrc = `${src}${newParameters}`;
        return `<iframe width="100%" height="20" scrolling="no" frameborder="no" allow="autoplay" src="${newSrc}"></iframe>`;
    } else {
        return "No valid iframe found.";
    }
}
