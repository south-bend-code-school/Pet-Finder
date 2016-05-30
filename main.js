'use strict';

var allPostsSection = document.getElementById('all-posts-list');

/**
 * Creates a post element.
 */
function createPostElement(petName, email, ownerName, picPath) {
    console.log("Creating Post");
  var html =
      '<div class="containleft">' +
        '<div id="result6" class="resultbackground"></div>' +
        '<p>' +
        '<div class="name"></div>' +
        '<div class="email"</div>' +
        '<div class ="owner"></div>' +
        '</p>' +
     '</div>';

  // Create the DOM element from the HTML.
  var div = document.createElement('div');
  div.innerHTML = html;
  var postElement = div.firstChild;
  //componentHandler.upgradeElements(postElement.getElementsByClassName('mdl-textfield')[0]);

  // Set values.
  postElement.getElementsByClassName('name')[0].innerText = "Pet Name: " + petName;
  postElement.getElementsByClassName('email')[0].innerText = "Email: " + email;
  //postElement.getElementsByClassName('owner')[0].innerText = "Owner: " + ownerName;
    
  return postElement;
}

/**
 * Starts listening for new posts and populates posts lists.
 */
function startDatabaseQueries() {
    console.log("Starting database query");
  // Get all posts
  var allPostsRef = firebase.database().ref('posts/');

  var fetchPosts = function(postsRef, sectionElement) {
    console.log("Fetching Data");
    postsRef.on('child_added', function(data) {
        console.log(data.val());
      var containerElement = sectionElement.getElementsByClassName('posts-container')[0];
      containerElement.insertBefore(
          createPostElement(data.val().petName, data.val().email, data.val().firstName + data.val().lastName, data.val().picPath),
          containerElement.firstChild);
    console.log("Done inserting");
    });
  };

  fetchPosts(allPostsRef, allPostsSection);
}

// Bindings on load.
window.addEventListener('load', function() {
    // Listen for auth state changes
    startDatabaseQueries(); 
    allPostsSection.style.display = 'block';
}, false);
