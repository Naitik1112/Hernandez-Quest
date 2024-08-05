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

const togglePassword = document.querySelector('#togglePassword');
const password = document.querySelector('#password');

togglePassword.addEventListener('click', function (e) {
  // Toggle the type attribute
  const type =
    password.getAttribute('type') === 'password' ? 'text' : 'password';
  password.setAttribute('type', type);

  // Toggle the eye icon
  this.classList.toggle('visible');
});

const login = async (email, password) => {
  change();
  try {
    const res = await fetch('http://127.0.0.1:3100/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    }).catch((error) => {
      title.innerHTML = `Error!`;
      description.innerHTML = error;
    });

    const data = await res.json();

    if (res.ok && data.status === 'success') {
      description.innerHTML = `Logged In Successfully.`;
      window.setTimeout(() => {
        location.assign('/');
      }, 500);
      flag = true;
    } else {
      title.innerHTML = `Error!`;
      description.innerHTML = `${data.message}`;
      flag = false;
    }
  } catch (err) {
    // showAlert('error', err.response.data.message);
    title.innerHTML = `Error`;
    description.innerHTML = `Something went wrong!! Try again Later.`;
    flag = false;
  }
};

document.querySelector('.btnsubmit').addEventListener('click', (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  login(email, password);
});
