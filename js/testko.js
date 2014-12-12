$(document).ready(function(){
		
		var scoreOnly = [];
		var dateOnly = [];
		
		var scoreArray = JSON.parse(window.localStorage.getItem("localCorrectScoreArrayAddition"));
		var a = scoreArray.length;
		alert(a);
		for(var i=0;i < a; i++){
			scoreOnly.push(scoreArray[i].score);
			dateOnly.push(scoreArray[i].date);
			alert(scoreOnly);
		}
		
		
		var randomScalingFactor = function(){ return Math.round(Math.random()*15)};
		var barChartData = {
			labels : dateOnly,
			datasets : [
				{
					label: "My First dataset",
					fillColor : "rgba(220,220,220,0.2)",
					strokeColor : "rgba(220,220,220,1)",
					pointColor : "rgba(220,220,220,1)",
					pointStrokeColor : "#fff",
					pointHighlightFill : "#fff",
					pointHighlightStroke : "rgba(220,220,220,1)",
					data : scoreOnly
				}
			]

		}

	function kk(){
		var ctx = document.getElementById("canvas").getContext("2d");
		window.myBar = new Chart(ctx).Bar(barChartData, {
			responsive: true
		});
	}
	
	kk();
	
	
	});