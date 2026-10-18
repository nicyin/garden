function apply(plot) {

    // your code here
    const stages = ["ripen1", "ripen2", "ripen3"];

    let ripen = 0;

    if (plot.classList.contains("ripen3")) {
        ripen = 3;
    } else if (plot.classList.contains("ripen2")) {
        ripen = 2;
    } else if (plot.classList.contains("ripen1")) {
        ripen = 1;
    } else {
        ripen = 0;
    }

    if (ripen < 3) {
        ripen = ripen + 1;
    }

    plot.style.backgroundColor = "";
    plot.style.color = "";
    
    plot.classList.remove("ripen1", "ripen2", "ripen3");

    plot.classList.add(stages[ripen - 1]);
  
  }
  
  
  // =============================================
  // Fill in your details below — don't change the structure
  // =============================================
  export default {
    name: "Ripen",   // must be unique — this identifies your tool
    icon: "🟡",          // one emoji shown in the toolbar
    apply,
  };
  