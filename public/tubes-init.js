// Tubes Cursor initialization
(function() {
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    const canvas = document.getElementById('tubes-canvas');
    if (!canvas) {
      console.error('Canvas not found');
      return;
    }

    // Load the library
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js';
    script.onload = function() {
      console.log('Tubes library loaded');
      
      if (typeof TubesCursor === 'undefined') {
        console.error('TubesCursor is undefined');
        return;
      }

      try {
        const app = TubesCursor(canvas, {
          tubes: {
            colors: ["#f967fb", "#53bc28", "#6958d5"],
            lights: {
              intensity: 200,
              colors: ["#83f36e", "#fe8a2e", "#ff008a", "#60aed5"]
            }
          }
        });

        // Store globally for color changes
        window.tubesApp = app;
        console.log('Tubes initialized successfully');

        // Add click handler
        canvas.addEventListener('click', function() {
          if (window.tubesApp) {
            const colors = randomColors(3);
            const lightsColors = randomColors(4);
            window.tubesApp.tubes.setColors(colors);
            window.tubesApp.tubes.setLightsColors(lightsColors);
          }
        });

      } catch (error) {
        console.error('Failed to initialize Tubes:', error);
      }
    };
    script.onerror = function() {
      console.error('Failed to load Tubes library');
    };
    document.head.appendChild(script);
  }

  function randomColors(count) {
    return new Array(count)
      .fill(0)
      .map(() => "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0'));
  }
})();
