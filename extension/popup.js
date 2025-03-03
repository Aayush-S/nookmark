document.addEventListener("DOMContentLoaded", function () {
  const saveBtn = document.getElementById("saveBtn");

  if (!saveBtn) {
    console.error("Save button not found");
    return;
  }

  saveBtn.addEventListener("click", async function () {
    console.log("Saving nook:");
    const titleInput = document.getElementById("title");
    const urlInput = document.getElementById("url");

    if (!titleInput || !urlInput) {
      console.error("Form inputs not found");
      return;
    }

    const title = titleInput.value.trim();
    const url = urlInput.value.trim();

    if (!title || !url) {
      alert("Please enter both title and URL");
      return;
    }

    try {
      console.log("Sending request to server");
      console.log(title, url);

      const body = JSON.stringify({ title: title, url: url });
      console.log("Body:", body);
      const response = await fetch("http://127.0.0.1:5000/api/nooks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: body,
      });

      console.log("Response:", response);

      if (response.ok) {
        const result = await response.json();
        console.log("Nook saved successfully:", result);
        alert("Nook saved successfully!");

        // Clear the form
        titleInput.value = "";
        urlInput.value = "";
      } else {
        const error = await response.json();
        console.error("Error saving nook:", error);
        alert("Error saving nook: " + (error.error || "Unknown error"));
      }
    } catch (error) {
      console.error("Error saving nook:", error);
      alert("Error saving nook. Please try again.");
    }
  });
});
