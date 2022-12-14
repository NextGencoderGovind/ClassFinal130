song = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreleftwrist=0;
scorerightwrist=0;
function preLoad() {
    song = loadSound("music.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video =createCapture(VIDEO);
    video.hide();

  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotposes);


}

function gotposes(results) {
    if(results.length>0){
         console.log(results);

         scoreleftwrist = results[0].pose.keypoints[9].score;
         scorerightwrist = results[0].pose.keypoints[10].score;
         console.log("scoreleftwrist = " + scoreleftwrist + "scorerightWrist ="+ scorerightwrist);
         leftWristX = results[0].pose.leftWrist.x;
         leftWristY = results[0].pose.leftWrist.y;
         console.log("leftWristX =" + leftWristX + "leftWristY =" + leftWristY);

         rightWristX = results[0].pose.rightWrist.x;
         rightWristY = results[0].pose.rightWrist.y;
         console.log("rightWristX =" +rightWristX+ "rightWristY ="+rightWristY);
    }
}

function modelLoaded() {
    console.log('pose Is Initialized');
}



function draw() {
    image(video, 0,0,600,500);

    fill("#FF0000");
    stroke("#FF0000")
    
    if (scorerightwrist > 0.2) {
        
    

    circle(rightWristX,rightWristY,20);

    if (rightwristY >0 && rightWristY <=100) {
        document.getElementById("speed").innerHTML = "Speed = 0.5x";
        song.rate(0.5);
    } 

    else if (rightWrist >100 && rightWristY<=200) {
             document.getElementById("speed").innerHTML = "Speed = 1x";
             song.rate(1);
    }

    else if (rightWristY >200 && rightWristY <=300) {
        document.getElementById("speed").innerHTML = "Speed = 1.5x";
        song.rate(1.5);
    }

    else if (rightWristY >300 && rightWristY <=400) {
        document.getElementById("speed").innerHTML = "Speed = 2x";
        song.rate(2);
    } 

    else if (rightWristY >400 && rightWristY <=500) {
        document.getElementById("speed").innerHTML = "Speed = 2.5x";
        song.rate(2.5);
    }
    
    }
    if (scoreleftwrist > 0.2) {
        circle(leftWristX,leftWristY,20);
        InNumberleftwristY = Number(leftWristY);
        volume = remove_decimals = floor(InNumberleftwristY);
        document.getElementById("volume").innerHTML = "Volume = " + volume;
        song.setvolume(volume);
    }
    
}



function play() {
    song.play();
    song.setvolume(1);
    song.rate(1);
}