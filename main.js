status = ""
objects = []

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
    object_name = document.getElementById('input_box').value
    console.log(object_name)
}

function modelLoaded()
{
    console.log("Model Loaded !");
    status = "true"
}

function gotResults(error,results)
{
    if (error)
    {
        console.error(error);
    }
    console.log(results);
    objects = results;
}

function draw()
{
  image(video,0,0,300,300);
  if (status != "")
  {
    objectDetector.detect(video,gotResults);
      for (let i = 0; i < objects.length; i++)
      {
        document.getElementById("status").innerHTML = "Status = Object Detected";
          percent = floor(objects[i].confidence * 100);
          fill('red');
          text(objects[i].label + " " + percent + "%", objects[i].x+15, objects[i].y+15);
          noFill();
          stroke('red');
          rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
          
          if (objects[i].label == object_name)
          {
              video.stop()
              document.getElementById("object_status").innerText = "Object" + object_name + " found";

              synth = window.speechSynthesis;
              speak_data = object_name + ' found';
              utterThis = new SpeechSynthesisUtterance(speak_data);
              synth.speak(utterThis);
          }
      }
  }
}