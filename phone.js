const loadPhone = async (searchText, isShowAll) => {
    const res = await fetch(
        `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    );
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones, isShowAll);
    toggleLoadingSpinner(false);
};

const displayPhones = (phones, isShowAll) => {
    const phoneContainer = document.getElementById("phone-container");
    phoneContainer.innerHTML = ""; // clear previous results
    const showAllContainer = document.getElementById("show-all-container");
    const showLessContainer = document.getElementById("show-less-container");
    if (phones.length > 16 && !isShowAll) {
        showAllContainer.classList.remove("hidden");
        showLessContainer.classList.add("hidden");
    } else {
        showAllContainer.classList.add("hidden");
        showLessContainer.classList.remove("hidden");
    }
    if (!isShowAll) {
        phones = phones.slice(0, 16); // show only 16 phones
    }
    phones.forEach((phone) => {
        const phoneCard = document.createElement("div");
        phoneCard.classList = `card bg-base-100 w-90 shadow-lg p-5`;
        phoneCard.innerHTML = `
            <h2 class="text-center font-bold text-4xl text-orange-500 mt-5">${phone.brand}</h2>
            <figure class="px-10 pt-10">
                <img src="${phone.image}" alt="Phone" class="rounded-xl" />
            </figure>
            <div class="card-body items-center text-center">
                <h2 class="card-title">${phone.phone_name}</h2>
                <div class="card-actions mt-5">
                    <button onclick="handleShowDetails('${phone.slug}');show_details.showModal()" class="btn btn-primary">See Details</button>
                </div>
            </div>`;
        phoneContainer.appendChild(phoneCard);
    });
};

const handleSearch = (isShowAll) => {
    toggleLoadingSpinner(true);
    const searchField = document.getElementById("search-field");
    const searchText = searchField.value.trim();
    console.log(searchText);
    loadPhone(searchText, isShowAll);
};

const toggleLoadingSpinner = (isLoading) => {
    const loadingspinner = document.getElementById("loading-spinner");
    if (isLoading) {
        loadingspinner.classList.remove("hidden");
    } else {
        loadingspinner.classList.add("hidden");
    }
};

const handleShowAll = () => {
    handleSearch(true);
};

const handleShowLess = () => {
    handleSearch(false);
};

const handleShowDetails = async (id) => {
    const res = await fetch(
        `https://openapi.programming-hero.com/api/phone/${id}`
    );
    const data = await res.json();
    const phone = data.data;
    showDetails(phone);
};

const showDetails = (phone) => {
    const showDetailsContainer = document.getElementById('show-details-container');
    showDetailsContainer.innerHTML = `
        <div class="text center items-center justify-center m-1 p-5 space-y-2">
            <h2 class="font-bold text-xl text-orange-500 mt-5">${phone.slug}</h2>
            <figure class="flex justify-center my-5">
                <img src="${phone.image}" alt="Phone" class="rounded-xl" />
            </figure>
            <p><span class="font-bold">Storage : </span>${phone?.mainFeatures?.storage}</p>
            <p><span class="font-bold">Display Size : </span>${phone?.mainFeatures?.displaySize}</p>
            <p><span class="font-bold">ROM RAM : </span>${phone?.mainFeatures?.memory}</p>
            <p><span class="font-bold">Chipset : </span>${phone?.mainFeatures?.chipSet}</p>
            <p><span class="font-bold">Sensors : </span>${phone?.mainFeatures?.sensors}</p>
            <p><span class="font-bold">Release Date : </span>${phone?.releaseDate}</p>
            <p><span class="font-bold">Features : </span>${phone?.others.WLAN}</p>
        </div>   
    `;
    show_details.showModal();
}
