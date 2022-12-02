// console.log("Hello There")

let contentDiv = document.getElementById("content");

function displayData(data) {
    data.forEach((toilet) => {
        let toiletDiv = document.createElement("div");
        toiletDiv.classList.add("toilet");
        let nameP = document.createElement("p");
        nameP.textContent = toilet.Name;
        addressDiv = document.createElement("div");
        addressDiv.classList.add("address");
        addressDiv.innerHTML = `<p>${toilet.Address1}</p><p>${toilet.Town} ${toilet.Postcode}</p>`;
        toiletDiv.appendChild(nameP);
        toiletDiv.appendChild(addressDiv);
        contentDiv.appendChild(toiletDiv);
    })
}

function arrangeDataByPostcode(data) {
    let dataByPostcode = {};
    data.forEach((toilet) => {
        let postcode = toilet.Postcode
        let entry = {name: toilet.Name, address: toilet.Address1, town: toilet.Town};
        dataByPostcode.hasOwnProperty(postcode) 
            ? dataByPostcode[postcode].push(entry)
            : dataByPostcode[postcode] = [entry]
    })
    return dataByPostcode; 
}
function displayDataByPostcode(data) {
    const toiletsByPostcode = arrangeDataByPostcode(data)
    Object.entries(toiletsByPostcode).forEach(([postcode,toilets]) => {
        let postcodeDiv = document.createElement("div");
        postcodeDiv.classList.add("postcode")
        let postcodeH = document.createElement("h2");
        postcodeH.textContent = postcode;
        postcodeDiv.appendChild(postcodeH);
        toilets.forEach((toilet) => {

            let toiletDiv = document.createElement("div");
            toiletDiv.classList.add("toilet");
            let nameP = document.createElement("p");
            nameP.textContent = toilet.name;
            addressDiv = document.createElement("div");
            addressDiv.classList.add("address");
            addressDiv.innerHTML = `<p>${toilet.address}</p><p>${toilet.town}</p>`;
            toiletDiv.appendChild(nameP);
            toiletDiv.appendChild(addressDiv);
            postcodeDiv.appendChild(toiletDiv);
        })
        contentDiv.appendChild(postcodeDiv);
    })
}

Papa.parse("https://data.gov.au/data/dataset/553b3049-2b8b-46a2-95e6-640d7986a8c1/resource/34076296-6692-4e30-b627-67b7c4eb1027/download/toiletmapexport_200702_111356.csv", {
    download: true,
    header: true,
    complete: function (results) {
        // To see the data that a public toilet has in this API, 
        // check the browser console!
        console.log(results.data[1]);
        // displayData(results.data);  
        // To see implemented with the bonus, 
        // comment out the line above and uncomment the line below.
        displayDataByPostcode(results.data);              
    }
});

