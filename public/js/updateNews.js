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
