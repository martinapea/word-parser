function countWordForms(text) {
    // let wordsWithoutSymbols = text.replace(/[\.\,\«\»\?\-\!\;\n\r\(\)\{\}\[\]\–\:]/g, " ").toLowerCase()
    let wordsWithoutSymbols = text.replace(/[^A-Za-zА-Яа-я0-9]/g, " ").toLowerCase()

    let words = wordsWithoutSymbols.split(" ")
    words = words.filter(item => item !== "")
    let counterWords = {}
    words.forEach(word => {
        if (Object.keys(counterWords).includes(word)) {
            counterWords[word] += 1
        } else {
            counterWords[word] = 1
        }
    })
    return counterWords
}

document.getElementById("fileInput").addEventListener("change", () => {
    const fileInput = document.getElementById("fileInput")
    if (fileInput.files.length > 0) {
        const selectedFile = fileInput.files[0]
        const reader = new FileReader()
        reader.onload = (event) => {
            const fileContent = event.target.result
            let pairs = Object.entries(countWordForms(fileContent))
            const pairsSort = pairs.sort(function (pair1, pair2) {
                return pair1[1] - pair2[1]
            })
            document.getElementById("content").textContent = fileContent
            pairsSort.reverse().forEach((item) => {
                const pair = `${item[0]}: ${item[1]}`
                const div = document.createElement("div")
                document.getElementById("pairsText").append(div)
                div.textContent = pair
            })
        }
        reader.readAsText(selectedFile)
    }

})