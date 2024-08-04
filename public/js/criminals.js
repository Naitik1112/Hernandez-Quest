// Select the search input element
const searchInput = document.querySelector('.input-group input');

// Add an event listener for the 'input' event
searchInput.addEventListener('input', function () {
  const query = searchInput.value.trim();

  // Determine the endpoint based on whether the search query is empty
  const endpoint =
    query.length > 0
      ? `/api/wanted/wantedlist?name=${encodeURIComponent(query)}`
      : '/api/wanted/wantedlist';

  // Make a fetch request to the appropriate endpoint
  fetch(endpoint)
    .then((response) => response.json())
    .then((data) => {
      // Clear the existing table body
      const tableBody = document.querySelector('#datatable');
      tableBody.innerHTML = '';

      // Iterate over the results and populate the table
      data.tour.forEach((criminal) => {
        const row = document.createElement('tr');

        row.innerHTML = `
          <td><img src="/Img/Gta_world_3.jpg" alt=""></td>
          <td>${criminal.name}</td>
          <td>${criminal.noOfCrimes}</td>
          <td>${criminal.pricepool}</td>
          <td><a href=/api/wanted/${criminal.slug}><img class="scale" src="/Icons/Info.png" alt=""></a></td>
        `;

        tableBody.appendChild(row);
      });
    })
    .catch((error) => console.error('Error fetching data:', error));
});
