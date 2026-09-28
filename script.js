/**
 * ==========================================================================
 * PERSONAL PORTFOLIO CARD JAVASCRIPT
 * Features:
 * 1. Multi-directional 3D Card Flipping (Left, Right, Vertical)
 * 2. Interactive Mouse Parallax 3D Tilt Effect
 * 3. Reset & Keyboard Accessibility (Escape to return)
 * 4. Interactive Feedback & Micro-interactions
 * ==========================================================================
 */

// Wait until the HTML document is fully loaded before executing scripts
document.addEventListener("DOMContentLoaded", () => {
  // 1. DOM Element Selectors
  const card = document.getElementById("portfolioCard");
  const cardScene = document.getElementById("cardScene");
  const flipButtons = document.querySelectorAll("[data-flip]");
  const resetButtons = document.querySelectorAll("[data-action='reset']");
  const sayHiBtn = document.getElementById("sayHiBtn");
  const statusMsg = document.getElementById("statusMsg");

  // Track if card is currently flipped to any side face
  let isFlipped = false;

  // ------------------------------------------------------------------------
  // 2. Multi-Directional Flip Handler
  // ------------------------------------------------------------------------
  function flipCard(direction) {
    // Reset any mouse tilt before flipping
    card.style.transform = "";

    // Clear all existing flip classes
    card.classList.remove("flipped-left", "flipped-right", "flipped-up");

    // Apply the chosen direction class
    if (direction === "left") {
      card.classList.add("flipped-left");
      isFlipped = true;
    } else if (direction === "right") {
      card.classList.add("flipped-right");
      isFlipped = true;
    } else if (direction === "up") {
      card.classList.add("flipped-up");
      isFlipped = true;
    }
  }

  function resetCard() {
    card.classList.remove("flipped-left", "flipped-right", "flipped-up");
    card.style.transform = "";
    isFlipped = false;
  }

  // Attach click events to all buttons with data-flip attribute
  flipButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const direction = btn.getAttribute("data-flip");
      flipCard(direction);
    });
  });

  // Attach click events to all reset/back buttons
  resetButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      resetCard();
    });
  });

  // Keyboard accessibility: Press 'Escape' key to flip back to front
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isFlipped) {
      resetCard();
    }
  });

  // ------------------------------------------------------------------------
  // 3. Interactive Mouse Parallax 3D Tilt Effect
  // ------------------------------------------------------------------------
  cardScene.addEventListener("mousemove", (e) => {
    // Disable tilt if card is currently flipped to a backface
    if (isFlipped) return;

    const rect = cardScene.getBoundingClientRect();
    const sceneWidth = rect.width;
    const sceneHeight = rect.height;

    // Calculate cursor position relative to center of the card (-1 to +1)
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPos = (mouseX / sceneWidth) - 0.5;
    const yPos = (mouseY / sceneHeight) - 0.5;

    // Tilt angle parameters (subtle, high-end feel)
    const maxTilt = 14; // in degrees
    const tiltX = -(yPos * maxTilt);
    const tiltY = (xPos * maxTilt);

    card.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
  });

  cardScene.addEventListener("mouseleave", () => {
    // Reset back to neutral position on mouse leave (if not flipped)
    if (!isFlipped) {
      card.style.transform = "rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
    }
  });

  // ------------------------------------------------------------------------
  // 4. Interactive "Say Hello" Action
  // ------------------------------------------------------------------------
  if (sayHiBtn && statusMsg) {
    sayHiBtn.addEventListener("click", () => {
      statusMsg.textContent = "🎉 Thanks for checking out my card! Let's connect soon.";
      sayHiBtn.textContent = "✨ Sent!";
      sayHiBtn.style.opacity = "0.8";
      sayHiBtn.disabled = true;

      setTimeout(() => {
        statusMsg.textContent = "";
        sayHiBtn.textContent = "👋 Say Hello";
        sayHiBtn.style.opacity = "1";
        sayHiBtn.disabled = false;
      }, 4000);
    });
  }
});
