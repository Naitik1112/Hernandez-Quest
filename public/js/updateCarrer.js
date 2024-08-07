document.addEventListener('DOMContentLoaded', () => {
  const editBtn = document.getElementById('edit-btn');
  const confirmBtn = document.getElementById('confirm-btn');
  const cancelBtn = document.getElementById('cancel-btn');
  const idd = document.querySelector('.Quicklinks').getAttribute('ID');

  const descriptionElem = document.getElementById('description');
  const departmentElem = document.getElementById('department');
  const salaryElem = document.getElementById('salary');
  const benefitsElem = document.getElementById('benefits');
  const educationElem = document.getElementById('education');
  const experienceElem = document.getElementById('experience');
  const skillsElem = document.getElementById('skills');
  const otherreqElem = document.getElementById('otherreq');
  const applicationProcessElem = document.getElementById('application_process');

  // Create input elements for editing
  const descriptionInput = document.createElement('textarea');
  const departmentInput = document.createElement('input');
  const salaryInput = document.createElement('input');
  const benefitsInput = document.createElement('textarea');
  const educationInput = document.createElement('textarea');
  const experienceInput = document.createElement('textarea');
  const skillsInput = document.createElement('textarea');
  const otherreqInput = document.createElement('textarea');
  const applicationProcessInput = document.createElement('textarea');

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
    copyStyles(descriptionElem, descriptionInput);
    copyStyles(departmentElem, departmentInput);
    copyStyles(salaryElem, salaryInput);
    copyStyles(benefitsElem, benefitsInput);
    copyStyles(educationElem, educationInput);
    copyStyles(experienceElem, experienceInput);
    copyStyles(skillsElem, skillsInput);
    copyStyles(otherreqElem, otherreqInput);
    copyStyles(applicationProcessElem, applicationProcessInput);

    descriptionInput.value = descriptionElem.textContent;
    departmentInput.value = departmentElem.textContent;
    salaryInput.value = salaryElem.textContent.replace('Salary: ', '');
    benefitsInput.value = Array.from(benefitsElem.querySelectorAll('li')).map((li) => li.textContent).join('\n');
    educationInput.value = educationElem.textContent;
    experienceInput.value = experienceElem.textContent;
    skillsInput.value = Array.from(skillsElem.querySelectorAll('li')).map((li) => li.textContent).join('\n');
    otherreqInput.value = Array.from(otherreqElem.querySelectorAll('li')).map((li) => li.textContent).join('\n');
    applicationProcessInput.value = Array.from(applicationProcessElem.querySelectorAll('li')).map((li) => li.textContent).join('\n');

    descriptionElem.style.display = 'none';
    departmentElem.style.display = 'none';
    salaryElem.style.display = 'none';
    benefitsElem.style.display = 'none';
    educationElem.style.display = 'none';
    experienceElem.style.display = 'none';
    skillsElem.style.display = 'none';
    otherreqElem.style.display = 'none';
    applicationProcessElem.style.display = 'none';

    descriptionElem.parentNode.insertBefore(descriptionInput, descriptionElem);
    departmentElem.parentNode.insertBefore(departmentInput, departmentElem);
    salaryElem.parentNode.insertBefore(salaryInput, salaryElem);
    benefitsElem.parentNode.insertBefore(benefitsInput, benefitsElem);
    educationElem.parentNode.insertBefore(educationInput, educationElem);
    experienceElem.parentNode.insertBefore(experienceInput, experienceElem);
    skillsElem.parentNode.insertBefore(skillsInput, skillsElem);
    otherreqElem.parentNode.insertBefore(otherreqInput, otherreqElem);
    applicationProcessElem.parentNode.insertBefore(applicationProcessInput, applicationProcessElem);

    editBtn.style.display = 'none';
    confirmBtn.style.display = 'inline';
    cancelBtn.style.display = 'inline';
  }

  // Function to handle confirmation
  function confirmChanges() {
    const updatedData = {
      description: descriptionInput.value,
      department: departmentInput.value,
      salary: salaryInput.value,
      benefits: benefitsInput.value.split('\n'),
      education: educationInput.value,
      experience: experienceInput.value,
      skills: skillsInput.value.split('\n'),
      otherreq: otherreqInput.value.split('\n'),
      application_process: applicationProcessInput.value.split('\n'),
    };

    // Assuming you have an endpoint to save the changes
    fetch(`${idd}/updatecareer`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'success') {
          descriptionElem.textContent = updatedData.description;
          departmentElem.textContent = updatedData.department;
          salaryElem.textContent = `Salary: ${updatedData.salary}`;
          benefitsElem.innerHTML = '';
          updatedData.benefits.forEach((benefit) => {
            const li = document.createElement('li');
            li.textContent = benefit;
            benefitsElem.appendChild(li);
          });
          educationElem.textContent = updatedData.education;
          experienceElem.textContent = updatedData.experience;
          skillsElem.innerHTML = '';
          updatedData.skills.forEach((skill) => {
            const li = document.createElement('li');
            li.textContent = skill;
            skillsElem.appendChild(li);
          });
          otherreqElem.innerHTML = '';
          updatedData.otherreq.forEach((req) => {
            const li = document.createElement('li');
            li.textContent = req;
            otherreqElem.appendChild(li);
          });
          applicationProcessElem.innerHTML = '';
          updatedData.application_process.forEach((step) => {
            const li = document.createElement('li');
            li.textContent = step;
            applicationProcessElem.appendChild(li);
          });
          location.reload();
        } else {
          console.log(data.message);
        }
      })
      .catch((error) => console.error('Error:', error));
  }

  // Function to handle canceling
  function cancelEditing() {
    descriptionElem.style.display = 'block';
    departmentElem.style.display = 'block';
    salaryElem.style.display = 'block';
    benefitsElem.style.display = 'block';
    educationElem.style.display = 'block';
    experienceElem.style.display = 'block';
    skillsElem.style.display = 'block';
    otherreqElem.style.display = 'block';
    applicationProcessElem.style.display = 'block';

    descriptionInput.remove();
    departmentInput.remove();
    salaryInput.remove();
    benefitsInput.remove();
    educationInput.remove();
    experienceInput.remove();
    skillsInput.remove();
    otherreqInput.remove();
    applicationProcessInput.remove();

    editBtn.style.display = 'inline';
    confirmBtn.style.display = 'none';
    cancelBtn.style.display = 'none';
  }

  editBtn.addEventListener('click', startEditing);
  confirmBtn.addEventListener('click', confirmChanges);
  cancelBtn.addEventListener('click', cancelEditing);
});
