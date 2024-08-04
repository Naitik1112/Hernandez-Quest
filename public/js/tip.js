const tiitle = document.getElementsByClassName('title')[0];
const deescription = document.getElementsByClassName('description')[0];
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

const submit_tip = async (title, description) => {
  change();
  try {
    const res = await fetch('http://127.0.0.1:3100/api/publish/submit-tip', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        description,
      }),
    });
    const data = await res.json();

    if (res.ok && data.status === 'success') {
      deescription.innerHTML = `Tip Submited Successfully.`;
      flag = true;
    } else {
      tiitle.innerHTML = 'Error';
      deescription.innerHTML = `${data.message}`;
    }
  } catch (err) {
    tiitle.innerHTML = 'Error';
    deescription.innerHTML = `${err}`;
  }
};

document.querySelector('.btnsubmit').addEventListener('click', (e) => {
  e.preventDefault();
  const title_ = document.querySelector('.titlee').value;
  const description_ = document.querySelector('.descriptionn').value;
  submit_tip(title_, description_);
});
