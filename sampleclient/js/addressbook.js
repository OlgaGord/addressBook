console.log("oo");
const addressBook = {
    list: "http://localhost:9000/api/addressbook"
};

const entryClick = (el) => {

    // console.log(el);
    console.log(el.dataset["lat"], el.dataset["lng"], el.id);

};

const parent = document.createElement("span");

document.addEventListener("DOMContentLoaded", async () => {

    const elPeople = document.getElementById("people");

    const data = await fetch(addressBook.list);
    const dataJson = await data.json();
    console.log(dataJson);

    dataJson.forEach(element => {
        console.log(element);
        const tEl = document.createElement("div");
        // tEl.innerHTML = element.first + " " + element.last;
        tEl.id = element.personId;
        tEl.dataset["lat"] = element.latlng.coordinates[0];
        tEl.dataset["lng"] = element.latlng.coordinates[1];
        tEl.classList.add("person");


        const name = document.createElement("div");
        name.innerHTML = element.last + ", " + element.first;
        name.classList.add("name");
        // elPeople.appendChild(tEl);
        tEl.appendChild(name);

        const phone = document.createElement("div");
        phone.innerHTML = element.phone;
        phone.classList.add("phone");
        // elPeople.appendChild(tEl);
        tEl.appendChild(phone);

        const address = document.createElement("div");

        address.classList.add("address");

        const addrElements = ["street", "city", "province", "country", "postal_code"];

        addrElements.forEach(e => {
            const el = document.createElement("div");
            el.classList.add(e);
            el.innerHTML = element[e];
            address.appendChild(el);

        });
        tEl.appendChild(address);
        /*
                const city = document.createElement("div");
                // elPeople.appendChild(tEl);
                city.classList.add("city");
                const street = document.createElement("div");
                street.classList.add("street");
                const province = document.createElement("div");
                province.classList.add("province");
                const country = document.createElement("div");
                country.classList.add("country");
                const postal_code = document.createElement("div");
                postal_code.classList.add("postal_code");
        
        
                city.innerHTML = element.city;
                street.innerHTML = element.street;
                province.innerHTML = element.province;
                country.innerHTML = element.country;
                postal_code.innerHTML = element.postal_code;
        
                // tEl.appendChild(address);
                address.appendChild(city);
                address.appendChild(street);
                address.appendChild(province);
                address.appendChild(country);
                address.appendChild(postal_code);
                tEl.appendChild(address);
        */
        tEl.addEventListener("click", () => {
            // console.log("something");
            entryClick(tEl);


        });
        parent.appendChild(tEl);

    });

    elPeople.appendChild(parent);


});
