function apply(plot) {

    // your code here
    const flowers = plot.querySelectorAll('.plant');
    flowers.forEach (f => {
      const emojis = ["🌻", "🌼", "🌷", "🌹"];
      const random = emojis[Math.floor(Math.random() * emojis.length)];
      f.innerHTML = random;
    })
    
  }
  
  
  // =============================================
  // Fill in your details below — don't change the structure
  // =============================================
  export default {
    name: "Cross-Pollinate",   // must be unique — this identifies your tool
    icon: "🐝",          // one emoji shown in the toolbar
    apply,
  };
  