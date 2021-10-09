async function newFormSubmit(event) {
    event.preventDefault();
  
    const title = document.querySelector('input[name="job-title"]').value;
    const description = document.querySelector('input[name="description"]').value;
  
    const response = await fetch(`/api/jobs`, {
      method: "POST",
      body: JSON.stringify({
        title,
        description,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert(response.statusText);
    }
  }
  
  document
    .querySelector("#new-job-form")
    .addEventListener("submit", newFormSubmit);
  