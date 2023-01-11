Webcam.set({
    width:350,
    height:300,
    image_format : 'png',
    png_quality:90
});

  camera=document.getElementById("camera");

  Webcam.attach('#camera');


  function take_snapshot()
{
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML='<img id="captured_image" src="'+data_uri+'"/>'; 
    }
    );
}

classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/qsNqnI3yR/model.json',modelloaded);

function modelloaded(){
    console.log('modelloaded');
}
prediction1="";
prediction2="";
function speak(){
    var synth=window.speechSynthesis;
    speak_data_1="The first prediction is "+prediction1;
    speak_data_2="The second prediction is "+prediction2;
    var utterthis=new SpeechSynthesisUtterance(speak_data_1+speak_data_2);
    synth.speak(utterthis);

}

function check()
{
    img=document.getElementById('captured_image');
    classifier.classify(img,gotresult);
}

function gotresult(error,results)
{
    if(error)
    {console.error(error);}
    else{
        console.log(results);
        document.getElementById("result_gesture_name1").innerHTML=results[0].label;
        document.getElementById("result_gesture_name2").innerHTML=results[1].label;
        prediction1=results[0].label;
        prediction2=results[1].label;
        speak();
        if(results[0].label == "Thumbs Up")
        {
            document.getElementById("update_emoji1").innerHTML="&#128522;";
        }
        if(results[0].label == "Thumbs Down")
        {
            document.getElementById("update_emoji1").innerHTML="&#128532;";
        }
        if(results[0].label == "Bathroom(sign language)")
        {
            document.getElementById("update_emoji1").innerHTML="&#128548;";
        }
        if(results[1].label == "Thumbs Up")
        {
            document.getElementById("update_emoji2").innerHTML="&#128522;";
        }
        if(results[1].label == "Thumbs Down")
        {
            document.getElementById("update_emoji2").innerHTML="&#128532;";
        }
        if(results[1].label == "Bathroom(sign language)")
        {
            document.getElementById("update_emoji2").innerHTML="&#128548;";
        }
    }
}
