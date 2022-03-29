status = ""

function setup()
{
  canvas = createCanvas(300, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.size(300,300)
  video.hide();
}

function start()
{
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status = Detecting Objects";
    input = document.getElementById('input_box').value
    console.log(input)
}

function modelLoaded()
{
    console.log("Model Loaded !");
    status = "true"
}

function draw()
{
  image(video,0,0,300,300);
}