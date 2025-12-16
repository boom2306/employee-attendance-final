const BASE_URL = 'http://localhost:3000/api/v1';

let employeeToken = localStorage.getItem('employeeToken') || '';
document.getElementById('empToken').value = employeeToken;

// Register Employee
document.getElementById('empRegisterBtn').onclick = function (e) {
  e.preventDefault();

  const email = document.getElementById('empRegEmail').value;
  const password = document.getElementById('empRegPass').value;

  fetch(BASE_URL + '/employees/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
    .then(res => res.json())
    .then(data => {
      employeeToken = data.token;
      localStorage.setItem('employeeToken', employeeToken);
      document.getElementById('empToken').value = employeeToken;
      alert('Employee registered successfully');
    })
    .catch(() => {
      alert('Employee registration failed');
    });
};

// Login Employee
document.getElementById('empLoginBtn').onclick = function (e) {
  e.preventDefault();

  const email = document.getElementById('empLoginEmail').value;
  const password = document.getElementById('empLoginPass').value;

  fetch(BASE_URL + '/employees/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
    .then(res => res.json())
    .then(data => {
      employeeToken = data.token;
      localStorage.setItem('employeeToken', employeeToken);
      document.getElementById('empToken').value = employeeToken;
      alert('Employee logged in');
    })
    .catch(() => {
      alert('Employee login failed');
    });
};

// Logout Employee
document.getElementById('empLogoutBtn').onclick = function (e) {
  e.preventDefault();

  localStorage.removeItem('employeeToken');
  employeeToken = '';
  document.getElementById('empToken').value = '';
  alert('Employee logged out');
};

// Clock In
document.getElementById('clockInBtn').onclick = function (e) {
  e.preventDefault();

  fetch(BASE_URL + '/attendance/clock-in', {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + employeeToken
    }
  })
    .then(res => res.json())
    .then(() => {
      alert('Clocked in successfully');
    })
    .catch(() => {
      alert('Clock in failed');
    });
};

// Clock Out
document.getElementById('clockOutBtn').onclick = function (e) {
  e.preventDefault();

  fetch(BASE_URL + '/attendance/clock-out', {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + employeeToken
    }
  })
    .then(res => res.json())
    .then(() => {
      alert('Clocked out successfully');
    })
    .catch(() => {
      alert('Clock out failed');
    });
};

// Employee view my attendance
document.getElementById('myAttendanceBtn').onclick = function (e) {
  e.preventDefault();

  fetch(BASE_URL + '/attendance/my-attendance', {
    headers: {
      Authorization: 'Bearer ' + employeeToken
    }
  })
    .then(res => res.json())
    .then(data => {
      document.getElementById('myAttendanceOutput').innerText =
        JSON.stringify(data, null, 2);
    })
    .catch(() => {
      alert('Failed to load attendance');
    });
};
