document.addEventListener("DOMContentLoaded", function () {
  const saveBtn = document.getElementById("saveBtn");

  if (!saveBtn) {
    console.error("Save button not found");
    return;
  }

  saveBtn.addEventListener("click", async function () {
    const titleInput = document.getElementById("title");
    const urlInput = document.getElementById("url");

    if (!titleInput || !urlInput) {
      console.error("Form inputs not found");
      return;
    }

    const title = (titleInput as HTMLInputElement).value.trim();
    const url = (urlInput as HTMLInputElement).value.trim();

    // Print to console
    console.log("Title:", title);
    console.log("URL:", url);

    // Set up an API call to save the article
  });
});
