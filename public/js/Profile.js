const title = document.getElementsByClassName('title')[0];
const description = document.getElementsByClassName('description')[0];
let flag = false;

function change() {
  document.getElementsByClassName('popup')[0].classList.add('active');
  for (
    let i = 0;
    i < document.getElementsByClassName('container').length;
    i++
  ) {
    document.getElementsByClassName('container')[i].classList.add('blur');
  }
}

document
  .getElementById('dismiss-popup-btn')
  .addEventListener('click', function () {
    if (flag) {
      window.setTimeout(() => {
        location.assign('/api/users/me');
      }, 200);
    } else {
      window.setTimeout(() => {
        location.assign('');
      }, 200);
    }
  });

let oldImageSrc;
let oldTagValues = {};
const USER = document.querySelector('.container').getAttribute('USER');

// Function to make .tag content editable// Function to make .tag content editable
function makeTagsEditable(editable) {
  const tags = document.querySelectorAll('.details p:last-child');
  tags.forEach((tag) => {
    const previousTagText = tag.previousElementSibling.textContent;
    if (editable) {
      // Store old values
      oldTagValues[previousTagText] = tag.textContent;
      if (previousTagText !== 'Role' && previousTagText !== 'Jobs Applied') {
        tag.contentEditable = 'true';
        tag.style.border = '1px solid rgb(109, 109, 109)'; // Visual indication of editability
        tag.style.padding = '1% 1%';
      }
    } else {
      tag.contentEditable = 'false';
      tag.style.border = 'none';
    }
  });
}

document.getElementById('Edit_image').addEventListener('click', function () {
  oldImageSrc = document.querySelector('.box1 img').src;
  document.getElementById('Edit_image').style.display = 'none';
  var uploads = document.getElementsByClassName('upload');
  for (var i = 0; i < uploads.length; i++) {
    uploads[i].style.display = 'flex';
  }
  console.log(oldImageSrc);
});

document.getElementById('Cancel').addEventListener('click', function () {
  document.querySelector('.box1 img').src = oldImageSrc;
  document.getElementById('Edit_image').style.display = 'block';
  var uploads = document.getElementsByClassName('upload');
  for (var i = 0; i < uploads.length; i++) {
    uploads[i].style.display = 'none';
  }
  console.log(oldImageSrc);
});

document.getElementById('Confrim').addEventListener('click', function () {
  document.getElementById('Edit_image').style.display = 'block';
  var uploads = document.getElementsByClassName('upload');
  for (var i = 0; i < uploads.length; i++) {
    uploads[i].style.display = 'none';
  }
});

document
  .getElementById('fileInput')
  .addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (
      file &&
      (file.type === 'image/png' ||
        file.type === 'image/jpeg' ||
        file.type === 'image/jpg')
    ) {
      const reader = new FileReader();
      reader.onload = function (e) {
        document.querySelector('.box1 img').src = e.target.result;
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please select a valid image file (png, jpg, jpeg).');
      event.target.value = ''; // Clear the file input
    }
  });

document.getElementById('Edit_Content').addEventListener('click', function () {
  document.getElementById('Edit_Content').style.display = 'none';
  makeTagsEditable(true);
  var uploads = document.getElementsByClassName('upload1');
  for (var i = 0; i < uploads.length; i++) {
    uploads[i].style.display = 'block';
  }
});

document.getElementById('Cancel_1').addEventListener('click', function () {
  // Restore old values
  const tags = document.querySelectorAll('.details p:last-child');
  tags.forEach((tag) => {
    tag.textContent = oldTagValues[tag.previousElementSibling.textContent];
    tag.style.padding = '0% 0%';
  });

  document.getElementById('Edit_Content').style.display = 'block';
  makeTagsEditable(false);
  var uploads = document.getElementsByClassName('upload1');
  for (var i = 0; i < uploads.length; i++) {
    uploads[i].style.display = 'none';
  }
});

