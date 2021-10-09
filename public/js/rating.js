async function ratingFormSubmit(event) {
    event.preventDefault();
  
    const rating_text = document
      .querySelector('input[name="rating-body"]')
      .value.trim();

      const rating_id = document
      .querySelector('input[name="rating-body"]')
      .value.trim();
  
    const job_id = window.location.toString().split("/")[
      window.location.toString().split("/").length - 1
    ];
  
    if (rating_text) {
      const response = await fetch("/api/ratings", {
        method: "POST",
        body: JSON.stringify({
          job_id,
          rating_text,
          rating_id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.ok) {
        document.location.reload();
      } else {
        alert(response.statusText);
        document.querySelector("#rating-form").style.display = "block";
      }
    }
  }
  
  document
    .querySelector(".bid-form")
    .addEventListener("submit", ratingFormSubmit);
  