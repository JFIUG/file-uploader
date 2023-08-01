<?php
// Check if the request contains any files
if (empty($_FILES['files']['name'][0])) {
    $response = array("message" => "No files were uploaded.");
    echo json_encode($response);
    exit;
}

$uploadDirectory = "uploads/"; // Set your desired upload directory here

// Create the directory if it doesn't exist
if (!file_exists($uploadDirectory)) {
    mkdir($uploadDirectory, 0755, true);
}

$uploadedFiles = array();
$errors = array();

// Loop through each uploaded file
foreach ($_FILES['files']['name'] as $key => $name) {
    $tempFile = $_FILES['files']['tmp_name'][$key];
    $targetFile = $uploadDirectory . basename($name);

    // Check if the file is valid and move it to the target directory
    if (move_uploaded_file($tempFile, $targetFile)) {
        $uploadedFiles[] = $name;
    } else {
        $errors[] = "Failed to upload $name.";
    }
}

$response = array();
if (!empty($uploadedFiles)) {
    $response["message"] = count($uploadedFiles) . " file(s) uploaded successfully: " . implode(", ", $uploadedFiles);
} else {
    $response["message"] = "File upload failed.";
}

echo json_encode($response);
?>
