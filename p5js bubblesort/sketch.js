var arrlen = 50;
var scl;
var sortArr = [];
var unsortArr = [];
var possibleheights = [];

function setup() {
	createCanvas(windowWidth, windowHeight);
	
	scl = width/arrlen;

	
	for (var i = 0; i < arrlen; i++) {
		possibleheights[i] = map(i,0,arrlen,5,height);
	}
	for (var i = 0; i < arrlen; i++) {
		var ind = floor( random( possibleheights.length ) );
		unsortArr[i] = possibleheights[ind];
		possibleheights.splice(ind,1);
		sortArr[i] = 0;
	}
}

var index = 0;

function draw() {
	background(26);
	
	for ( i in sortArr ) {
		noStroke();
			fill(255);
		
		rect(i*scl, height - sortArr[i], scl, sortArr[i]);
	}	
	for ( i in unsortArr ) {
		noStroke();
		if (i != index) 
			fill(255);
		else
			fill (255,0,150);
		
		rect(i*scl, height - unsortArr[i], scl, unsortArr[i]);
	}

		if (unsortArr[index] > unsortArr[index+1]) {		
			swap (unsortArr, index, index+1);
		}
		
		index ++;
		if (index > unsortArr.length - 1) {
			sortArr[index-1] = unsortArr[unsortArr.length - 1];
			unsortArr.splice(unsortArr.length - 1, 1);
			index = 0;
		}

	
	if ( unsortArr.length < 1 ) {
		console.log("FINISHED");
		noLoop();
	}
}

function swap(arr, i1, i2) {
	var tmp = arr[i1];
	arr[i1] = arr[i2];
	arr[i2] = tmp;
} 