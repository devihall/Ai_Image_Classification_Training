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
async function handleFileInput(input) {
  // if (input.files && input.files.length) {
    const promises = [];
    for (let i = 0; i < input.files.length; i++) {
      const file = input.files[i];

      // Create a new image element
      const img = document.createElement("img");
      img.width = 200; // Set width for display purposes
      img.height = 200; // Set height for display purposes

      img.src = URL.createObjectURL(file);

      document.getElementById("imageContainer").appendChild(img);

      // add uploaded images to myimages array
      myimages.push(img);
      promises.push(myClassifier.addImage(img, "Galeocerdo cuvier"));
    }
    await Promise.all(promises);
    myClassifier.train(whileTraining);
  // }
}

// Function for classifying test image & printing loss
async function whileTraining(loss) {
  if (loss == null) {
    console.log("no loss");
    const testimage = document.getElementById("testimage");

    const results = await myClassifier.classify(testimage);
    console.log("testimage is", testimage);
    console.log("result", results);

    // function for adding prediction to UI
    const classificationDiv = document.createElement("div");
    const labelDiv = document.createTextNode("Label: " + results[0].label);
    const confidenceDiv = document.createTextNode(
      "   Confidence: " + results[0].confidence, 0,2);
    classificationDiv.appendChild(labelDiv);
    classificationDiv.appendChild(confidenceDiv);
    const testImageDiv = document.getElementById("testimage");
    console.log("grabbing test image AGAIN", testImageDiv);
    document.body.insertBefore(classificationDiv, testImageDiv);
  } else {
    console.log(loss);
  }
}
