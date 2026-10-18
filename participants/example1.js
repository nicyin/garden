function apply(plot) {

    // adding flowers

    // plot.innerHTML += "<div class='flower-example'>🌷</div>"

    // adding flowers v2

    const flower = document.createElement("div");
    flower.textContent = "🌻";
    flower.classList.add("plant");

    const x = Math.random() * 80;
    const y = Math.random() * 80;

    flower.style.position = "absolute";
    flower.style.left = x + "%";
    flower.style.top = y + "%";

    plot.appendChild(flower);
  
  }
  
  export default {
    name: "Flower",   // must be unique — this identifies your tool
    icon: "🌻",          // one emoji shown in the toolbar
    apply,
  };
  