document.getElementById('Confrim_1').addEventListener('click', function () {
  document.getElementById('Edit_Content').style.display = 'block';
  makeTagsEditable(false);
  var uploads = document.getElementsByClassName('upload1');
  for (var i = 0; i < uploads.length; i++) {
    uploads[i].style.display = 'none';
  }
});

function openCity(cityName) {
  // Declare all variables
  var i, tabcontent;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName('tabcontent');
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = 'none';
    console.log(tabcontent[i].style.display);
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(cityName).style.display = 'block';
  // evt.currentTarget.className += ' active';
}

const buttons = document.querySelectorAll('.buttons div');

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    openCity(button.innerHTML);
    console.log(button.innerHTML);
  });
});

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    buttons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');
  });
});

// Click the first div
buttons[0].click();

const dropdownLinks = document.querySelectorAll('.dropdown-content a');
const dropbtn = document.querySelector('.dropbtn');
const tableHeaders = document.querySelectorAll('thead th');

const tableRows = document.querySelectorAll('tbody tr');

const columnMapping = {
  name: 1,
  email: 2,
  'job-role': 3,
};

dropdownLinks.forEach((link) => {
  link.addEventListener('click', function (event) {
    event.preventDefault(); // Prevent the default action of the link

    // Replace the button's HTML with the clicked link's HTML
    dropbtn.innerHTML = this.innerHTML;

    const [key, order] = this.dataset.sort.split('-');
    const columnIndex = columnMapping[key];
    const sortAsc = order === 'asc';

    // Trigger sorting
    console.log(columnIndex, sortAsc);
    sortTable(columnIndex, sortAsc);
  });
});

// Define column mappings for each table
const columnMappings = {
  customers_table_1: {
    Profile: 0,
    Name: 1,
    Email: 2,
    'Job-role': 3,
    Confirm: 4,
    Cancel: 5,
  },
  customers_table_2: {
    Profile: 0,
    Name: 1,
    Email: 2,
    Demote: 3,
    Delete: 4,
  },
  customers_table_3: {
    Profile: 0,
    Name: 1,
    Email: 2,
    Promote: 3,
    Delete: 4,
  },
  customers_table_4: {
    Index: 0,
    Title: 1,
    Description: 2,
  },
  customers_table_5: {
    Date: 0,
    Time: 1,
    Job: 2,
    Status: 3,
  },
  // Add mappings for other tables as needed
};

document.getElementById('Confrim').addEventListener('click', async (e) => {
  change();
  try {
    e.preventDefault();
    const form = new FormData();
    form.append('photo', document.getElementById('fileInput').files[0]);
    const res = await fetch('/api/users/updateMe', {
      method: 'PATCH',
      body: form,
    });

    const data = await res.json();

    if (res.ok && data.status === 'success') {
      description.innerHTML = `Profile Edited Successfully.`;
      flag = true;
    } else {
      title.innerHTML = `Error`;
      description.innerHTML = `${data.message}`;
      flag = false;
    }
  } catch (err) {
    title.innerHTML = `Title`;
    description.innerHTML = `${err}`;
    flag = false;
  }
});

document.getElementById('Confrim_1').addEventListener('click', async (e) => {
  change();
  try {
    e.preventDefault();
    const form = new FormData();

    form.append('name', document.getElementById('namee').innerHTML);
    form.append('email', document.getElementById('emaill').innerHTML);

    const res = await fetch('/api/users/updateMe', {
      method: 'PATCH',
      body: form,
    });
    const data = await res.json();

    if (res.ok && data.status === 'success') {
      description.innerHTML = `Profile Edited Successfully.`;
      flag = true;
    } else {
      title.innerHTML = `Error`;
      description.innerHTML = `${data.message}`;
      flag = false;
    }
  } catch (err) {
    title.innerHTML = `Error`;
    description.innerHTML = `${err}`;
    flag = false;
  }
});

document.querySelector('.add').addEventListener('click', (e) => {
  location.assign('/api/users/addadmin');
});
