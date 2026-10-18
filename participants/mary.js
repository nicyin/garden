function apply(plot) {

    // your code here
    const weed = plot.querySelector(".plant:not(.replaced)");
    if (!weed) return;

    weed.textContent = "_";
    weed.classList.add("replaced");
  
  }
  
  
  // =============================================
  // Fill in your details below — don't change the structure
  // =============================================
  export default {
    name: "Tiller",   // must be unique — this identifies your tool
    icon: "⚙️",          // one emoji shown in the toolbar
    apply,
  };
  