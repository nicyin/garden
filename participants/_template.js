// =============================================
// YOUR TOOL — copy this file and rename it to yourname.js
// =============================================
// `plot` is the garden plot that your tool was dropped onto.
// Write your code inside the apply function below.
//
// Some things to try:
//   plot.style.backgroundColor = "pink"
//   plot.style.opacity = "0.5"
//   plot.style.filter = "blur(4px)"
//   plot.classList.add("your-class-name")
//
// To act on elements inside the plot:
//   plot.querySelectorAll(".text").forEach(el => el.style.color = "red")
//   plot.querySelectorAll(".image").forEach(el => el.style.opacity = "0")


function apply(plot) {

  // your code here
  plot.innerHTML += '<div class="flower"></div>'

}


// =============================================
// Fill in your details below — don't change the structure
// =============================================
export default {
  name: "Your Name",   // must be unique — this identifies your tool
  icon: "🌱",          // one emoji shown in the toolbar
  apply,
};
