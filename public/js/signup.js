const signupFormHandler = async (event) => {
  event.preventDefault();
  console.log("++++++++Submitted Form++++++++");

  const firstname = document.querySelector("#firstname-signup").value.trim();
  const email = document.querySelector("#email-signup").value.trim();
  const lastname = document.querySelector("#lastname-signup").value.trim();
  const username = document.querySelector("#username-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();
  let developer = false;
  if (document.querySelector("#developer-signup:checked")) {
    developer = true;
    console.log("+++++++++developer", developer);
  }

  if (username && email && password) {
    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({
        firstname,
        lastname,
        username,
        email,
        password,
        developer,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/profile");
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector(".signup-form")
  .addEventListener("click", signupFormHandler);
