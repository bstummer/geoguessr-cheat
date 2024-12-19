chrome.webRequest.onCompleted.addListener(async (request) => {
    if (request.method !== "GET" || request.type !== "script" || !request.url.includes("GeoPhotoService")) {
        return
    }
    try {
        const response = await fetch(request.url)
        const data = await response.text()
        const match = data.match(/\[null,null,-?\d*\.\d*,-?\d*\.\d*\]/)
        if (match) {
            const coordHolder = JSON.parse(match[0])
            const coords = coordHolder.slice(2, 4)
            console.log(`https://www.google.com/maps/search/${coords}`)
        }
    } catch (error) {
        console.error("Error fetching or processing request:", error)
    }
}, { urls: ["<all_urls>"] })

console.log("Started")