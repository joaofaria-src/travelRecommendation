// Fetch and handle the JSON data
const fetchData = async () => {
    try {
        const response = await fetch("travel_recommendation_api.json");
        if (!response.ok) throw new Error("Failed to fetch the data.");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching the JSON data:", error);
    }
};

// Search and display results
const searchHandler = async () => {
    const searchInput = document.getElementById("searchInput").value.toLowerCase();
    const resultsContainer = document.getElementById("resultsContainer");
    resultsContainer.innerHTML = ""; // Clear previous results

    if (!searchInput) {
        resultsContainer.innerHTML = `<p>Please enter a keyword to search.</p>`;
        return;
    }

    const data = await fetchData();

    if (data) {
        let recommendations = [];

        // Match countries and cities
        data.countries.forEach(country => {
            if (country.name.toLowerCase().includes(searchInput)) {
                recommendations.push(...country.cities.map(city => ({
                    name: city.name,
                    imageUrl: city.imageUrl,
                    description: city.description
                })));
            }
        });

        // Match temples
        if (searchInput.includes("temple")) {
            recommendations.push(...data.temples);
        }

        // Match beaches
        if (searchInput.includes("beach")) {
            recommendations.push(...data.beaches);
        }

        if (recommendations.length > 0) {
            recommendations.slice(0, 2).forEach(item => {
                const card = `
                    <div class="card">
                        <img src="${item.imageUrl}" alt="${item.name}" class="card-image">
                        <div class="card-content">
                            <h3>${item.name}</h3>
                            <p>${item.description}</p>
                        </div>
                    </div>
                `;
                resultsContainer.innerHTML += card;
            });
        } else {
            resultsContainer.innerHTML = `<p>No results found for "${searchInput}".</p>`;
        }
    }
};

// Clear search results
const clearHandler = () => {
    document.getElementById("searchInput").value = "";
    document.getElementById("resultsContainer").innerHTML = "";
};

// Event Listeners
document.getElementById("searchButton").addEventListener("click", searchHandler);
document.getElementById("clearButton").addEventListener("click", clearHandler);

const searchBar = document.querySelector('.navbar-search');
if (!window.location.pathname.endsWith('travel_recommendation.html')) {
    searchBar.style.display = 'none';
  }