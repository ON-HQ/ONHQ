# Liquid Gooey Interaction Guide

This guide explains how to achieve the "Liquid Pull" effect where a specific part of an SVG shape can be organically stretched using a gooey filter and a dynamic interaction point.

## 1. The Core Concept

The effect relies on three main components:
1.  **A Parent Container**: Applies a specialized "Gooey" filter to all its children.
2.  **The Base Shape**: Your main logo or SVG element.
3.  **The Interaction Point (Puller)**: A hidden circle that follows the user's touch/mouse and "merges" with the base shape when close.

## 2. The Gooey Filter (SVG)

The "magic" happens in the CSS/SVG filter. It works by blurring the elements and then sharpening them back up using a high-contrast color matrix.

```html
<svg style="visibility: hidden; position: absolute;" width="0" height="0">
  <defs>
    <filter id="logoGooey">
      <!-- 1. Blur the shapes so their edges overlap -->
      <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
      
      <!-- 2. Apply a high-contrast matrix to the alpha channel -->
      <!-- This turns the blurry overlap into a sharp, liquid connection -->
      <feColorMatrix in="blur" mode="matrix" 
        values="1 0 0 0 0  
                0 1 0 0 0  
                0 0 1 0 0  
                0 0 0 18 -8" result="goo" />
      
      <!-- 3. Ensure the original colors are preserved -->
      <feComposite in="SourceGraphic" in2="goo" operator="atop" />
    </filter>
  </defs>
</svg>
```

## 3. The HTML Structure

Apply the filter to a wrapper that contains both your logo and the hidden puller circle.

```html
<div class="logo-wrap" style="filter: url(#logoGooey);">
  <svg viewBox="0 0 200 200">
    <!-- Your Main Shape -->
    <path d="..." fill="currentColor" />
    
    <!-- The Hidden Puller (follows interaction) -->
    <circle id="logoPuller" cx="100" cy="100" r="15" style="opacity: 0;" />
  </svg>
</div>
```

## 4. The JavaScript Logic

We use Pointer Events to map the screen coordinates to the SVG's internal coordinate system.

```javascript
const draggable = document.getElementById('draggableLogo');
const puller = document.getElementById('logoPuller');
const svg = draggable.querySelector('svg');
let isDragging = false;

draggable.addEventListener('pointerdown', (e) => {
  isDragging = true;
  puller.style.opacity = "1"; // Show the puller
  updatePuller(e);
});

window.addEventListener('pointermove', (e) => {
  if (!isDragging) return;
  updatePuller(e);
});

window.addEventListener('pointerup', () => {
  isDragging = false;
  puller.style.opacity = "0"; // Hide and it "merges" back
});

function updatePuller(e) {
  const rect = svg.getBoundingClientRect();
  // Map screen pixels to SVG viewBox (e.g., 0 to 200)
  const x = ((e.clientX - rect.left) / rect.width) * 200;
  const y = ((e.clientY - rect.top) / rect.height) * 200;
  
  puller.setAttribute('cx', x);
  puller.setAttribute('cy', y);
}
```

## 5. Key Tips for Success

- **Standard Deviation**: The `stdDeviation` in the Gaussian Blur determines how "stretchy" the liquid is. Higher values = more stretch, but lower detail.
- **Color Matrix**: The `18 -8` values in the alpha channel of the `feColorMatrix` control the sharpness. 18 is the multiplier, and -8 is the threshold.
- **Coordinate Mapping**: Always use `getBoundingClientRect()` to ensure your touch point perfectly aligns with the SVG's internal coordinates regardless of screen size.
- **Pointer Events**: Using `pointerdown/move/up` automatically handles both Mouse and Touch interactions perfectly.
