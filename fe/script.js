// // Load a pre-trained model for image classification
// let classifier;

// function setup() {
//   createCanvas(400, 400);

//   // Initialize the Image Classifier
//   classifier = ml5.imageClassifier("MobileNet", modelLoaded);
// }
// const  myfeatureExtractor = ml5.featureExtractor("MobileNet", modelReady);
//  const myClassifier = myfeatureExtractor.classification(myimages, imagesReady);
// // }

// function modelLoaded() {
//   console.log("Model Loaded!");

//   // Classify an image
//   classifyImage();
// }

// function classifyImage() {
//   // Get a reference to the canvas
//   let canvas = document.getElementsByTagName("canvas")[0];

//   // Extract features from the canvas
//   classifier.classify(canvas, (err, results) => {
//     if (err) {
//       console.error(err);
//       return;
//     }

//     // Display the results
//     console.log(results);

//     // Draw the results on the canvas
//     textSize(16);
//     fill(255);
//     text(results[0].label, 10, height - 20);
//   });
// }

// function draw() {
//   // Draw something on the canvas
//   background(220);
//   fill(0);
//   ellipse(width / 2, height / 2, 100, 100);
// }
