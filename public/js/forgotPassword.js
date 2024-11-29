const title = document.getElementsByClassName('title')[0];
const description = document.getElementsByClassName('description')[0];
let flag = false;

// Function to display a popup with blur effect
function change() {
  document.getElementsByClassName('popup')[0].classList.add('active');
  const containers = document.getElementsByClassName('container');
  for (let i = 0; i < containers.length; i++) {
    containers[i].classList.add('blur');
  }
}

// Forgot Password Function
const forgot = async (email) => {
  try {
    const res = await fetch('/api/users/forgotPassword', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      title.innerHTML = `Success`;
      description.innerHTML = `A password reset link has been sent to your email. Please check your inbox.`;
      flag = true;
    } else {
      const error = await res.json();
      title.innerHTML = `Error`;
      description.innerHTML = `Error: ${
        error.message || 'Failed to send the reset link. Please try again.'
      }`;
      flag = false;
    }
  } catch (err) {
    console.error('Error:', err);
    title.innerHTML = `Error`;
    description.innerHTML = `Something went wrong! Please try again later.`;
    flag = false;
  }

  // Show the popup only after title and description are set
  change();
};

// Form Submission Handler
document.querySelector('.btnsubmit').addEventListener('click', (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  if (!email) {
    alert('Please enter your email!');
    return;
  }
  console.log('Sending POST request to forgotPassword...');
  forgot(email);
});

// Add a reload functionality to the OK button
document.querySelector('#dismiss-popup-btn').addEventListener('click', () => {
  window.location.reload(); // Reload the page
});
