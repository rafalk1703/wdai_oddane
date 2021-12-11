    let photo = document.getElementById("photo");
    let photo_name = document.getElementById("photo").alt;


    

    const imgArray = new Array();
    imgArray[0] = new Image();
    imgArray[0].src = './img/img2.jpeg'; 
    imgArray[0].alt = 'img2';
    imgArray[0].style.border= "10px solid blue";
    
    imgArray[1] = new Image();
    imgArray[1].src = './img/img1.jpg';
    imgArray[1].alt = 'img1'; 
    imgArray[1].style.border = "10px solid red";

    var iter = 0;

function change(){
    iter += 1;
    let photo = document.getElementById("photo");

    img = imgArray[iter % 2];
    console.log(img)
    photo.src = img.src;
    photo.alt = img.alt;
    photo.style.border = img.style.border;

}