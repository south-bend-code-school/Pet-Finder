
(function(){
  $(document).ready(initialize);
  function initialize(){
    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyD9VfODUT3DWnOLZsE9M3WCs4zYdRyAIiM",
      authDomain: "sbcs-pet-finder.firebaseapp.com",
      databaseURL: "https://sbcs-pet-finder.firebaseio.com",
      storageBucket: "sbcs-pet-finder.appspot.com",
    };
    firebase.initializeApp(config);
    
    // Firebase storage
    var storage = firebase.storage();
    var storageRef = storage.ref();
    var imagesRef = storageRef.child('images');
    
    // Path Variable
    var picPath = "";

    $( "#submit" ).click(function() {

      var fName = $('#fname').val();
      var lName = $('#lname').val();
      var email = $('#email').val();
      var phone = $('#phone').val();
      var statusType = $('input[name=lof]:checked', '#typeForm').val()
      var petType = $('input[name=pettype]:checked', '#petform2').val()
      var petName = $('#petName').val();
      var zipCode = $('#zipCode').val();
      var description = $('#description').val();

      writeNewPost(statusType, petType, petName, zipCode, description, fName, lName, email, phone, picPath);
    });

    $("#upload").click(function() {
        console.log("Upload button pressed");
        
        // Picture
        var selectedFile = document.getElementById('myfiles').files[0];
        
        // Firebase Paths
        var path = "images/" + $('#petName').val() + "_" + $('#zipCode').val() + "_" + selectedFile.name;
        picPath = path;
        var pathRef = storageRef.child(path)
        
        // Upload
        var uploadTask = pathRef.put(selectedFile);
        uploadTask.on('state_changed', function(snapshot){
        }, function(error) {
            console.log("Error uploading file");
        }, function() {
            var downloadURL = uploadTask.snapshot.downloadURL;
            console.log("File uploaded successfully");
        });
        
    });

    // $("#upload").click(function() {
    //   alert("clicked upload");
    //   // This is not working yet
    //   uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, {
    //     'complete': function() {
    //       console.log('upload complete!');
    //     }
    //   });
    // });

    function writeNewPost(statusType, petType, petName, zipCode, desc, firstName, lastName, email, phone, picPath) {
      // A post entry.
      var postData = {
        statusType: statusType,
        petType: petType,
        petName: petName,
        zipCode: zipCode,
        desc: desc,
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        picPath: picPath
      };

      // Get a key for a new Post.
      var newPostKey = firebase.database().ref().child('posts').push().key;

      // Write the new post's data simultaneously in the posts list and the user's post list.
      var updates = {};
      updates['/posts/' + newPostKey] = postData;

      return firebase.database().ref().update(updates);
    }
    // [END write_fan_out]


  }
})();
