var displayedImage = document.querySelector('.displayed-img');
var thumbBar = document.querySelector('.thumb-bar');

btn = document.querySelector('button');
var overlay = document.querySelector('.overlay');

/* Looping through images */

  // let arr = ['images/pic1.jpg','images/pic2.jpg','images/pic3.jpg','images/pic4.jpg','images/pic5.jpg'];
  // arr.forEach((ele,i) => {
for(let i = 1 ; i<=5 ;i++){
  var newImage = document.createElement('img');
  newImage.setAttribute('src', 'images/pic'+i+'.jpg' );
  newImage.setAttribute('id',i);
  thumbBar.appendChild(newImage);
}
// });

thumbBar.addEventListener('click',function(e){
  console.log(e.target);
  // console.log(e.target.id);
  displayedImage.src = e.target.src;
})

/* Wiring up the Darken/Lighten button */

let btn1 = document.querySelector('.dark');
btn1.addEventListener('click',function(){

  var btnClass = btn.getAttribute('class');
  if(btnClass === 'dark') {
    btn.setAttribute('class','light');
    btn.textContent = 'Lighten';
    overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
  } else {
    btn.setAttribute('class','dark');
    btn.textContent = 'Darken';
    overlay.style.backgroundColor = 'rgba(0,0,0,0)';
  }

})