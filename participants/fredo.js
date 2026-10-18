function apply(plot) {

    // your code here
    const x = Math.random() * 90;
    const y = Math.random() * 90;

    const garden = document.querySelectorAll('.plot');


    garden.forEach(plot => {
      plot.innerHTML += `<div class='plant' style='left:${x}%;top:${y}%;'>🌷</div>`;
    });
  
  }
  
  
  // =============================================
  // Fill in your details below — don't change the structure
  // =============================================
  export default {
    name: "Propagate",   // must be unique — this identifies your tool
    icon: "💧",          // one emoji shown in the toolbar
    apply,
  };
  