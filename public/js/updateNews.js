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
  if (message === 'success') {
    const popup = document.getElementsByClassName('popup')[0];
    popup.style.boxShadow = `2px 2px 30px 10px '#078907'`;

    const icon = document.querySelector('.popup .icon');
    icon.style.borderColor = '#078907';

    const iconElement = icon.querySelector('i');
    iconElement.className = 'fa fa-check';
    iconElement.style.color = '#078907';

    const title = document.querySelector('.popup .title');
    title.textContent = 'Success';

    const description = document.querySelector('.popup .description');
    description.textContent = descriptionn;
  } else if (message === 'error') {
    const popup = document.getElementsByClassName('popup')[0];
    popup.style.boxShadow = `2px 2px 30px 10px #FF5733`;

    const icon = document.querySelector('.popup .icon');
    icon.style.borderColor = '#FF5733';

    const iconElement = icon.querySelector('i');
    iconElement.className = 'fa fa-times';
    iconElement.style.color = '#FF5733';

    const title = document.querySelector('.popup .title');
    title.textContent = 'Wasted!!';

    const description = document.querySelector('.popup .description');
    description.textContent = descriptionn;
  }
}

document
  .getElementById('dismiss-popup-btn')
  .addEventListener('click', function () {
    if (flag) {
      window.setTimeout(() => {
        location.assign('/api/career/getalljobs');
      }, 200);
    } else {
      window.setTimeout(() => {
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
  //   const likesElem = document.getElementById('likes');
  //   const viewsElem = document.getElementById('views');
  //   const dateElem = document.getElementById('date');
  const descriptionElem = document.getElementById('description');

  // Create input elements for editing
  const headlineInput = document.createElement('input');
  headlineInput.value = headlineElem.textContent;

  //   const dateInput = document.createElement('input');
  //   dateInput.value = dateElem.textContent;

  const descriptionInput = document.createElement('textarea');
  descriptionInput.value = descriptionElem.textContent;

  // Function to handle editing
  function startEditing() {
    headlineElem.style.display = 'none';
    // dateElem.style.display = 'none';
    descriptionElem.style.display = 'none';

    headlineElem.parentNode.insertBefore(headlineInput, headlineElem);
    // dateElem.parentNode.insertBefore(dateInput, dateElem);
    descriptionElem.parentNode.insertBefore(descriptionInput, descriptionElem);

    editBtn.style.display = 'none';
    confirmBtn.style.display = 'inline';
    cancelBtn.style.display = 'inline';
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
          //   dateElem.textContent = updatedData.date;
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
