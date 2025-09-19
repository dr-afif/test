console.log("✅ script.js loaded");

const API_KEY = "AIzaSyD31jjNmYQWOwOnkUHwJpucsU_HceUAJWw";       // Replace with restricted API key
const ROOT_FOLDER_ID = "19hxtBDM7U6IRepoEZiOHVG2MK_erNdrk"; // Replace with your shared folder ID

// Load the Drive API
function start() {
  gapi.client.init({
    apiKey: API_KEY,
    discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"],
  }).then(() => {
    listFiles(ROOT_FOLDER_ID);
  }).catch(err => {
    console.error("❌ Error during gapi.client.init:", err);
  });
}

// Get files inside a folder
function listFiles(folderId) {
  gapi.client.drive.files.list({
    q: `'${folderId}' in parents and (mimeType='application/pdf' or mimeType contains 'image/') and trashed=false`,
    fields: "files(id, name, mimeType, webViewLink, thumbnailLink)"
  }).then(response => {
    const files = response.result.files;
    console.log("📂 Files:", files);

    const list = document.getElementById("file-list");
    list.innerHTML = "";
    if (!files || files.length === 0) {
      list.innerHTML = "<li>No files found.</li>";
      return;
    }

    files.forEach(file => {
      const li = document.createElement("li");
      li.innerHTML = `<a href="${file.webViewLink}" target="_blank">${file.name}</a>`;
      list.appendChild(li);
    });
  }).catch(err => {
    console.error("❌ Error listing files:", err);
  });
}

// Load gapi and then call start()
gapi.load("client", start);
