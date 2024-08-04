const USer = document.querySelector('.container').getAttribute('USER');

if (USer === 'Admin') {
  async function populateTable1(tableId) {
    const tbody = document.getElementById(tableId);
    tbody.innerHTML = ''; // Clear any existing rows

    await fetch('http://127.0.0.1:3100/api/career/me/getallappliedjobs')
      .then((response) => response.json())
      .then((data) => {
        for (let i = 0; i < data.data.length; i++) {
          const row = data.data.result[i];
          const tr = document.createElement('tr');
          tr.innerHTML = `
                              <td>${row.userName}</td>
                              <td>${row.userEmail}</td>
                              <td>${row.applicationCount}</td>
                              <td>
                                <a href=${`/api/users/getuserallapplications/${row.user_id}`}>
                                  <img src="/Icons/Info.png" alt="">
                                </a>
                              </td>
                            `;
          tbody.appendChild(tr);
        }
      })
      .catch((err) => console.log('error: ', err));
  }

  async function populateTable2(tableId) {
    const tbody = document.getElementById(tableId);
    tbody.innerHTML = ''; // Clear any existing rows

    await fetch('http://127.0.0.1:3100/api/users/getalluser')
      .then((response) => response.json())
      .then((data) => {
        for (let row in data.data.doc) {
          if (data.data.doc[row].role === 'Admin') {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                                <td><img src=/images/users/${data.data.doc[row].photo} alt=""></td>
                                <td>${data.data.doc[row].name}</td>
                                <td>${data.data.doc[row].email}</td>
                                <td id = "resize" >
                                    <a href=/api/users/deleteadmin/${data.data.doc[row]._id}>
                                        <img src="/Icons/Delete.png" alt="">
                                    </a>
                                </td>
                            `;
            tbody.appendChild(tr);
          }
        }
      })
      .catch((err) => console.log('error: ', err));
  }

  async function populateTable3(tableId) {
    const tbody = document.getElementById(tableId);
    tbody.innerHTML = '';

    await fetch('http://127.0.0.1:3100/api/users/getalluser')
      .then((response) => response.json())
      .then((data) => {
        for (let row in data.data.doc) {
          if (data.data.doc[row].role === 'User') {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                                <td><img src=/images/users/${data.data.doc[row].photo} alt=""></td>
                                <td>${data.data.doc[row].name}</td>
                                <td>${data.data.doc[row].email}</td>
                                <td id = "resize" >
                                    <a href=/api/users/deleteuser/${data.data.doc[row]._id}>
                                        <img src="/Icons/Delete.png" alt="">
                                    </a>
                                </td>
                            `;
            tbody.appendChild(tr);
          }
        }
      })
      .catch((err) => console.log('error: ', err));
  }

  async function populateTable4(tableId) {
    const tbody = document.getElementById(tableId);
    tbody.innerHTML = '';

    await fetch('http://127.0.0.1:3100/api/tip/getalltip')
      .then((response) => response.json())
      .then((data) => {
        for (let row in data.data.doc) {
          const tr = document.createElement('tr');
          tr.innerHTML = `
                            <td>${row}</td>
                            <td>${data.data.doc[row].title}</td>
                            <td>${data.data.doc[row].description}</td>
                        `;
          tbody.appendChild(tr);
        }
      })
      .catch((err) => console.log('error: ', err));
  }
  // 127.0.0.1:3100/api/career/me/getappliedjobs

  // Populate all tables
  populateTable1('datatable_1');
  populateTable2('datatable_2');
  populateTable3('datatable_3');
  populateTable4('datatable_4');

  //Searching Feature

  // Select all search inputs
} else {
  async function populateTable5(tableId) {
    const tbody = document.getElementById(tableId);
    tbody.innerHTML = '';
    await fetch('http://127.0.0.1:3100/api/career/me/getappliedjobs')
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data.applications);
        for (let i = 0; i < data.data.length; i++) {
          const row = data.data.doc[i];
          const tr = document.createElement('tr');
          tr.innerHTML = `
              <td>${row.date}</td>
              <td>${row.time}</td>
              <td>${data.data.applications[i].job_name}</td>
              <td>${row.status}</td>
            `;
          tbody.appendChild(tr);
        }
      })
      .catch((err) => console.log('error: ', err));
  }

  populateTable5('datatable_5');
}

const searchInputs = document.querySelectorAll('.input-group input');

// Iterate over each search input and add event listener
searchInputs.forEach((input, index) => {
  input.addEventListener('input', () => {
    searchTable(input, index + 1);
  });
});

function searchTable(input, tableIndex) {
  // Select all rows in the respective table
  const table_rows = document.querySelectorAll(`#datatable_${tableIndex} tr`);

  table_rows.forEach((row, i) => {
    let table_data = row.textContent.toLowerCase(),
      search_data = input.value.toLowerCase();

    row.classList.toggle('hide', table_data.indexOf(search_data) < 0);
    row.style.setProperty('--delay', i / 25 + 's');
  });

  document
    .querySelectorAll(`#datatable_${tableIndex} tr:not(.hide)`)
    .forEach((visible_row, i) => {
      visible_row.style.backgroundColor =
        i % 2 == 0 ? 'transparent' : '#0000000b';
    });
}
