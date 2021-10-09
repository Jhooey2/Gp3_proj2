async function editFormSubmit(event) {
    event.preventDefault();
  
    const title = document.querySelector('input[name="job-title"]').value.trim();
    const description = document
      .querySelector('input[name="description"]')
      .value.trim();
    console.log(title);
    console.log(description);
  
    const id = window.location.toString().split("/")[
      window.location.toString().split("/").length - 1
    ];
  
    const response = await fetch(`/api/jobs/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        job_id: id,
        title,
        description,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    if (response.ok) {
      document.location.replace("/dashboard/");
    } else {
      alert(response.statusText);
    }
  }
  
  document
    .querySelector(".edit-job-form")
    .addEventListener("submit", editFormSubmit);
  