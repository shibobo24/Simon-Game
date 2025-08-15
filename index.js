var buttonColours=["red", "blue", "green", "yellow"];

var gamePattern=[]; 
var userClickedPattern = [];

var level = 0; //紀錄層數
var startGame = false; //遊戲是否開始
//鍵盤輸入 並開始
$(document).on("keydown",function(){
    if(!startGame){
        $("level-title").text("Level "+level); //顯示層數
        startGame = true;
        nextSequence();
    }
});
//正確答案
function nextSequence(){
    userClickedPattern = []; //清空使用者點擊紀錄
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random()*4); //產生0~3整數

    var  randomChosenColour = buttonColours[randomNumber]; //隨機取一個顏色

    gamePattern.push(randomChosenColour); //加入陣列

    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100); //製作出動畫

    playSound(randomChosenColour);
}
//使用者答案
$(".btn").click(function(){
    var userChosenColour = $(this).attr("id"); //記錄使用者按了哪個按鈕

    userClickedPattern.push(userChosenColour); //加入陣列

    console.log(userClickedPattern); // 測試用：每次點擊都在 console 累積輸出

    playSound(userChosenColour);
    animatePress(userChosenColour);  // 按鈕動畫

    checkAnswer(userClickedPattern.length-1); //檢查答案
});

function playSound(name){
    var audio = new Audio("./sounds/" + name + ".mp3"); //播對應聲音
    audio.play();
}
//動畫
function animatePress(currentColour){
  $("#" + currentColour).addClass("pressed");// 加上 pressed 樣式
  // 100 毫秒後移除 pressed 樣式
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

//比對答案是否相同
function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success"); //測試用
        
        // 若使用者本關按的數量 == 本關序列長度，代表完成本關
        if (userClickedPattern.length === gamePattern.length) {
            // 1000ms 後進入下一關
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } 
    else{
        playSound("wrong"); //播放錯誤音樂
        $("body").addClass("game-over"); //背景變紅色

        // 200 毫秒後移除 game-over 樣式
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver();
    }
}

//重啟遊戲
function startOver(){
    level = 0;
    gamePattern = [];
    startGame = false;
}