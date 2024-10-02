async function fetchCountries() {
    try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();
        const countriesContainer = document.querySelector('.countries');
        const regionSelect = document.querySelector('#region-select');
        const totalCountriesElement = document.querySelector('#total-countries');
        const totalRegionsElement = document.querySelector('#total-regions');
        const regionCountElement = document.querySelector('#region-count');
        const searchInput = document.querySelector('#search-input');

        // Create an object to store countries by region
        const countriesByRegion = {};
        data.forEach(country => {
            const region = country.region;
            if (!countriesByRegion[region]) {
                countriesByRegion[region] = [];
            }
            countriesByRegion[region].push(country);
        });

        // Create a dropdown list of regions
        const regions = Object.keys(countriesByRegion);
        regions.forEach(region => {
            const option = document.createElement('option');
            option.value = region;
            option.text = region;
            regionSelect.appendChild(option);
        });

        // Display total number of countries and regions
        totalCountriesElement.textContent = `Total Countries: ${data.length}`;
        totalRegionsElement.textContent = `Total Regions: ${regions.length}`;

        // Add event listener to region select dropdown
        regionSelect.addEventListener('change', event => {
            const selectedRegion = event.target.value;
            countriesContainer.innerHTML = '';
            const regionCountries = countriesByRegion[selectedRegion];
            regionCountElement.textContent = `Countries in ${selectedRegion}: ${regionCountries.length}`;
            regionCountries.forEach(country => {
                const countryHTML = `
                    <div class="country">
                        <img src="${country.flags.png}" alt="${country.name.common} flag">
                        <h3>${country.name.common}</h3>
                        <p>Population: ${country.population}</p>
                        <p>Region: ${country.region}</p>
                        <p>Capital: ${country.capital}</p>
                    </div>
                `;
                countriesContainer.insertAdjacentHTML('beforeend', countryHTML);
            });
        });

        // Add event listener to search input
        searchInput.addEventListener('input', event => {
            const searchQuery = event.target.value.toLowerCase();
            countriesContainer.innerHTML = '';
            data.forEach(country => {
                if (country.name.common.toLowerCase().includes(searchQuery) || country.region.toLowerCase().includes(searchQuery)) {
                    const countryHTML = `
                        <div class="country">
                            <img src="${country.flags.png}" alt="${country.name.common} flag">
                            <h3>${country.name.common}</h3>
                            <p>Population: ${country.population}</p>
                            <p>Region: ${country.region}</p>
                            <p>Capital: ${country.capital}</p>
                        </div>
                    `;
                    countriesContainer.insertAdjacentHTML('beforeend', countryHTML);
                }
            });
        });

        // Display all countries by default
        data.forEach(country => {
            const countryHTML = `
                <div class="country">
                    <img src="${country.flags.png}" alt="${country.name.common} flag">
                    <h3>${country.name.common}</h3>
                    <p>Population: ${country.population}</p>
                    <p>Region: ${country.region}</p>
                    <p>Capital: ${country.capital}</p>
                </div>
            `;
            countriesContainer.insertAdjacentHTML('beforeend', countryHTML);
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

fetchCountries();