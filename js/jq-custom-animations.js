
function openWindow(){
	$(".leftWindow").animate({left: "-50%"},1000);
	$(".rightWindow").animate({right: "-50%"},1000);
}
function closeWindow(){
	$(".leftWindow").transition({left: "+=50%"},500);
	$(".rightWindow").transition({right: "+=50%"},500);
}
function checkIfHaveLocalAccountForBtnGameStart(){
		var a = window.localStorage.getItem("localAccountUsername");
		if(a == null || a == "null" || a == ""){
			$("#localLoginModal").modal("show");
		}				
		else{
		 //alert("Welcome user");
		 location.href = "main-map.html";
		}
	}
function checkIfHaveLocalAccountForBtnOption(){
	
		var a = window.localStorage.getItem("localAccountUsername");
		if(a == null || a == "null" || a == ""){
			$("#localLoginModal").modal("show");
			
		}				
		else{
		 $("#localLoginEditModal").modal("show");
		 var a = window.localStorage.getItem("localAccountUsername");
		 $(".txtHiUsername").html(a);
		 //location.href = "main-map.html";
		}
	}
$("#btn-game-start").click(function(){
	$(".welcomeDiv").hide();
		$("#inputLocalUsername").val("");
		$(".txtLoginLocalErrorMsg").html("");
	/*	closeWindow(),

	setTimeout(function(){
		openWindow();
	},2500);
	*/
	checkIfHaveLocalAccountForBtnGameStart();
	
});
$("#btn-my-achievements").click(function(){
	
		closeWindow();

	setTimeout(function(){
		location.href="index.html";
	},2500);
	
});

$(".btn-back-to-main-menu").click(function(){
	
	location.href = "index.html";
});
$(".btn-play").click(function(){
	location.href = "main-game-page.html";
});
$(".btn-to-myroom").click(function(){
	var a = window.localStorage.getItem("localAccountUsername");
		if(a == null || a == "null" || a == ""){
			$("#localLoginModal").modal("show");
			
		}				
		else{
		location.href = "my-room-page.html";
		}
	
});

$(".btn-to-analytics").click(function(){
	var a = window.localStorage.getItem("localAccountUsername");
		if(a == null || a == "null" || a == ""){
			$("#localLoginModal").modal("show");
			
		}				
		else{
		location.href = "analytics-page.html";
		}
	
});
$(".btn-to-option").click(function(){
	//location.href = "analytics-page.html";
	$(".btnChangeYourName").show();
	$(".editUsernameDiv").hide();
	 $(".txtLoginLocalErrorMsg").html("");
					 $("#inputEditLocalUsername").val("");
	checkIfHaveLocalAccountForBtnOption();
});