//validate email
function validateEmail(email) {
  emailSyntax = /^[^@]+@\w+(\.\w+)+\w$/;
  if (emailSyntax.test(email) = true) {
    return true
  } else {
    return false
  }
}


//validate password
function validatePassword(password) {
  if (password.length < 6) {
    console.log("Password isn't more than 6 characters");
    return false
  } else {
    return true
  }
}


//validate fields
function validateRest(fields) {
  if (fields === nul) {
    console.log("Incomplete Fields");
    return false
  } else if (fields.length <= 0) {
    console.log("Incomplete Fields");
    return false
  } else {
    return true
  }
}

function signUp() {
  //get all inputs
  let firstName = document.getElementById("firstName").value;
  let surname = document.getElementById("surname").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let confirmPassword = document.getElementById("confirmPassword").value;

  fetch('http://localhost:3000/signup', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  })
  .then(response => response.json())
  .then(data => {
    alert(data.message);
    // Redirect to another page after successful account creation
    window.location.href = 'dashboard.html';
  })
  .catch(error => console.error('Error:', error));

  if (validateEmail(email) == false) {
    alert("Invalid email address");
    return
  }

  if (validatePassword(password) == false) {
    alert("Invalid password");
    return
  }

  if (password != confirmPassword) {
    alert("Passwords do not match");
    return
  }

  if (validateFields(firstName) == false || validateFields(surname) == false || validateFields(email) == false || validateFields(password) == false || validateFields(confirmPassword) == false ) {
    alert("Please fill in all fields")
    return
  }
}


//validate email
function validateEmail(email) {
  emailSyntax = /^[^@]+@\w+(\.\w+)+\w$/;
  if (emailSyntax.test(email) = true) {
    return true
  } else {
    return false
  }
}


//validate password
function validatePassword(password) {
  if (password.length < 6) {
    console.log("Password isn't more than 6 characters");
    return false
  } else {
    return true
  }
}


//validate fields
function validateRest(fields) {
  if (fields === nul) {
    console.log("Incomplete Fields");
    return false
  } else if (fields.length <= 0) {
    console.log("Incomplete Fields");
    return false
  } else {
    return true
  }
}

