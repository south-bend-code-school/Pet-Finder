
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

    $( "#submit" ).click(function() {

      var statusType = $('input[name=lof]:checked', '#typeForm').val()
      var petType = $('input[name=pettype]:checked', '#petform2').val()
      var petName = $('#petName').val();
      var zipCode = $('#zipCode').val();
      var description = $('#description').val();

      writeNewPost(statusType, petType,petName,zipCode,description,'homer','simpson','homer@sbcs.com', '123-123-1231');
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

    function writeNewPost(statusType, petType, petName, zipCode, desc, firstName, lastName, email, phone) {
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
        phone: phone
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
