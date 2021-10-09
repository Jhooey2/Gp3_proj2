async function bidFormSubmit(event) {
    event.preventDefault();
  
    const quote = document
      .querySelector('input[name="bid-body"]')
      .value.trim();
  
    const job_id = window.location.toString().split("/")[
      window.location.toString().split("/").length - 1
    ];
  
    if (quote) {
      const response = await fetch("/api/bids", {
        method: "POST",
        body: JSON.stringify({
          job_id,
          quote,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.ok) {
        document.location.reload();
      } else {
        alert(response.statusText);
        document.querySelector("#bid-form").style.display = "block";
      }
    }
  }
  
  document
    .querySelector(".bid-form")
    .addEventListener("submit", bidFormSubmit);
  