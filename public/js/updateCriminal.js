document.addEventListener('DOMContentLoaded', () => {
  const editBtn = document.getElementById('edit-btn');
  const confirmBtn = document.getElementById('confirm-btn');
  const cancelBtn = document.getElementById('cancel-btn');
  const idd = document.querySelector('.container').getAttribute('ID');

  const nameElem = document.getElementById('name');
  const totalCrimesElem = document.getElementById('total-crimes');
  const heightElem = document.getElementById('height');
  const genderElem = document.getElementById('gender');
  const pricepoolElem = document.getElementById('pricepool');
  const descriptionElem = document.getElementById('description');

  // Create input elements for editing
  const nameInput = document.createElement('input');
  nameInput.value = nameElem.textContent;

  const totalCrimesInput = document.createElement('input');
  totalCrimesInput.value = totalCrimesElem.textContent;

  const heightInput = document.createElement('input');
  heightInput.value = heightElem.textContent;

  const genderInput = document.createElement('input');
  genderInput.value = genderElem.textContent;

  const pricepoolInput = document.createElement('input');
  pricepoolInput.value = pricepoolElem.textContent;

  const descriptionInput = document.createElement('textarea');
  descriptionInput.value = descriptionElem.textContent;

  // Function to copy styles from one element to another
  function copyStyles(fromElem, toElem) {
    const computedStyle = window.getComputedStyle(fromElem);
    toElem.style.fontFamily = computedStyle.fontFamily;
    toElem.style.fontSize = computedStyle.fontSize;
    toElem.style.fontWeight = computedStyle.fontWeight;
    toElem.style.lineHeight = computedStyle.lineHeight;
    toElem.style.letterSpacing = computedStyle.letterSpacing;
    toElem.style.margin = computedStyle.margin;
    toElem.style.padding = computedStyle.padding;
    toElem.style.backgroundColor = 'rgb(74, 74, 74)';
    toElem.style.color = 'black';
  }

  // Function to handle editing
  function startEditing() {
    // Set the height and styles of descriptionInput to match descriptionElem
    descriptionInput.style.height = `${descriptionElem.clientHeight}px`;
    nameInput.style.textAlign = "center"
    copyStyles(descriptionElem, descriptionInput);
    copyStyles(nameElem, nameInput);
    copyStyles(totalCrimesElem, totalCrimesInput);
    copyStyles(heightElem, heightInput);
    copyStyles(genderElem, genderInput);
    copyStyles(pricepoolElem, pricepoolInput);

    nameElem.style.display = 'none';
    totalCrimesElem.style.display = 'none';
    heightElem.style.display = 'none';
    genderElem.style.display = 'none';
    pricepoolElem.style.display = 'none';
    descriptionElem.style.display = 'none';

    nameElem.parentNode.insertBefore(nameInput, nameElem);
    totalCrimesElem.parentNode.insertBefore(totalCrimesInput, totalCrimesElem);
    heightElem.parentNode.insertBefore(heightInput, heightElem);
    genderElem.parentNode.insertBefore(genderInput, genderElem);
    pricepoolElem.parentNode.insertBefore(pricepoolInput, pricepoolElem);
    descriptionElem.parentNode.insertBefore(descriptionInput, descriptionElem);

    editBtn.style.display = 'none';
    confirmBtn.style.display = 'inline';
    cancelBtn.style.display = 'inline';
  }

  // Function to handle confirmation
  function confirmChanges() {
    const updatedData = {
      name: nameInput.value,
      noOfCrimes: totalCrimesInput.value,
      height: heightInput.value,
      gender: genderInput.value,
      pricepool: pricepoolInput.value,
      description: descriptionInput.value,
    };

    // Assuming you have an endpoint to save the changes
    fetch(`/api/wanted/updatecriminal/${idd}`, {
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
          nameElem.textContent = updatedData.name;
          totalCrimesElem.textContent = updatedData.noOfCrimes;
          heightElem.textContent = updatedData.height;
          genderElem.textContent = updatedData.gender;
          pricepoolElem.textContent = updatedData.pricepool;
          descriptionElem.textContent = updatedData.description;
          cancelEditing();
        } else {
          console.log(data.message);
        }
      })
      .catch((error) => console.error('Error:', error));
  }

  // Function to handle canceling
  function cancelEditing() {
    nameElem.style.display = 'inline';
    totalCrimesElem.style.display = 'inline';
    heightElem.style.display = 'inline';
    genderElem.style.display = 'inline';
    pricepoolElem.style.display = 'inline';
    descriptionElem.style.display = 'inline';

    nameInput.remove();
    totalCrimesInput.remove();
    heightInput.remove();
    genderInput.remove();
    pricepoolInput.remove();
    descriptionInput.remove();

    editBtn.style.display = 'inline';
    confirmBtn.style.display = 'none';
    cancelBtn.style.display = 'none';
  }

  editBtn.addEventListener('click', startEditing);
  confirmBtn.addEventListener('click', confirmChanges);
  cancelBtn.addEventListener('click', cancelEditing);
});
