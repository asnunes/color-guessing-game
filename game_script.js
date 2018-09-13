var difficulty = 6;
var colors = generateRandomColors(difficulty);
//taked color
var pickedColor = pickColor();

//html elements
var h1 = document.querySelector("h1");
var colorDisplay = document.querySelector("#colorDisplay");
var resetButton = document.querySelector("#reset"); // reset button
var easyButton = document.querySelector("#easy");
var hardButton = document.querySelector("#hard");
var ansDisplay = document.querySelector("#msg") // Display if player got the right answer or not
var recs = document.querySelectorAll(".rectangle"); //rectangles on screen

//add listener to reset button
resetButton.addEventListener("click", reset);

//add listeners to easy and hard buttons
easyButton.addEventListener("click", function(){
	if(this.classList.contains("selected")){
		return;
	}

	easyButton.classList.add("selected");
	hardButton.classList.remove("selected");
	difficulty = 3;
	for (var i = 3; i < 6; i++){
		recs[i].style.display = "none";
	}
	reset();
});
hardButton.addEventListener("click", function(){
	if(this.classList.contains("selected")){
		return;
	}

	easyButton.classList.remove("selected");
	hardButton.classList.add("selected");
	difficulty = 6;
	for (var i = 3; i < 6; i++){
		recs[i].style.display = "block";
	}
	reset();
});


//set picket color in h1
colorDisplay.textContent = pickedColor;

for(var i = 0; i < recs.length; i++){
	var rec = recs[i];
	//set default colors
	rec.style.backgroundColor = colors[i];
	//add listeners
	rec.addEventListener("click", recOnClick);
}

//aux functions
function generateRandomColors(length){
	var colors = [];

	for(var i = 0; i < length; i++){
		var red = Math.floor(Math.random() * 256);
		var green = Math.floor(Math.random() * 256);
		var blue = Math.floor(Math.random() * 256);

		colors.push(`rgb(${red}, ${green}, ${blue})`); //add to list
	}

	return colors;
}

function pickColor(){
	var index = Math.floor(Math.random() * colors.length); // takes a random number between 0 
//and colors length and takes the integer part of it;
	return colors[index];
}

function recOnClick(){
	if (this.style.backgroundColor  == pickedColor){
			h1.style.backgroundColor = pickedColor;
			resetButton.textContent = "Play Again?";
			ansDisplay.textContent = "That's correct!";
			for(var j = 0; j < recs.length; j++){
				recs[j].style.backgroundColor = pickedColor; //set all recs to have pickedcolor
			}
		} else {
			ansDisplay.textContent = "Try again!";
			this.style.backgroundColor = "#232323"; //takes body's color;
		}
}

function reset(){
	//variables
	colors = generateRandomColors(difficulty);
	pickedColor = pickColor();
	
	//html and css
	h1.style.backgroundColor = "#16a085";
	resetButton.textContent = "New colors";
	ansDisplay.textContent = "Choose one color"
	colorDisplay.textContent = pickedColor;
	
	for(var i = 0; i < recs.length; i++){
		recs[i].style.backgroundColor = colors[i];
	}
}