
// Initialize the MobileNet model
let myimages;
let img;
let currentIndex = 0;
let allImages = [];
let predictions = [];

const myfeatureExtractor = ml5.featureExtractor("MobileNet", modelReady);
const myClassifier = myfeatureExtractor.classification(myimages, imagesReady);
// }

// function to handle model loading
function modelReady() {
  console.log("Model is ready");
  //   //   // Once the model is ready, set up the feature extractor
  //   //   featureExtractor = ml5.featureExtractor("MobileNet");
}

// function to handle image loading
function imagesReady() {
  console.log("images are rready!!");
}

// Function to handle file input
function handleFileInput(input) {
  if (input.files && input.files.length) {
    for (let i = 0; i < input.files.length; i++) {
      const file = input.files[i];

      console.log("input", input);

      console.log("input.file", input.files);

      console.log("input.file[i]", input.files[i]);

// Create a new image element
      const img = document.createElement("img");
      img.width = 200; // Set width for display purposes
      img.height = 200; // Set height for display purposes

//Set the source of the image to the file URL
      //console.log("img.src", img.src);
      img.src = URL.createObjectURL(file);
      console.log("img.src", img.src);

// Append the image to a container in the DOM for display
      document.getElementById("imageContainer").appendChild(img);
      console.log("image", img);

      // img.addEventListener("load", function() {})

// Add training images add a new label to the model
      myClassifier
        .addImage(img, "dacty")
        .then((myClassifier) => myClassifier.train(whileTraining));

      console.log(
        "data added to feature extractor?",
        myClassifier.addImage(img, "dacty")
      );
     
// Function for re-training the model
      function whileTraining(loss) {
        if (loss == null) {
          console.log("no loss");
          testimage = document.getElementById("testimage");
          console.log("grabbing test image", testimage);

          myClassifier.classify(testimage, (err, results) => {
            console.log("testimage is", testimage);
            console.log("result", results); // output

            // If there is an error, show in the console
            if (err) {
              console.error(err);
            }
            console.log("my files", file);

            
// function can be used for Multiple Image classification
            // and saving prediction as json file
            information = {
              name: allImages[currentIndex],
              result: results,
            };
            console.log("information", information);

            allImages.push("images/dataset/" + file.name);
            console.log("allImages", allImages);
            predictions.push(information);

// function for adding prediction to UI
            const classificationDiv = document.createElement("div");
            const labelDiv = document.createTextNode(
              "Label: " + results[0].label
            );
            const confidenceDiv = document.createTextNode(
              "Confidence: " + results[0].confidence, 0, 2
            );
            classificationDiv.appendChild(labelDiv);
            classificationDiv.appendChild(confidenceDiv);

            const testImageDiv = document.getElementById("testimage");
            console.log("grabbing test image AGAIN", testImageDiv);
            document.body.insertBefore(classificationDiv, testImageDiv);
          });

        } else {
          console.log(loss);
        }
      }

// console.log Extracted features from the image using ml5's featureExtractor
      const features = myfeatureExtractor.infer(img);
      console.log("Features extracted for file " + i + ":", features);

      
    }
  }
}
