# Tending the Webpage — Cheatsheet

A few tools for tending. You won't need much more than this.

---

## JavaScript — making your tool *do* something

### The core mechanism: classes

Your tool's job is usually to add, remove, or toggle a class on an element. That class is where the CSS styling lives.

```javascript
element.classList.add("watered")     // add a class
element.classList.remove("dormant")  // remove a class
element.classList.toggle("blooming") // on if off, off if on
```

Use this for almost everything. If your tool changes how something *looks* or *behaves*, this is probably the only JS you need — the real work happens in CSS.

### Creating things

If your tool plants or adds something new to the page:

```javascript
const newPlant = document.createElement("div")  // make a new element
newPlant.classList.add("seedling")
target.appendChild(newPlant)                     // place it inside another element
```

### Changing content

If your tool changes the words or images inside something:

```javascript
element.textContent = "a new thought"     // plain text only, safest option
element.innerHTML = "<em>a new thought</em>"  // allows HTML tags inside
```

### Direct style changes

Usually classes are cleaner, but sometimes you want to set one specific style directly:

```javascript
element.style.opacity = "0.5"
element.style.transform = "scale(1.2)"
```

### Changing attributes

Useful for swapping an image, or changing a link:

```javascript
element.setAttribute("src", "new-image.png")
element.setAttribute("href", "https://example.com")
```

### Wiring up your tool

This is what makes your tool actually trigger when someone uses it:

```javascript
toolElement.addEventListener("click", () => {
  // what happens when someone clicks your tool
})

toolElement.addEventListener("mouseover", () => {
  // what happens when someone hovers over your tool
})
```

### Finding elements

```javascript
document.getElementById("plot-001")          // find one specific element
document.querySelector(".plot")               // find the first match
document.querySelectorAll(".plot")             // find all matches
```

---

## CSS — what your class actually *looks* like

Once your JS adds a class, this is where you define what that class means visually.

### Basic appearance

```css
.watered {
  color: #2a6f4f;
  background-color: #eaf6ee;
  opacity: 1;
}
```

### Size and shape

```css
.grown {
  transform: scale(1.3);   /* bigger */
  width: 200px;
  border-radius: 50%;      /* circular */
}
```

### Motion and transition

Without this, changes snap instantly. With it, they ease in:

```css
.plot {
  transition: all 0.6s ease;
}
```

### Animation (for ongoing or looping effects)

```css
.perennial {
  animation: sway 3s ease-in-out infinite;
}

@keyframes sway {
  0%   { transform: rotate(0deg); }
  50%  { transform: rotate(5deg); }
  100% { transform: rotate(0deg); }
}
```

### Filters (good for decay, weather, atmosphere)

```css
.wilted   { filter: grayscale(0.8) brightness(0.7); }
.frosted  { filter: blur(2px) brightness(1.2); }
.ripened  { filter: saturate(1.5); }
```

### Layering

```css
.spreading {
  z-index: 10;       /* higher = sits on top */
  position: relative; /* needed for z-index to work */
}
```

### Adding content without touching the HTML

Useful for a small note, label, or symbol that appears only when a class is active:

```css
.annotated::after {
  content: " 🌱";
}

.labeled::before {
  content: "tended by you";
  display: block;
  font-size: 0.8em;
  opacity: 0.6;
}
```

### Hover-only effects

```css
.tool:hover {
  cursor: grab;
  transform: scale(1.1);
}
```

---

## The pattern, start to finish

```javascript
// JS: what triggers it, and what it does
toolElement.addEventListener("click", () => {
  target.classList.remove("dormant")
  target.classList.add("watered")
})
```

```css
/* CSS: what that change actually looks like */
.watered {
  background-color: #d4ecdb;
  transition: background-color 0.6s ease;
}
```

That's the whole loop: **a trigger → a class change → a style.** Everything else is detail.

---

## Stuck? Try this order

1. Open the browser console (right-click → Inspect → Console tab) and look for red errors
2. Check that your class name matches exactly in both the JS and the CSS — typos are the #1 culprit
3. Check that the element ID you're targeting actually exists in the HTML
4. Ask a neighbor
5. Ask Nicci
