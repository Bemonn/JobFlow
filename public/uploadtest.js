// Account info for linking to firebase-app and cloud firebase storage
const firebaseConfig = {
  apiKey: "AIzaSyCjrE96WoQGU0yjp2UyUnMaH6H7NKRyrdQ",
  authDomain: "test-upload-2a32e.firebaseapp.com",
  projectId: "test-upload-2a32e",
  storageBucket: "test-upload-2a32e.appspot.com",
  messagingSenderId: "171153174216",
  appId: "1:171153174216:web:6339c56e48d4b7a9aebffd",
  measurementId: "G-5HB0ZKZJQ3",
};

// Initialising firebase app
const app = firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();

// Get elements from HTML page
const request = document.querySelector(".request-profile");
const inp = document.querySelector(".input-img");
const progressbar = document.querySelector(".progress");
const img = document.querySelector(".img");
const fileData = document.querySelector(".filedata");
const loading = document.querySelector(".loading");

// Create variables for elements
let file;
let fileName;
let progress;
let isLoading = false;
let uploadedFileName;

// Create function for selecting upload file
const selectImage = () => {
  inp.click();
};

// Create on-click event on choosing and getting image file
const getImageData = (e) => {
  file = e.target.files[0];

  // Add prefix when saving image to cloud storage
  // ** Might change to employee_id later**
  fileName = Math.round(Math.random() * 99) + file.name;
  // display the image
  if (fileName) {
    fileData.style.display = "block";
  }
  fileData.innerHTML = fileName;
  console.log(file, fileName);
};

// Function for uploading the image file
const uploadImage = () => {
  // Displaying loading status
  loading.style.display = "block";

  // Storing image file under folder "employeePrefiles"
  const storageRef = storage.ref().child("employeeProfiles");
  const folderRef = storageRef.child(fileName);
  const uploadtask = folderRef.put(file);
  uploadtask.on(
    "state_changed",
    (snapshot) => {
      console.log("Snapshot", snapshot.ref.name);

      // Show upload percentage
      progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      progress = Math.round(progress);
      progressbar.style.width = progress + "%";
      progressbar.innerHTML = progress + "%";
      uploadedFileName = snapshot.ref.name;
    },
    (error) => {
      console.log(error);
    },
    () => {
      storage
        .ref("employeeProfiles")
        .child(uploadedFileName)
        .getDownloadURL()
        .then((url) => {
          console.log("URL", url);
          if (!url) {
            request.style.display = "block";
          } else {
            // Hide "loading" status
            request.style.display = "none";

            loading.style.display = "none";
          }
          // Display image after uploading,
          // by setting the source of the img element with the picture's url
          img.setAttribute("src", url);
          return url;
        });
      console.log("File Uploaded Successfully");
    },
  );
};

// Update employee's profile picture link with ID
// Using fetch call and PUT method
function updateProfileUrl(url) {
  const request = {
    method: "PUT",
    body: JSON.stringify({ url: url }),
    HEADERS: { "Content-Type": "application/json; charset=utf-8" },
  };
  fetch("/api/Employees/4", request);
}
