export default function validation(inputs) {
  const errors = {};

  if (inputs.title === "") errors.title = "Title is missing!";
    if (inputs.title.length > 140)
    errors.title = "Title must be less than 140 characters";


  if (inputs.healthScore > 100)
    errors.healthScore = "Cannot be greater than 100";
    if (inputs.healthScore < 1)
    errors.healthScore = "Cannot be lower than 0";


  if (inputs.summary === "") errors.summary = "Summary is missing!";
  if (inputs.summary.length > 255) {
    errors.summary = "Summary cannot exceed 255 characters";}
  

    if (inputs.image === "") {
      errors.image = "This field is required";
    } else {
      const allowedExtensions = /\.(jpg|jpeg|png)$/i; // Expresión regular para .jpg y .png (no sensible a mayúsculas/minúsculas)
    
      if (!allowedExtensions.test(inputs.image)) {
        errors.image = "The URL has to end with .jpg or .png";
      } 
    }

    if (inputs.diets === "")
    errors.diets = "At least you should choose 1 diet type";

    return  errors;;
}
