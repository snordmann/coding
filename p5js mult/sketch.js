var number = 20;

var table = [];
var z = [];
var div;
var numberinput;

function setup() {
	div = createDiv('').size(windowWidth/2,windowHeight/2);
	show();
}

function show() {	
	z = [];
	table = [];
	
	for (var i = 0; i < number; i++) {
		var g = ggt(i,number);
		if (g == 1) {
			z.push(i);
		}
	}
	
	for (i in z) {
		table[i] = [];
		for (j in z) {
			table[i][j] = ( (z[i] * z[j]) % number );
		}
	}
	
	var html='<table><tr><td style="background-color: rgba(150,150,150,50);"></td>';
	for (i in z) {
		html += "<td style='background-color: rgba(150,150,150,50);'>"+z[i]+"</td>";
	}
	html += "</tr>";
	for (i in table) {
		html += '<tr>';
		html += '<td style="background-color: rgba(150,150,150,50);">'+z[i]+"</td>";
		for (j in table) {
			html += '<td>' + table[i][j] + '</td>';
		}
		html += '</tr>';
	}
	html += '</table>';
	div.html(html);
}

function ggt(m,n)
{
    if (n==0)
        return m;
    else
        return ggt(n, m%n);
}