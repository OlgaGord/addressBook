// console.log("oo");

mapboxgl.accessToken =
    'pk.eyJ1Ijoib2dvMTIzIiwiYSI6ImNqdnh6OXN3eTA4aDQ0OXM3ZXpiNDFmZW0ifQ.QmSIcOHd48rHQEZJb0WU6Q';

const addressBook = {
    list: "http://localhost:9000/api/addressbook",
    add: "http://localhost:9000/api/addressbook/addAddress"
};

const initMap = container => {
    const map = new mapboxgl.Map({
        container: container,
        style: 'mapbox://styles/ogo123/cjvxzfx1i6jd61cqio0wrsd4w',
        center: [2.317600, 48.866500],
        zoom: 12.0
    });
    return map;
};



const entryClick = (map, el) => {

    console.log(el);
    console.log(el.dataset["lat"], el.dataset["lng"], el.id);
    if (el.dataset["lat"] !== undefined && el.dataset["lng"] !== undefined) {
        map.easeTo({ center: [el.dataset["lng"], el.dataset["lat"]] });
    }
};


document.addEventListener("DOMContentLoaded", async () => {

    //get container for addresses 
    //el to optimize rendering
    const elPeople = document.getElementById("people");
    const parent = document.createElement("span");
    //a button on the entry form to save entry
    const btnAddEntryEl = document.getElementById("btnEntryFormAdd");
    console.log("hi", btnAddEntryEl)

    let map = initMap("map");
    let markers = [];

    btnAddEntryEl.addEventListener("click", async () => {
        console.log("hi!");
        let formEls = document.querySelectorAll("#entryFormForm input[type='text']");

        let postData = {};
        for (let i = 0; i < formEls.length; i++) {
            if (formEls[i].name.value.trim() !== "") {
                postData[formEls[i].name] = formEls[i].value;
            }
        }
        console.log(postData);
        const data = await fetch(addressBook.add,
            { method: "POST" });
        const dataJson = await data.json();

    });

    const data = await fetch(addressBook.list);
    const dataJson = await data.json();
    console.log(dataJson);

    dataJson.forEach(element => {
        console.log(element);

        let tmpMarker = new mapboxgl.Marker()
            .setLngLat([element.latlng.coordinates[1], element.latlng.coordinates[0]])
            .addTo(map);

        markers.push(tmpMarker);

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
            entryClick(map, tEl);


        });
        parent.appendChild(tEl);

    });

    elPeople.appendChild(parent);


});
