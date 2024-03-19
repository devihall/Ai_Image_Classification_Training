// function hello(){console.log("hello")}
// logic for tabbed navigation
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

// /////////upload file, display thumnails & file names
function readURL(input) {
  // console.log("fileinfo", input);
  var container = document.getElementById("thumbnails-container");
  container.innerHTML = "";

  if (input.files && input.files.length) {
    for (var i = 0; i < input.files.length; i++) {
      var file = input.files[i];
      console.log("file", file);
      var reader = new FileReader();

      reader.onload = (function (file) {
        return function (e) {
          var thumbnail = document.createElement("img");
          thumbnail.setAttribute("src", e.target.result);
          thumbnail.setAttribute("class", "img-thumbnail m-1");
          container.appendChild(thumbnail);

          var fileName = document.createElement("div");
          var name = file.name;
          var namestring = name.split(".");
          var fname = namestring[0];
          var fExtention = namestring[1];
          var lengthFname = fname.length;
          var fileshortname;
          if (lengthFname > 15) {
            $(this).html(
              (fileshortname =
                fname.substr(0, 10) +
                "..." +
                fname.substr(-5) +
                "." +
                fExtention)
            );
            console.log(
              "short name",
              fname.substr(0, 10) + "..." + fname.substr(-5) + "." + fExtention
            );
          }
          // console.log("name", namestring);
          fileName.textContent = fileshortname;
          fileName.setAttribute("class", "file-name");
          container.appendChild(fileName);
        };
      })(file);

      reader.readAsDataURL(file);
    }
  }
}

$("#classify").prop("disabled", true);
