'use strict';

//var allPostsSection = document.getElementById('all-posts-list');
var postCounter = 0;
/**
 * Creates a post element.
 */


function createPostElement(petName, email, ownerName, desc, phone, statusType, petType, picPath) {

    console.log("Creating Post");
    postCounter = postCounter + 1;
    var leftRight = "containright";
    if(postCounter % 2) {
      leftRight = "containleft";
    }

  var html =
      '<div class="'+leftRight+'">' +
        '<div style="background-image: url('+picPath+')" class="resultbackground"></div>' +
        '<p>' +
        '<h3>'+statusType+' Pet Name</h3>' +
        '<div class="name">'+petName+'</div>' +
        '<h3>Description</h3>' +
        '<div class="name">'+desc+'</div>' +
        '<button>Contact</button>' +
        '</p>' +
     '</div>';

  $('#results').prepend(html);

  // // Create the DOM element from the HTML.
  // var div = document.createElement('div');
  // div.innerHTML = html;
  // var postElement = div.firstChild;
  //
  // // Set values.
  // postElement.getElementsByClassName('name')[0].innerText = "Pet Name: " + petName;
  // postElement.getElementsByClassName('email')[0].innerText = "Email: " + email;

  // return postElement;
}

/**
 * Starts listening for new posts and populates posts lists.
 */
function startDatabaseQueries() {
    console.log("Starting database query");
  // Get all posts
  var allPostsRef = firebase.database().ref('posts/');

  var fetchPosts = function(postsRef) {
    console.log("Fetching Data");
    postsRef.on('child_added', function(data) {
        console.log(data.val());
        createPostElement(data.val().petName,
                          data.val().email,
                          data.val().firstName + data.val().lastName,
                          data.val().desc,
                          data.val().phone,
                          data.val().statusType,
                          data.val().petType,
                          data.val().picPath);
      // var containerElement = sectionElement.getElementsByClassName('results')[0];
      // containerElement.insertBefore(
      //     createPostElement(data.val().petName, data.val().email, data.val().firstName + data.val().lastName, data.val().picPath),
      //     containerElement.firstChild);
    console.log("Done inserting");
    });
  };

  fetchPosts(allPostsRef);
}

// Bindings on load.
window.addEventListener('load', function() {
    // Listen for auth state changes
    startDatabaseQueries();
}, false);
