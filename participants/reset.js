function apply(plot) {

    // your code here
    plot.innerHTML = "";
    plot.classList.remove("ripen1", "ripen2", "ripen3");
    plot.style.backgroundColor = "#ffffff";
  
  }
  
  
  // =============================================
  // Fill in your details below — don't change the structure
  // =============================================
  export default {
    name: "Reset",   // must be unique — this identifies your tool
    icon: "🔥",          // one emoji shown in the toolbar
    apply,
  };
  