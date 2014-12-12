	/* ---------------------- mga kelangan  na variable START --------------------------------------------------------------------*/
	
	var enemyId = "";// id ng enemy filename din
	
	var x = 0;//eto ung index na laging tatanggaling sa questionsArray[] , 0 kase laging unang index lang tatanggalen nten;
			var localStorageUsername = window.localStorage.getItem("username");//for checking if already login
			var localQuizArrayName = "quizAlamath";// iba dapat kada game para sa function na 
			var questionsArray = [];
			var quizArray = "";
			var selectedOperation = "";
			
			var selectedLevel = window.localStorage.getItem("quizLevelSelected");
				if(selectedLevel == "quizArrayAddition"){
					selectedOperation = "Addition";
					var quizArray = quizArrayAddition;
					$(".operatorToUse").prop("src","img/png/operators/operation-plus.png");
					$(".selectedCastle").prop("src","img/png/castle/castle-addition.png");
					$(".selectedCastleTxt").prop("src","img/png/castle/txt-addition.png");
					enemyId = 0;
				}else if(selectedLevel == "quizArraySubtraction"){
					selectedOperation = "Subtraction";
					var quizArray = quizArraySubtraction;
					$(".operatorToUse").prop("src","img/png/operators/operation-minus.png");
					$(".selectedCastle").prop("src","img/png/castle/castle-subtraction.png");
					$(".selectedCastleTxt").prop("src","img/png/castle/txt-subtraction.png");
					enemyId = 1;
				}else if(selectedLevel == "quizArrayMultiplication"){
					selectedOperation = "Multiplication";
					var quizArray = quizArrayMultiplication;
					$(".operatorToUse").prop("src","img/png/operators/operation-multiply.png");
					$(".selectedCastle").prop("src","img/png/castle/castle-multiplication.png");
					$(".selectedCastleTxt").prop("src","img/png/castle/txt-multiplication.png");
					enemyId = 2;
				}else if(selectedLevel == "quizArrayDivision"){
					selectedOperation = "Division";
					var quizArray = quizArrayDivision;
					$(".operatorToUse").prop("src","img/png/operators/operation-division.png");
					$(".selectedCastle").prop("src","img/png/castle/castle-division.png");
					$(".selectedCastleTxt").prop("src","img/png/castle/txt-division.png");
					enemyId = 3;
				}
			
			//alert(quizArray);
	
	/* ---------------------- mga kelangan  na variable END --------------------------------------------------------------------*/
	$("#showHideQuestion").click(function(){
			
			$(".mainQuestionContainer ").animate({bottom:"+=200px"},1000);
		
		
	});
	
	$(".btn-pause").click(function(){
		statusPause = 1,
		stopTimer(),
		hideQuestion(),
		$("#pauseModal").modal("show");
	});
	$(".btn-resume").click(function(){
		statusPause = 0,
		getQuestion(),
		forwardEnemy(),
		$("#pauseModal").modal("hide");
	});
	
	$(".mainQuestionContainer").show();
	
	var correctScoreArrayAddition =  [];
	//enemyRespond timer START
	
	createWrongAnswerStorageAddition();
	createCorrectAnswerStorageAddition();
	createStarsStorageAddition();
	
	createCorrectScoreArrayAddition();
	var sessionStarAddition = 0;
	var correctAnswerPoints = 0;
	var wrongAnswerPoints = 0;
	var enemyToRespond = 15;//numbers of enemy to respond
	var pointsToAchieve = enemyToRespond;//points to complete the level
	var pointsGood = pointsToAchieve * .50;
	var pointsVeryGood = pointsToAchieve * .75;
	var pointsExecellent = pointsToAchieve * 1;
	var enemyToRespondInEvery = 5000;//ten seconds
	var enemySpeed = 60000;//enemySpeed
	var progressBarForwardLength = 100/enemyToRespond;//progressBarForwardLength percent of forward in progress bar
	var enemyCounter = 0; //limit lang sa 2 ung nasa labas
	var enemyCounterLimitCounter = 0; //counter ng limit ng enemy
	var enemyCounterLimit = 3; //limit lang sa 2 ung nasa labas
	var statusPause = 0;//boolean 0 false 1 true
	//alert(progressBarForwardLength);
	
	
	var starterEnemyRespondTimer = "";
	getQuestionsIndexes();
	//alert(pointsGood);
	//alert(pointsVeryGood);
	//alert(pointsExecellent);
	
	function jumpChar(){
			var praisePhrase = "Good Job!";
			var praiseList1 = ["Good!","Nice!","Great!","Well Done!"];
			var praiseList2 = ["Very Good!","Legendary!","Great Skills!","Excellent!","Brilliant!"];
			var praiseList3 = ["Clever!","Bravo!","Hooray!","Awesome!","Impressive!","Exceptional!","Outstanding!","Perfect!","Astonishing!","Wonderful!"];
			var praiseList4 = ["Well Done!","Marvellous!","Amazing!","Incredible!","Hooray!"];
			
			
			if(correctAnswerPoints <= pointsGood){
				var randomPraise = Math.floor(Math.random()* praiseList1.length);
				
				praisePhrase = praiseList1[randomPraise];
			}else if(correctAnswerPoints <= pointsVeryGood && correctAnswerPoints > pointsGood){
				var randomPraise = Math.floor(Math.random()* praiseList2.length);
				praisePhrase = praiseList2[randomPraise];
			}else if(correctAnswerPoints < pointsExecellent && correctAnswerPoints > pointsVeryGood){
				var randomPraise = Math.floor(Math.random()* praiseList3.length);
				praisePhrase = praiseList3[randomPraise];
			}else if(correctAnswerPoints == pointsToAchieve){
				var randomPraise = Math.floor(Math.random()* praiseList4.length);
				praisePhrase = praiseList4[randomPraise];
			}
			$(".txtPraisePlayer").html("<h2>"+ praisePhrase +"</h2>");
			$(".charMentorContainer").fadeToggle(100,function(){$(".charMentorContainer").fadeToggle(2000)});
			$(".praisePlayerDiv").fadeToggle(100,function(){$(".praisePlayerDiv").fadeToggle(2000)});
			
			$("#main-char").transition({y:"-2em"},100,
			function(){$("#main-char").transition({y:"-.2em"}),100});		
		}
	function hideQuestion(){
		$(".mainQuestionContainer").animate({bottom:"-20em"},1000);
		
	}
	function showQuestion(){
		if(statusPause == 1){
			hideQuestion();
		}else{
		
		$(".mainQuestionContainer").animate({bottom:"1em"},1000);
		$(".btn-choice").attr("disabled",false);
		}
	}
	
	function createStarsStorageAddition(){
		var a = window.localStorage.getItem("localStarsAddition");
		if(a == null || a == "null" || a == ""){
			var b = window.localStorage.setItem("localStarsAddition",0);
		}
	}
	function createCorrectAnswerStorageAddition(){
		var a = window.localStorage.getItem("localCorrectAnswerAddition");
		if(a == null || a == "null" || a == ""){
			var b = window.localStorage.setItem("localCorrectAnswerAddition",0);
		}
	}
	function createWrongAnswerStorageAddition(){
		var a = window.localStorage.getItem("localWrongAnswerAddition");
		if(a == null || a == "null" || a == ""){
			var b = window.localStorage.setItem("localWrongAnswerAddition",0);
		}
	}
	
	function storeStarsAdditionToLocalStorage(){
		var a = (window.localStorage.getItem("localStars"+selectedOperation));
		if(a == null || a == "null" || a == "" || a == "NaN"){
			a = 0;
		}
		var b = parseInt(a) + sessionStarAddition;
		window.localStorage.setItem("localStars"+selectedOperation,b);
		
	}
	function storeCorrectAnswerToLocalStorage(){
	
		var a = (window.localStorage.getItem("localCorrectAnswer"+selectedOperation));
		if(a == null || a == "null" || a == "" || a == "NaN"){
			a = 0;
		}
		var b = parseInt(a) + 1;
		window.localStorage.setItem("localCorrectAnswer"+selectedOperation,b);
		
	}
	function storeWrongToLocalStorage(){
		var a = (window.localStorage.getItem("localWrongAnswer"+selectedOperation));
		if(a == null || a == "null" || a == "" || a == "NaN"){
			a = 0;
		}
		var b = parseInt(a) + 1;
		window.localStorage.setItem("localWrongAnswer"+selectedOperation,b);
		
	}
	function createCorrectScoreArrayAddition(){
	
		var a = window.localStorage.getItem("localCorrectScoreArrayAddition");
		if(a == null || a == "null" || a == ""){
			window.localStorage.setItem("localCorrectScoreArrayAddition",JSON.stringify(correctScoreArrayAddition));// quizArray naka include sa taas sa <script></script>
		}
		
	}
	function storeCorrectScoreArray(){
		//alert("asd");
		var a = [];
		a = JSON.parse(window.localStorage.getItem("localCorrectScoreArray"+selectedOperation));
		if(a == null || a == "null" || a == "" || a == "NaN" || a == undefined || a == "undefined"){
			a = [];
		}
		var b = [];
		b = correctAnswerPoints;
		a.push(b);
		window.localStorage.setItem("localCorrectScoreArray"+selectedOperation,JSON.stringify(a));
		
	}
	
	function startEnemyRespondTimer(){
		forwardEnemy();
		clearTimeout(starterEnemyRespondTimer);
		clearInterval(starterEnemyRespondTimer);
		starterEnemyRespondTimer = setInterval(function(){enemyRespondTimer()},enemyToRespondInEvery);
	//	myTimer2 = setInterval(function(){myTimer3()},500);
	}
	
	function enemyRespondTimer(){
		
		
		if(enemyToRespond == 0){
			
			//alert("no more enemy");
		}else if(enemyToRespond > 0){
			//alert("add new enemy");
			//getQuestion();
				addEnemy();
		}
	}
	
	function gameStart(){
		reset();
		startEnemyRespondTimer();
		displayCorrectAndWrongPoints();
			
		};
	function reset(){
		var correctAnswer = 0;
		var wrongAnswer = 0;
	};
	
	function addCorrectAnswerPoints(){ 
	
		correctAnswerPoints++;
		forwardProgressBar();
		//alert(correctAnswerPoints);
		displayCorrectAndWrongPoints();
		if(correctAnswerPoints == pointsToAchieve){
			//alert("Level Completed");
				$(".mainQuestionContainer").hide();
			setTimeout(function(){
				//showGameOverModal();
				$(".endModalTitle").html("Level Completed!");
				gameOver();
			},1500);
			}else{
			
			}
		storeCorrectAnswerToLocalStorage();
		}
	function checkIfLevelIsCompleted(){
		if(correctAnswerPoints == pointsToAchieve){
			removeAllenemy();
			alert("Level Completed");
			}
	}
	function addWrongAnswerPoints(){ 
		wrongAnswerPoints++;
		
		//alert(wrongAnswerPoints);
		displayCorrectAndWrongPoints();
		storeWrongToLocalStorage();
		}
		
		
	function displayCorrectAndWrongPoints(){
		$(".txtCorrectAnswerPoints").html(correctAnswerPoints);
		$(".txtWrongAnswerPoints").html(wrongAnswerPoints);
	}
	
	function forwardProgressBar(){
		
		var a = progressBarForwardLength;
		var aaa = progressBarForwardLength * progressBarForwardLength;
		var aa = parseInt($(".progressBarDiv").width());
		//alert(aa);
		
		var bb = aa + aaa;
		//alert(bb);
		
		var b = "+="+a+"%";
		var c = a * progressBarForwardLength;
		//alert(c);
		$(".progressBarDiv").animate({width:b},1000);
		
	}
	
	function addToEnemyCounter(){
		enemyCounter++;
		
		$(".txtEnemyCounter").html(enemyCounter);
	}
	function checkEnemyEqualToGoal(){
		if(enemyCounter == 10){
			alert("tama na!");
			return;
		}else{
			
		}
	}
	
	function showGameOverModal(){
		var z = window.localStorage.getItem("localAccountUsername");
		$(".txtLocalUsername").html(z);
		$("#gameOverAllModal").modal("show");
		$(".scoreStar").remove();
		if(correctAnswerPoints <= pointsGood){
			sessionStarAddition = 1;
			//alert("good");
			$(".txtPointsRank").html("Good Job!Lets try it again ");
			$(".txtNoOfStars").html("1 star");
			$(".scoreStarContainer").append("<img src='img/png/score-star.png' alt='' class='scoreStar img-thumbnail col-lg-4 col-md-4 col-sm-4 col-xs-4 noBG borderless ' />");
			$(".scoreStarContainer").append("<img src='img/png/score-star-dark.png' alt='' class='scoreStar img-thumbnail col-lg-4 col-md-4 col-sm-4 col-xs-4 noBG borderless ' />");
			$(".scoreStarContainer").append("<img src='img/png/score-star-dark.png' alt='' class='scoreStar img-thumbnail col-lg-4 col-md-4 col-sm-4 col-xs-4 noBG borderless ' />");
		}else if(correctAnswerPoints > pointsGood & correctAnswerPoints <= pointsVeryGood){
			sessionStarAddition = 4;
			$(".txtPointsRank").html("Very Good!");
			$(".txtNoOfStars").html("4 stars");
			$(".scoreStarContainer").append("<img src='img/png/score-star.png' alt='' class='scoreStar img-thumbnail col-lg-4 col-md-4 col-sm-4 col-xs-4 noBG borderless ' />");
			$(".scoreStarContainer").append("<img src='img/png/score-star.png' alt='' class='scoreStar img-thumbnail col-lg-4 col-md-4 col-sm-4 col-xs-4 noBG borderless ' />");
			$(".scoreStarContainer").append("<img src='img/png/score-star-dark.png' alt='' class='scoreStar img-thumbnail col-lg-4 col-md-4 col-sm-4 col-xs-4 noBG borderless ' />");
		}else if(correctAnswerPoints == pointsExecellent){
			sessionStarAddition = 3;
			$(".txtPointsRank").html("Excellent!");
			$(".txtNoOfStars").html("3 stars");
			$(".scoreStarContainer").append("<img src='img/png/score-star.png' alt='' class='scoreStar img-thumbnail col-lg-4 col-md-4 col-sm-4 col-xs-4 noBG borderless ' />");
			$(".scoreStarContainer").append("<img src='img/png/score-star.png' alt='' class='scoreStar img-thumbnail col-lg-4 col-md-4 col-sm-4 col-xs-4 noBG borderless ' />");
			$(".scoreStarContainer").append("<img src='img/png/score-star.png' alt='' class='scoreStar img-thumbnail col-lg-4 col-md-4 col-sm-4 col-xs-4 noBG borderless ' />");
		}
		
	}
	
	
	//enemyRespond timer END
	/* ADDTIONAL START*/
		var ms = 50;	
			var myTimer= "";  
			var myTimer2= "";  
	var testtest = "";
	function stopTimer(){
		$(".enemy-sample").stop();
		
		
		//alert("Game Over");
		//location.href = "main-map.html";
	}
	function gameOver(){
		//alert("ASD");
		storeCorrectScoreArray(),
		showGameOverModal(),
		storeStarsAdditionToLocalStorage();
	};
	function startGameTimer(){
		
		//$("#gameTimer").val(m);
		
		clearTimeout(myTimer2),
		clearInterval(myTimer2),
		forwardEnemy();
		
		myTimer2 = setInterval(function(){myTimer3()},500);
		
		
	}
	
	function changeCharElements(){
		
		var c = window.localStorage.getItem("character");
		if(c == "maleCharEdit"){
			//alert("male");
			$(".mainCharImg").prop("src","img/png/main-char-male.png");
			
			$("#main-char").css({background:'url("img/png/main-char-male.png")no-repeat right bottom'});
			$("#main-char").css({"background-size":'60%'});
			
			$(".playerHeadContainer").prop("src","img/png/player-head-m.png");
		}else if(c == "femaleCharEdit"){
			//alert("female");
			$(".mainCharImg").prop("src","img/png/main-char-female.png");
			$("#main-char").css({background:'url("img/png/main-char-female.png")no-repeat right bottom'});
			$("#main-char").css({"background-size":'60%'});
			
			$(".playerHeadContainer").prop("src","img/png/player-head-g.png");
		}
	}
	
	function myTimer3(){
		//var time = document.getElementById("gameTimer").value=m;
		//setTimeout(function(){
			//$("#gameTimer").val(m);
		//});
		//ms--;
		//alert(ms);
		//forwardEnemy();
		
		
		e = $(".enemy-sample").position();
		if(e == "undefined" || e == undefined){
		
		}else{
			if(e.left <= mReady){
				$(".endModalTitle").html("Game Over!");
				$(".enemy-sample").stop();
				$(".enemy-box").stop();
				clearTimeout(myTimer2);
				clearInterval(myTimer2);
				gameOver();
			}else{
					
			}
		}	
		//if(ms==0){
		//alert("Game Over!!! Try Again"+'\n'+"You have to quit the game...");
		//clearTimeout(myTimer);
		//clearTimeout(myTimer);
		//clearTimeout(myTimer);
		//clearInterval(myTimer);
		//gameOver();
		//alert("Times up");
		//}
	}
	
	var m = $("#main-char").position();
			var characterWidth = ($("#main-char").width())* .8;
			var mReady = m.left + characterWidth;
			//alert("Mready = "+mReady);
			
			
				var e = $(".enemy-sample").position();
			
			function forwardEnemy(){
				var screenWidth = $(window).width();
				//alert("screen width  = "+ screenWidth);
				
				var enemyWalkLength = ".82";
				
				var enemyCompute = screenWidth * enemyWalkLength;
				//alert("enemyCompute = "+ enemyCompute);
				
				var enemyComputeReady = "+="+enemyCompute;
				//alert("computed screen 10% == "+ enemyCompute);
				//alert(enemyComputeReady);
				pospx = {'right' : enemyComputeReady};

			//	$("#newsPix").delay(2000).animate(pospx, 1000);
			
				
				$(".enemy-sample").animate(pospx,enemySpeed);
				//$(".enemy-sample").animate().transition({ transform: "translateX(-"+enemyCompute+"px)"},enemySpeed,function(){alert("shite")});
				//$(".enemy-sample").animate().transition({ transform: "translateX(-"+enemyCompute+"px)"},enemySpeed);
				

				
				//alert("e " + e.left);
					
				//alert("m " + mReady);
				
					
				}
					
				
			function addEnemy(){
				
				if(enemyCounter == pointsToAchieve){
					alert("tama na!");
					return;

				}else{
					//alert(enemyCounterLimitCounter);
					if(enemyCounterLimitCounter >= 1){
						
					}else if(enemyCounterLimitCounter < 1){
						
						enemyToRespond--,
						enemyCounterLimitCounter++,
						$(".txtTestCounter").html(enemyCounterLimitCounter),
						addToEnemyCounter(),
						$("#enemyRespawn").append("<div class='enemy-sample enemy-box'><img src='img/png/enemy-images/"+ enemyId +".png' alt='' class='imgEnemyInside' /></div>"),
						
						startGameTimer();
					}
				}
				
				
				//forwardEnemy();
			}
			
			function removeEnemy(){
			
				//alert(enemyCounter);
				if($('.enemy-sample').is(':animated')){
					$("#enemyRespawn").children(".enemy-sample:first-child").stop(),
					$("#enemyRespawn").children(".enemy-box:first-child").children(".imgEnemyInside").transition({opacity:"0"}),
					$("#enemyRespawn").children(".enemy-box:first-child").stop(function(){
						$("#enemyRespawn").children(".enemy-box:first-child").removeClass("enemy-sample");
						
					});
					
					setTimeout(function(){
						$("#enemyRespawn").children(".enemy-box:first-child").addClass("enemy-lightning");
						},100);
					
					$("#enemyRespawn").children(".enemy-box:first-child").transition({opacity:"0"},2000,function(){
						$("#enemyRespawn").children(".enemy-lightning:first-child").remove();
					});
					
				}else{
					$("#enemyRespawn").children(".enemy-sample:first-child").stop();
					$("#enemyRespawn").children(".enemy-box:first-child").stop(function(){
						$("#enemyRespawn").children(".enemy-box:first-child").removeClass("enemy-sample");
					});
					
					setTimeout(function(){
						$("#enemyRespawn").children(".enemy-box:first-child").addClass("enemy-lightning");
						},100);
					
					$("#enemyRespawn").children(".enemy-box:first-child").transition({opacity:"0"},2000,function(){
						$("#enemyRespawn").children(".enemy-lightning:first-child").remove();
					});
					
				
				}
				
			}
			
			function removeAllenemy(){
				if($('.enemy-sample').is(':animated')){
					$("#enemyRespawn").children(".enemy-sample").stop();
					$("#enemyRespawn").children(".enemy-box").stop(function(){
						
					$("#enemyRespawn").children(".enemy-box").removeClass("enemy-sample",3000);
					});
					$("#enemyRespawn").children(".enemy-box").addClass("enemy-lightning");
					$("#enemyRespawn").children(".enemy-box").fadeToggle(3000,function(){
						
						$("#enemyRespawn").children(".enemy-lightning").remove();
					});
					
				}
			}
	/* ADDTIONAL END*/
	
	/* onload FUNCTIONS START */

	
	/*
	splashScreenIntro();//splash screen function --index.html
	checkIfLogin();//--index.html
	storeQuizArrayToLocalStorage();//store quizArray to localStorage --index.html
	getLeaderboard(); //call ajax leaderboard; --leaderboard_page.html
	displayGameOverScoreAndPreviousScore();//display score on --game_over_page.html
	//gameStart();//--index.html
	startRsg();main_game_page.html
	*/
	
	
	
	//timer START
	//var d=new Date();
	//var mytime=d.getSeconds();
	//var mytime=d.getMinutes();
	var myRsgTimer = "";
	
	var myTimer= "";  
	
	var m=10;
	
	var rsg =3;
	//start();
	function start(){
		m = 10;
		
		$("#gameTimer").val(m);
		clearTimeout(myTimer);
		clearInterval(myTimer);
		
		setTimeout(function(){
		myTimer = setInterval(function(){myTimer1()},5000);
		});
	}
	
	function myTimer1(){
		//var time = document.getElementById("gameTimer").value=m;
		setTimeout(function(){
			$("#gameTimer").val(m);
		});
		m--;
		
		
		
		if(m==0){
		//alert("Game Over!!! Try Again"+'\n'+"You have to quit the game...");
		//clearTimeout(myTimer);
		clearTimeout(myTimer);
		clearTimeout(myTimer);
		//clearInterval(myTimer);
		gameOver();
		}
	}
	
	//timer END
	
	function startRsg(){
		//rsg = 3;
		
		//$("#rsgTimer").val(rsg);
		//$("#rsgTimer").html(rsg);
		$("#rsgTimer").html("Ready!");
		
		
		clearTimeout(myRsgTimer);
		clearInterval(myRsgTimer);
		setTimeout(function(){
		myRsgTimer = setInterval(function(){myRsgTimer1()},700);
		});
	}
	
	function myRsgTimer1(){
		//var time = document.getElementById("gameTimer").value=m;
		setTimeout(function(){
			//$("#rsgTimer").val(rsg);
			//$("#rsgTimer").html(rsg);
		
		});
		rsg--;
		if(rsg == 3){
			$("#rsgTimer").html("Ready!");
		
		}
		if(rsg == 2){
			$("#rsgTimer").html("Set!");
		}
		if(rsg == 1){
			$("#rsgTimer").html("GO!!!");
		}
		
		
		
		if(rsg==0){
		//alert("Game Over!!! Try Again"+'\n'+"You have to quit the game...");
		//clearTimeout(myTimer);
		clearTimeout(myRsgTimer);
		clearTimeout(myRsgTimer);
		//clearInterval(myTimer);
		//gameOver();
		$("#rsgTimerModal").hide();
		gameStart();
		}
	}
	
	//timer END
	/* onload FUNCTIONS END */
	
	
	
	/*---------------------------------- navigation btn and functions START -------------------------------------------*/
	$("#stopTime").click(function(){
		start();
	});
	
	
	
	
	
	
	
	$("#btn-play").click(function(){
		savePreviousScore();
		location.href = "main_game_page.html";
	});
	
	$("#btn-gameover-test").click(function(){
		
	});
	
	$(".btn-main-menu").click(function(){
		location.href = "index.html";
	});
	
	$("#btn-leaderboard").click(function(){
		//location.href = "leaderboard_page.html";
		/* modal START */
		setTimeout(function(){
			 $modal.load('leaderboard_page.html', '', function(){
			 $modal.modal();
			});
		  },10); 
		/* modal END */
		
	});
	
	$(".btn-login").click(function(){
		localStorageUsername = window.localStorage.getItem("username");
		//alert(localStorageUsername);
		if(localStorageUsername == "" || localStorageUsername == "null" || localStorageUsername == "undefined" ||localStorageUsername == null ){
			//location.href = "login_page.html";
			/* modal START*/
			//var $modal = $(".index_modal_container");
			  setTimeout(function(){
				 $modal.load('login_page.html', '', function(){
				 $modal.modal();
				});
			  },10); 
			
			/* modal END*/
			
			
		}else{
			logout();
		}
		
	});
	
	$("#btn-register").click(function(){
		//location.href = "registration_page.html"
		
		 setTimeout(function(){
				 $modal.load('registration_page.html', '', function(){
				  $modal.modal();
				});
			  },10); 
	});
	$("#btn-post-score-online").click(function(){
		postScoreOnline();
	});
	
	$("#btn-play-again").click(function(){
		savePreviousScore();
		location.href = "main_game_page.html";
	});
	

	
	$(".btn-choice").click(function(){
			//setTimeout(myTimer1);
			
			
			
			$(".btn-choice").attr("disabled",true);
			//check answer START
			var answer = $(this).val();
			var correctAnswer = $("#correct").val();
			if(answer == correctAnswer){
				$(".imgCorrectWrong").prop("src","img/png/correct.png"),
				addCorrectAnswerPoints();
				jumpChar();
					enemyCounterLimitCounter--;
				$(".txtTestCounter").html(enemyCounterLimitCounter);
				enemyRespondTimer();//add an enemy if the answer is correct
				hideQuestion();
				removeEnemy();
				setTimeout(function(){
					getQuestion();
				},1000);
				
				
				
			}else{
				$(".imgCorrectWrong").prop("src","img/png/wrong.png"),
				addWrongAnswerPoints();
				hideQuestion();
				var encouragementList = ["Lets try Again","Keep going","Nice try"]
				var randomEncouragement = Math.floor(Math.random()* encouragementList.length);
				
				
				$(".txtPraisePlayer").html("<h3>"+ encouragementList[randomEncouragement] +"</h3>");
					$(".charMentorContainer").fadeToggle(100,function(){$(".charMentorContainer").fadeToggle(2000)});
					$(".praisePlayerDiv").fadeToggle(100,function(){$(".praisePlayerDiv").fadeToggle(2000)});
					
				//gameOver();
				//gameStart();
				setTimeout(function(){
					getQuestion();
				},1000);
			}
			//check answer END
		
	
		
	});//onclick btn-choice END
	/*---------------------------------- navigation btn and functions END -------------------------------------------*/

	


	
	
	/* -------------------------------------- functions START --------------------------------------------------------------------*/
	//for index.html onload
	
	
	
	function splashScreenIntro(){
		var a = sessionStorage.getItem("splash_start");
		if(a == null || a == "" || a == "null" || a == "undefined"){
			setTimeout(function(){
				$(".splashImg").fadeToggle();
					setTimeout(function(){
						$("#splashScreen").fadeToggle();
						//location.href = "index.html";
						sessionStorage.setItem("splash_start",1);
					});
				
			},3000);//1000 for 1 sec
		}else{
			$("#splashScreen").css({"height":"0"});
			$(".splashImg").css({"height":"0"});
			$(".splashImgLogo").css({"height":"0"});
						
		
		}
		
	}
	//for index.html onload
	function checkIfLogin(){
		if(localStorageUsername == "" || localStorageUsername == null){
			$("#btn-login").val("Log In");
			$("#btn-register").show();
		}else{
			$("#txt-username").text("Welcome \n"+localStorageUsername);
			$("#btn-login").val("Log Out");
			$("#btn-register").hide();
		}
		
	}
	function logout(){
		if(localStorageUsername == "" || localStorageUsername == null){
			
		}else{
			//if already login ,clear localstorage and change btn-login value
			//logout functions means clearing localstorage 
			window.localStorage.setItem("user_id","");
			window.localStorage.setItem("username","");
			
			$("#txt-username").text("");
			$("#btn-login").val("LOG IN");
			
			//alert("You are log out");
		}
	}
	
	//for leaderboard_page.html onload
	function getLeaderboard(){
		
		var rank = 0;
		$.ajax({
			url: "quiz_online_files/display_leaderboard.php",
			type: "GET",
			dataType: "json",
			success: function(data){
				$(".leaderboardRow").remove();
				for(var i=0;i<data.length;i++){
					rank++
					
					$('#leaderboardTable').append(
					'<tr class="leaderboardRow"><td>'+ rank + '</td><td>'+data[i].user_username+ '</td><td>'+data[i].score_score+'</td> </tr>'
					
					);
				}
			},
			error: function(){
				//do something if error
			}
			
		});
	}
	
	//activate when #btn-post-score-online .click 
	function postScoreOnline(){		
		//check if user is login
		//check in local storage if user_username and user_id is stored
		
		var a = window.localStorage.getItem("user_id");
		var b = window.localStorage.getItem("username");
		var c = window.localStorage.getItem("local-storage-game-over-score");
		
		if(a == null || a == ""){
			$("#game_over_page_msg").html("You need to <a class='btn-login' href='#stack2' data-toggle='modal'>login</a>");
			//alert("You should login to post online");
			//location.href = "login_page.html";
		}else if(a == "no internet connection"){
			//alert("No internet connection");
			$("#game_over_page_msg").html("No internet connection");
		}else {
			//check if have internet
			$.ajax({
				url: "quiz_online_files/post_score_online.php",
				type: "POST",
				data: {"user_id":a,"user_username":b,"score":c},
				success: function(data){
					if(data=="not"){
						//alert("Failed");
						$("#game_over_page_msg").html("Failed");
					}else if(data=="success"){
						//alert("Ok na!. na POST NA BOOOOOOOOOOOOOOOM!");
						$("#game_over_page_msg").html("Your Score was posted online");
						
						
					}
					else{
						$("#game_over_page_msg").html("Your Score was posted online!");
						//alert(data);
						$("#btn-post-score-online").hide();
					}
				}
				
			});
		}
	}
	
	//for index.html onload
	function storeQuizArrayToLocalStorage(){
		//var db = window.localStorage.getItem(localQuizArrayName);
		//if(db == null || db == ""){
		//	window.localStorage.setItem(localQuizArrayName,JSON.stringify(quizArray));// quizArray naka include sa taas sa <script></script>
			//alert(localQuizArrayName + " \n store to db");
	//	}
		//else{
			//alert("db  " + localQuizArrayName + "  already exist!");
		//}
		
		
	}
	
	
	//for main_game_page.html under the function gameStart()
	function getQuestionsIndexes(){
		
		setTimeout(function(){
		//get request from questions json file
		//get its length
		// var questionsIndexes = [];
		//for(i=0;i< questionsJsonFile.length;i++){
		//	questionsIndexes.push(i);
		//}
		
		//test START
		var questionsIndexes = [];	
		
		//var quizArray = JSON.parse(window.localStorage.getItem(localQuizArrayName));
		//get quizArray on localStorage
		
	
		
		//$.ajax({
		//	url: "quiz.js",
		//	type: "GET",
		//	dataType: "json",
		//	success: function(data){
			
				for(i=0;i < quizArray.length;i++){
					questionsIndexes.push(i);
				}
				
				//	var questionsIndexes = [0,1,2,3];//eto ung indexes ng mga questions kung 100 items lahat gawin mo lang [0,1,2 . . . 99]
			var	randomizeIndexes = [];//eto ung array na paglalagyan ng mararandom na mga questionsIndexes
			var	i = questionsIndexes.length;
			var	j = 0;

			while (i--) {
				j = Math.floor(Math.random() * (i+1));
				randomizeIndexes.push(questionsIndexes[j]);
				questionsIndexes.splice(j,1);
			}
			
			questionsArray = randomizeIndexes; // naka random na ung indexes ng mga questions naten
			$("#testArray").val(questionsArray);
			getQuestion();
				
				addEnemy();
			//}
		//	});
		
			
		//test END
		
		},50);
	};
	
	//for main_game_page.html activate on page onload and on next question
	function getQuestion(){
	
		if(questionsArray == ""){
			//gameOver();
			//alert("Congratulations!\n You Completed this Level!");
			//location.href = "main-map.html";
			//alert("no more questions!");
		}else{
			showQuestion();
			//	addEnemy();
			//var quizArray = JSON.parse(window.localStorage.getItem(localQuizArrayName));
			//start();
		//	$.ajax({
		//		url: "quiz.js",
		//		type: "GET",
		//		dataType: "json",
		//		success: function(data){
					var get = questionsArray[0];
									
					var question = quizArray[get].question;
					var choice1 = quizArray[get].choice1;
					var choice2 = quizArray[get].choice2;
					var choice3 = quizArray[get].choice3;
					var choice4 = quizArray[get].choice4;
					var correct = quizArray[get].correct;
					
					$("#question").val(question);
					$("#choice1").val(choice1);
					$("#choice2").val(choice2);
					$("#choice3").val(choice3);
					$("#choice4").val(choice4);
					$("#correct").val(correct);
					var get = questionsArray[0];
									
					var q1 = parseInt(quizArray[get].q1);
					var q2 = parseInt(quizArray[get].q2);
					
					
					$("#question").val(question);
					$("#choice1").val(choice1);
					$("#choice2").val(choice2);
					$("#choice3").val(choice3);
					$("#correct").val(correct);
					
					
					$(".imagesOnLeftRemove").remove();
					var randomCountingImage = Math.floor(Math.random()*10);//4 palang number of images
					for(i=0;i < q1;i++){
						
						$(".imageOnLeft").append("<img  src='img/png/counting-images/"+ randomCountingImage +".png' class='imagesOnLeftRemove paddingThin btn-back-to-main-menu img-thumbnail noBG borderless col-lg-2 col-md-2 col-sm-2 col-xs-2' alt='teasd' style='float:right' />")
					}
					$(".imagesOnRightRemove").remove();
					for(i=0;i < q2;i++){
						$(".imageOnRight").append("<img  src='img/png/counting-images/"+ randomCountingImage +".png' class='imagesOnRightRemove paddingThin btn-back-to-main-menu img-thumbnail noBG borderless col-lg-2 col-md-2 col-sm-2 col-xs-2' alt='teasd' style='float:left' />")
					}
					
					var removed = questionsArray.splice(x,1);
					questionsArray.push(questionsArray[0]);
					$("#testArray").val(questionsArray);
			//	},
			//	error: function(){
					//do something if $.ajax not success
			//	}
			//});	
		}			
	};
	
	//for main_game_page.html onload
	
	
	//for main_game_page.html onload , activate if answer is correct
	function addScore(){
		//alert("MAY TAMA KA!");
		var a = parseInt($("#score").val()) + 1;
		$("#score").val(a);
	}
	
	//for main_game_page.html onload, activate on gameStart()
	
	
	//for main_game_page.html activate on Wrong Answer
	
	
	//function for game_over_page.html onload
	function displayGameOverScoreAndPreviousScore(){
		var localGameOverScore = window.localStorage.getItem("local-storage-game-over-score");
		var localPreviousScore = window.localStorage.getItem("local-storage-previous-score");
		
		if(localPreviousScore == "null" || localPreviousScore == "" || localPreviousScore == "undefined"){
			localPreviousScore = 0;
		}
		$("#txt-game-over-score").val(localGameOverScore);
		$("#txt-previous-score").val(localPreviousScore);
	}
	
	//function for game_over_page.html onload
	function timerStart(){
	
		
	}
	
	
	function getPreviousScore(){
		var previouScore = window.localStorage.getItem("local-storage-previous-score");
		 
	}
	//function for main_game_page.html onload
	function saveGameOverScoreOnLocalStorage(){
		var gameOverScore = $("#score").val();
		window.localStorage.setItem("local-storage-game-over-score", gameOverScore);
	}
	
	//function for main_game_page.html onload
	function savePreviousScore(){
		
		var gamePreviousScore = window.localStorage.getItem("local-storage-game-over-score");
		window.localStorage.setItem("local-storage-previous-score", gamePreviousScore);
			
		
	}

	/* -------------------------------------- functions END --------------------------------------------------------------------*/
		

	