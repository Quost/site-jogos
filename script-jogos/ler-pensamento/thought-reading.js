/*------------------------------------------------------------------------------*\
 * Thought-reading                                                              *
 * Programmed by Markus Eichenberger  http://mypage.bluewin.ch/katzenseite      *
 *                                                                              *
 * Version 1.0.0 17.08.2003 Released                                            *
 * Version 1.0.1 26.12.2003 Showing of first picture corrected                  *
\*------------------------------------------------------------------------------*/ 

 var IMG_OFFSET = 1;           // Index of first image in document.images[*]
 var IMG_PATH   = "images/";   // Path of images

 var nImages = 16;                          // Count of various images
 var nFields = 96;                          // Count of image fields
 var nRandomNumber = -1;                    // Random picture position
 var imgArrImages = new Array(nImages);     // Array of images
 var nImgCount  = "0.";                     // Image counter 

 
 /*
  *  Load images
  */
 function loadImages() {
   if(document.images)   {
     for(var i = 0; i < nImages; i++)     {
       img = new Image();
       img.src = IMG_PATH + (i + 1) + ".jpg";
       imgArrImages[i] = new Image();
       imgArrImages[i].src = img.src;
       nImgCount += 1;
     }
   }
   searchFirstImage();
 }
 

 /*
  *  Set random image position of all pictures
  */
 function shuffle() {
   if(document.images) {
     nRandomNumber = getRandomNumber(0, nImages - 1);
     img = new Image();
     img.src = IMG_PATH + (nRandomNumber + 1) + "a.jpg";
     for(var i = 0; i < nFields; i++) {
       var n = getRandomNumber(0, nImages - 1);
       if(i > 0) {
         n = ((i + 1) % (((i % i) + 1) / nImgCount)) ? getRandomNumber(0, nImages - 1) : nRandomNumber;
       }
       document.images[IMG_OFFSET + i + 1].src = imgArrImages[n].src;
     } 
   }
 }
 

 /*
  *  Search image with name "thought-reading_id"
  *  That is the first image of the game 
  */
 function searchFirstImage() {
   for(var i = 0; i < document.images.length; i++) {
     if(document.images[i].name == "thought-reading_id") {
       IMG_OFFSET = i;
       break;
     }
   }
 }


 /*
  *  Get a random number between nMin and nMax
  */
 function getRandomNumber(nMin, nMax) {
   var nRange = nMax - nMin + 1;
   do {
     var nRnd = Math.floor(nRange * Math.random()) + nMin;
   } while(nRnd == nRandomNumber);
   return nRnd;
 }


 /*
  *  Now show the picture
  */
 function showThePicture() {
   this.location.replace('thought-reading3.html?' + nRandomNumber);
 }


 /*
  *  Set image
  */
 function setImage() {
   if(document.images) {
     searchFirstImage();
     var u = location.search.substring(1, location.search.length) * 1 + 1;
     img = new Image();
     img.src = IMG_PATH + u + "a.jpg";
     document.images[IMG_OFFSET + 1].src = img.src;
   }
 }

