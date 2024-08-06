const title = document.getElementsByClassName('title')[0];
const description = document.getElementsByClassName('description')[0];
let flag = false;

function change() {
  document.getElementsByClassName('popup')[0].classList.add('active');
  for (let i = 0; i < document.getElementsByClassName('center').length; i++) {
    document.getElementsByClassName('center')[i].classList.add('blur');
  }
  document.body.classList.add('no-scroll');
}

function customizePopup(message, descriptionn) {
  const popup = document.getElementsByClassName('popup')[0];
  const icon = document.querySelector('.popup .icon');
  const iconElement = icon.querySelector('i');
  const title = document.querySelector('.popup .title');
  const description = document.querySelector('.popup .description');

  if (message === 'success') {
    popup.style.boxShadow = '2px 2px 30px 10px #078907';
    icon.style.borderColor = '#078907';
    iconElement.className = 'fa fa-check';
    iconElement.style.color = '#078907';
    title.textContent = 'Success';
  } else if (message === 'error') {
    popup.style.boxShadow = '2px 2px 30px 10px #FF5733';
    icon.style.borderColor = '#FF5733';
    iconElement.className = 'fa fa-times';
    iconElement.style.color = '#FF5733';
    title.textContent = 'Wasted!!';
  }

  description.textContent = descriptionn;
}

document.getElementById('dismiss-popup-btn').addEventListener('click', function () {
  if (flag) {
    setTimeout(() => {
      location.assign('/api/career/getalljobs');
    }, 200);
  } else {
    setTimeout(() => {
      location.assign('');
    }, 200);
  }
  document.body.classList.remove('no-scroll');
});

document.addEventListener('DOMContentLoaded', () => {
  const editBtn = document.getElementById('edit-btn');
  const confirmBtn = document.getElementById('confirm-btn');
  const cancelBtn = document.getElementById('cancel-btn');
  const idd = document.querySelector('.center').getAttribute('ID');
  const headlineElem = document.getElementById('headline');
  const descriptionElem = document.getElementById('description');

  // Create input elements for editing
  const headlineInput = document.createElement('input');
  const descriptionInput = document.createElement('textarea');

  // Function to copy styles from one element to another
  function copyStyles(source, target) {
    const computedStyle = window.getComputedStyle(source);
    for (let key of computedStyle) {
      target.style[key] = computedStyle[key];
    }
    target.style.border = '1px solid white'; // Adding white border
  }

  // Function to handle editing
  function startEditing() {
    copyStyles(headlineElem, headlineInput);
    copyStyles(descriptionElem, descriptionInput);

    headlineInput.value = headlineElem.textContent;
    descriptionInput.value = descriptionElem.textContent;

    headlineElem.style.display = 'none';
    descriptionElem.style.display = 'none';

    headlineElem.parentNode.insertBefore(headlineInput, headlineElem);
    descriptionElem.parentNode.insertBefore(descriptionInput, descriptionElem);

    editBtn.style.display = 'none';
    document.getElementById("confrim_cancel").style.display = "flex";
    confirmBtn.style.borderColor = "green";
    confirmBtn.style.color = "green"
    cancelBtn.style.borderColor = "red";
    cancelBtn.style.color = "red";

  }

  // Function to handle confirmation
  function confirmChanges() {
    const updatedData = {
      headline: headlineInput.value,
      description: descriptionInput.value,
    };
    console.log(updatedData);

    // Assuming you have an endpoint to save the changes
    fetch(`/api/news/${idd}/editnews`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.status === 'success') {
        headlineElem.textContent = updatedData.headline;
        descriptionElem.textContent = updatedData.description;
        cancelEditing();
      } else {
        alert('Failed to update. Please try again.');
      }
    })
    .catch((error) => console.error('Error:', error));
  }

  // Function to handle canceling
  function cancelEditing() {
    location.assign(`/api/news/${idd}`);
  }

  editBtn.addEventListener('click', startEditing);
  confirmBtn.addEventListener('click', confirmChanges);
  cancelBtn.addEventListener('click', cancelEditing);
});
