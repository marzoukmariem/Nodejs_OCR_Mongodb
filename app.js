var ocr = require('ocr');
var mongoose = require('mongoose');

// function allow connection to the database
mongoose.connect("mongodb+srv://mariem:mariem@cluster0-mvsmy.gcp.mongodb.net/test?retryWrites=true&w=majority", {
    useNewUrlParser: true
}, function(error){
    if(error){
        console.log(error);
    
	}else{
        console.log("Connected to the database");
		 
     //  the path of ocr image
      var params = {
    input: './images/ocr.bmp'
     };
    
     // the function OCR extract the text from the image 
	 
     ocr.recognize(params, function(err, document){
    if(err)
        console.error(err);
    else{        
        
        console.log(document.text); 
		 // Insert the  text in the database 
		
		var Schema = new mongoose.Schema({
    image_text: String
    });
		var Image_information = mongoose.model("Image_information", Schema);
		
		Image_information.create({
        image_text: document.text
       }, function(error, data){
        if(error){
			 console.log(error);
            console.log("There was a problem adding this record to the database");
        }else{
            console.log("image text added to database");
            console.log(data);
        }

    });
	
    }
});
  }
});



