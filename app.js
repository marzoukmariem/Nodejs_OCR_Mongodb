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
       
	    console.log("There was a problem with the photo");
    else{        
        
        console.log(document.text); 
		 // Insert the  text in the database 
		
		var Schema = new mongoose.Schema({
	title: String,		
    image_text: String
    });
		var Image_information = mongoose.model("Image_information", Schema);
		
		Image_information.find({ 'title':'ocr.bmp' }, function (err, docs) {
       if (docs.length != 0)
	   {
		   console.log("The photo exist please try with an other photo");
		   
	   }
   else{
	   console.log(docs.length);
	   	Image_information.create({
		title:'ocr.bmp',	
        image_text: document.text
       }, function(error, data){
        if(error){
			
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
  }
});



