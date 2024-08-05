const logout = async () => {
  try {
    const res = await fetch('/api/users/logout', {
      method: 'GET',
    });
    const data = await res.json();

    if (data.status === 'success') {
      location.assign('/');
    }
  } catch (err) {
    console.log(err);
  }
};
document.getElementById('btnlogout').addEventListener('click', (e) => {
  e.preventDefault();
  logout();
});
