// Initialize the MobileNet model
let myimages = [];
let img;
let currentIndex = 0;
let allImages = [];
let predictions = [];

const myfeatureExtractor = ml5.featureExtractor("MobileNet", modelReady);
const myClassifier = myfeatureExtractor.classification();

console.log("myimages", myimages);

// Function to handle model loading
function modelReady() {
  console.log("Model is ready");
}

// Function to handle file input
async function handleFileInput(inputId) {
  const input = document.getElementById(inputId);
  console.log("input", input);
  const promises = [];
  const thumbnailContainer = document.getElementById(
    "thumbnailContainer" + inputId[inputId.length - 1]
  );
  thumbnailContainer.innerHTML = ""; // Clear previous thumbnails

  // Retrieve the corresponding h4 element's text content using its id
  const h4TextContent = document.getElementById(
    "category" + inputId[inputId.length - 1]
  ).textContent;

  for (let i = 0; i < input.files.length; i++) {
    console.log("input.files", input.files);

    const file = input.files[i];

    // Create a new image element
    const img = document.createElement("img");
    img.width = 100; // Set width for display purposes
    img.height = 100; // Set height for display purposes

    img.src = URL.createObjectURL(file);
    console.log("FILE", file);

    const thumbnailDiv = document.createElement("div");
    thumbnailDiv.classList.add("thumbnail");
    thumbnailDiv.appendChild(img);
    thumbnailContainer.appendChild(thumbnailDiv);

    // add uploaded images to myimages array
    myimages.push(img);

    // Use the h4TextContent as the category
    let category = h4TextContent.trim();
    console.log("category", category);
    promises.push(myClassifier.addImage(img, category));
    console.log(
      "myClassifier.addImage(img, category)",
      myClassifier.addImage(img, category)
    );
  }
  await Promise.all(promises);
  myClassifier.train(whileTraining);
  console.log(
    "myClassifier.train(whileTraining)",
    myClassifier.train(whileTraining)
  );
}



// Function for classifying test image & printing loss
async function whileTraining(loss) {
  if (loss == null) {
    console.log("no loss");
  } else {
    console.log(loss);
  }
}