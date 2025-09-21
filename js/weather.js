//   document.getElementsByClassName(".btn").addEventListener("click", () => {
//      // alert("hello")

    
//      const inputfilde = document.getElementById('name').value;
//       localStorage.setItem("name", inputfilde )

//      if (inputfilde === "") {
//           alert("please type your name")
//       } else{
//           window.location.href = '../pages/weather.html'
//       }
//    })

 (function () {
  const form = document.getElementById('loginForm');
  const emailEl = document.getElementById('email');
  const passwordEl = document.getElementById('password');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const email = emailEl.value.trim().toLowerCase();
    const password = passwordEl.value;

    if (!email || !password) {
      alert('Please enter both email and password.');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');

    
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
      alert('Invalid email or password.');
      return;
    }

   
    localStorage.setItem('loggedInUser', JSON.stringify(user));

    alert(`Welcome back, ${user.name}!`);
    window.location.href = '../pages/weather.html';
  });
})();
