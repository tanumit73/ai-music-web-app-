song = "";
leftWristX = "";
leftWristY = "";
rightWristX = "";
rightWristY = "";
scoreLeftWrist = "";
scoreRightWrist = "";

function setup() {
    canvas = createCanvas(600,500);
    canvas.center();

    video =  createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses)
}

function draw() {
    image(video, 0, 0, 600, 500);

    fill("#FF0000");
    stroke("#FF0000");

    if (scoreRightWrist > 0.2)
    {
    circle(rightWristX,rightWristY);

    if(rightWristY >0 && rightWristY <= 100){
        document.getElementById("speed").innerHTML = "speed = 0.5x";
        song.rate(0.5);
    }

    else if(rightWristY >100 && rightWristY <= 200){
        document.getElementById("speed").innerHTML = "speed = 1x";
        song.rate(1);
    }

    else if(rightWristY >200 && rightWristY <= 300){
        document.getElementById("speed").innerHTML = "speed = 1.5x";
        song.rate(1.5);
    }

    else if(rightWristY >300 && rightWristY <= 400){
        document.getElementById("speed").innerHTML = "speed = 2x";
        song.rate(2);
    }

    else if(rightWristY >400 && rightWristY <= 500){
        document.getElementById("speed").innerHTML = "speed = 2.5x";
        song.rate(2.5);
    }
}

    if(scoreLeftWrist > 0.2)
    {
    circle(leftWristX, leftWristY, 20);
    InNumberLeftWristY = Number(leftWristY);
    remove_decimal = floor(InNumberLeftWristY);
    volume = remove_decimal/500;
    document.getElementById("volume").innerHTML = "volume =" + volume;
    song.setVolume(volume);
    }
}

function preload() {
song = loadSound("music.mp3");
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}
function modelLoaded() {
    console.log('Posenet is Initializeed');
}
function gotPoses(results) {
    if(results.length > 0)
    {
        console.log(results);
        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreRightWrist = " + scoreRightWrist + "scoreLeftWrist = " + scoreLeftWrist);
       
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX +"leftWristY = "+ leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX +"rightWristY = "+ rightWristY);
    }
}