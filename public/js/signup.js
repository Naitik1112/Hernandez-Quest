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
        location.assign('/');
      }, 200);
    } else {
      window.setTimeout(() => {
        location.assign('');
      }, 200);
    }
  });

const signup = async (name, email, password) => {
  change();
  try {
    const res = await fetch('http://127.0.0.1:3100/api/users/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    const data = await res.json();

    if (res.ok && data.status === 'success') {
      title.innerHTML = 'Welcome!';
      description.innerHTML = `Sign Up Successfully.`;
      flag = true;
    } else {
      title.innerHTML = `Error`;
      description.innerHTML = `${data.message}`;
      flag = false;
    }
  } catch (err) {
    console.log(err);
    title.innerHTML = `Something went wrong!! Try again Later.`;
    flag = false;
  }
};

document.querySelector('.btnsubmit').addEventListener('click', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const passwordConfirm = document.getElementById('cf').value;
  if (password === passwordConfirm) {
    signup(name, email, password, passwordConfirm);
  } else {
    // console.log(name, email, password, passwordConfirm);
    alert('Please Re-enter password and confirm password');
  }
});

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
const password2 = document.querySelector('#cf');

togglePassword2.addEventListener('click', function (e) {
  // Toggle the type attribute
  const type =
    password2.getAttribute('type') === 'password' ? 'text' : 'password';
  password2.setAttribute('type', type);

  // Toggle the eye icon
  this.querySelector('i').classList.toggle('fa-eye');
  this.querySelector('i').classList.toggle('fa-eye-slash');
});
