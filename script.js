document.getElementById("fileInput").addEventListener("change", displayFileNames);

function displayFileNames() {
    const fileInput = document.getElementById("fileInput");
    const fileNamesDiv = document.getElementById("fileNames");
    const files = fileInput.files;

    if (files.length > 0) {
        fileNamesDiv.innerHTML = "Selected Files: <br />";
        for (let i = 0; i < files.length; i++) {
            const fileName = files[i].name;
            fileNamesDiv.innerHTML += fileName + "<br />";
        }
    } else {
        fileNamesDiv.innerHTML = "";
    }
}

function uploadFiles() {
    const fileInput = document.getElementById("fileInput");
    const files = fileInput.files;

    if (files.length === 0) {
        alert("Please select at least one file to upload.");
        return;
    }

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
        formData.append("files[]", files[i]);
    }

    fetch("upload.php", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        // Optionally, you can perform additional actions after successful upload.
    })
    .catch(error => {
        alert("An error occurred during the upload.");
        console.error(error);
    });
}
