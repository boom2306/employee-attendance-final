const BASE_URL = window.location.origin + '/api/v1';

let adminToken = localStorage.getItem('adminToken') || '';
document.getElementById('adminToken').value = adminToken;

// Register Admin (we dont use it so not anyone can register)
 document.getElementById('adminRegisterBtn').onclick = function () {
  const email = document.getElementById('adminRegEmail').value;
  const password = document.getElementById('adminRegPass').value;

  fetch(BASE_URL + '/admin/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
    .then(res => res.json())
    .then(data => {
      adminToken = data.token;
      localStorage.setItem('adminToken', adminToken);
      document.getElementById('adminToken').value = adminToken;
      alert('Admin registered');
    });
};

// Login Admin
document.getElementById('adminLoginBtn').onclick = function () {
  const email = document.getElementById('adminLoginEmail').value;
  const password = document.getElementById('adminLoginPass').value;

  fetch(BASE_URL + '/admin/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
    .then(res => res.json())
    .then(data => {
      adminToken = data.token;
      localStorage.setItem('adminToken', adminToken);
      document.getElementById('adminToken').value = adminToken;
      alert('Admin logged in');
    });
};

// Logout Admin
document.getElementById('adminLogoutBtn').onclick = function () {
  localStorage.removeItem('adminToken');
  adminToken = '';
  document.getElementById('adminToken').value = '';
  alert('Admin logged out');
};

// View All Attendance
document.getElementById('allAttendanceBtn').onclick = function () {
  fetch(BASE_URL + '/attendance', {
    headers: { Authorization: 'Bearer ' + adminToken }
  })
    .then(res => res.json())
    .then(data => {
      document.getElementById('allAttendanceOutput').innerText =
        JSON.stringify(data, null, 2);
    });
};
