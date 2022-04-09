status = "";
object_searched="";
objects = [];

function setup(){
    canvas = createCanvas(380,380);
    canvas.center();
     vida = createCapture(VIDEO);
     vida.hide();
}

function Start(){
    coco = ml5.objectDetector('cocossd' , loaded);
    document.getElementById("Status").innerHTML = "Status = Detecting Objects";
    object_searched = document.getElementById("object_name").value;
    console.log(object_searched);
}
function loaded(){
    console.log("Model loaded");
    status = "true";
}

function gotResults(error , red){
 if(error){
     console.error(error);
 }
 objects = red;
 console.log(objects);
}

function draw(){
    image(vida , 0 , 0 , 380 , 380);
    if(status == "true"){
        coco.detect(vida , gotResults);
        for(i=0 ; i<objects.length ; i++){
            fill('#ff0000');
            percent = floor(objects[i].confidence*100);
            console.log(percent);
            noFill();
            
            text(objects[i].label + " " +percent+"%" , objects[i].x + 15 , objects[i].y + 15);
            rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height);
            stroke('#ff0000');
            present_object = objects[i].label;
            if(present_object == object_searched){
                vida.stop();
                document.getElementById("object").innerHTML = "Object Found";
                text(objects[i].label + " " +percent+"%" , objects[i].x + 15 , objects[i].y + 15);
            rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height);
            }
        }
    }
}