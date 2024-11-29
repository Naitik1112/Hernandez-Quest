const title = document.getElementsByClassName('title')[0];
const description = document.getElementsByClassName('description')[0];
let flag = false;

// Function to display a popup with a blur effect
function change() {
  document.getElementsByClassName('popup')[0].classList.add('active');
  const containers = document.getElementsByClassName('container');
  for (let i = 0; i < containers.length; i++) {
    containers[i].classList.add('blur');
  }
}

// Toggle Password Visibility
const togglePassword = document.querySelector('#togglePassword');
const passwordInput = document.querySelector('#password');

togglePassword.addEventListener('click', function () {
  // Toggle the type attribute
  const type =
    passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
  passwordInput.setAttribute('type', type);

  // Toggle the eye icon
  this.classList.toggle('visible');
});

// Perform the PATCH request for resetting the password
const login = async (password, token) => {
  change();
  try {
    const res = await fetch(`/api/users/resetPassword/${token}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password }), // Send password only
    });

    if (res.ok) {
      const data = await res.json();
      title.innerHTML = `Success`;
      description.innerHTML = `Your password has been reset successfully.`;
      flag = true;
    } else {
      const errorData = await res.json();
      throw new Error(errorData.message || 'Failed to reset password.');
    }
  } catch (err) {
    console.error('Error:', err.message);
    title.innerHTML = `Error`;
    description.innerHTML = `Something went wrong! Try again later.`;
    flag = false;
  }
};

// Extract the last part of the URL (token)
const url = window.location.href;
const token = url.split('/').pop(); // Extract token
console.log(token);

// Form Submission Handler
document.querySelector('.btnsubmit').addEventListener('click', (e) => {
  e.preventDefault();
  const password = passwordInput.value; // Use the password input value
  if (!password) {
    alert('Please enter a password!');
    return;
  }
  login(password, token);
});

document.querySelector('#dismiss-popup-btn').addEventListener('click', () => {
  window.location.reload(); // Reload the page
});
