const togglePassword1 = document.querySelector('#togglePassword1');
const password1 = document.querySelector('#password');

togglePassword1.addEventListener('click', function (e) {
  // Toggle the type attribute
  const type =
    password1.getAttribute('type') === 'password' ? 'text' : 'password';
  password1.setAttribute('type', type);

  // Toggle the eye icon
  this.querySelector('i').classList.toggle('fa-eye');
  this.querySelector('i').classList.toggle('fa-eye-slash');
});

const togglePassword2 = document.querySelector('#togglePassword2');
const password2 = document.querySelector('#confirmPassword');

togglePassword2.addEventListener('click', function (e) {
  // Toggle the type attribute
  const type =
    password2.getAttribute('type') === 'password' ? 'text' : 'password';
  password2.setAttribute('type', type);

  // Toggle the eye icon
  this.querySelector('i').classList.toggle('fa-eye');
  this.querySelector('i').classList.toggle('fa-eye-slash');
});

const addAdminbtn = document.getElementById('Submit');

addAdminbtn.addEventListener('click', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const role = document.getElementById('role').value;
  const password = document.getElementById('password').value;
  const passwordConfirm = document.getElementById('confirmPassword').value;

  try {
    const res = await fetch('http://127.0.0.1:3100/api/users/createAdmin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        role,
        password,
        passwordConfirm,
      }),
    });

    const data = await res.json();
    if (res.ok && data.status === 'success') {
      window.setTimeout(() => {
        location.assign('/');
      }, 1000);
    } else {
      console.log('error', data.message);
    }
  } catch (err) {
    console.log(err);
  }
});
