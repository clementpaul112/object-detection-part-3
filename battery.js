Status = "";
battery_image = "";
objects = [];

function preload()
{
    battery_image = loadImage("battery.jpg");
}

function setup()
{
    canvas = createCanvas(640,350);
    canvas.position(315,200);
    object_detector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function modelLoaded()
{
    console.log("Model Loaded!");
    Status = true;
    object_detector.detect(sharpner_image,gotResults); 
}

function gotResults(results,error)
{
    if (error){
        console.error(error);
    }
    console.log(results);
    objects = results;
}

function draw()
{
    image(battery_image,0,0,640,350);
    if(Status != ""){
        for(i=0; i < objects_length; i++){
            document.getElementById("status").innerHTML = "Status: Objects Detected";
            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            texts(objects[i].label + "" + percent + "%", objects[i].x, objects[i].y);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}