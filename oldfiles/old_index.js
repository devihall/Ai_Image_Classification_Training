function openTab(evt, tabName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tab");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}

// Display the home tab by default
document.getElementById("home").style.display = "block";


////////
function readURL(input) {
  if (input.files && input.files[0]) {
    $("#classify").prop("disabled", false);
    var reader = new FileReader();

    reader.onload = function (e) {
      $("#image").attr("src", e.target.result);
    };

    reader.readAsDataURL(input.files[0]);
  }
}

// //////////

function classify() {
  $("#classify").prop("disabled", true);

  let img;

  const element = document.getElementById("result");
  element.innerHTML = "Detecting...";
  $("#result").addClass("border");

  // Initialize Image Classifier with MobileNet.
  const classifier = ml5.imageClassifier("MobileNet");
  img = document.getElementById("image");
  // img = loadImage('cat.png');
  classifier.classify(img, gotResult);

  // Function to run when results arrive
  function gotResult(error, results) {
    if (error) {
      element.innerHTML = error;
    } else {
      let num = results[0].confidence * 100;
      element.innerHTML =
        "<h5>" +
        results[0].label +
        "</h5> Confidence: <b>" +
        num.toFixed(2) +
        "%</b>";
    }
  }
}
