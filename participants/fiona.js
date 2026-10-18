function apply(plot) {

    // your code here

    const plants = plot.querySelector('.plant:not(.replaced)');
    if (!plants) return;

    plants.textContent = '🍀';
    plants.classList.add('replaced');
  
  }
  
  
  // =============================================
  // Fill in your details below — don't change the structure
  // =============================================
  export default {
    name: "Plant",   // must be unique — this identifies your tool
    icon: "🍀",          // one emoji shown in the toolbar
    apply,
  };
  