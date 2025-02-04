// Add device detection
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

// Configure particles based on device
particlesJS('particles-js', {
  particles: {
    number: {
      value: isMobile ? 80 : 30,  // Increased for mobile
      density: {
        enable: true,
        value_area: isMobile ? 800 : 1000
      }
    },
    color: {
      value: '#00ff95'
    },
    shape: {
      type: 'circle'
    },
    opacity: {
      value: isMobile ? 0.8 : 0.5,  // Increased opacity for mobile
      random: false,
      anim: {
        enable: false
      }
    },
    size: {
      value: isMobile ? 3 : 2,  // Larger particles on mobile
      random: true,
      anim: {
        enable: false
      }
    },
    line_linked: {
      enable: true,
      distance: isMobile ? 120 : 150,
      color: '#00ff95',
      opacity: isMobile ? 0.4 : 0.2,  // Increased line opacity for mobile
      width: isMobile ? 2 : 1,  // Thicker lines on mobile
      triangles: {
        enable: false
      }
    },
    move: {
      enable: true,
      speed: isMobile ? 2 : 1,  // Faster movement on mobile
      direction: 'none',
      random: false,
      straight: false,
      out_mode: 'out',
      bounce: false,
    }
  },
  interactivity: {
    detect_on: 'canvas',
    events: {
      onhover: {
        enable: !isMobile,  // Disable hover on mobile for better performance
        mode: 'grab',
        parallax: {
          enable: false
        }
      },
      onclick: {
        enable: isMobile,  // Enable click on mobile
        mode: 'push'
      },
      resize: true
    },
    modes: {
      grab: {
        distance: 140,
        line_linked: {
          opacity: 1
        }
      },
      push: {
        particles_nb: isMobile ? 8 : 4  // Push more particles on mobile
      }
    }
  },
  retina_detect: false
});

function createStars() {
    const spaceBackground = document.querySelector('.space-background');
    const fragment = document.createDocumentFragment();
    const starCount = window.innerWidth < 768 ? 50 : 100;
    
    requestAnimationFrame(() => {
        for (let i = 0; i < starCount; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            star.style.cssText = `
                width: ${Math.random() * 2}px;
                height: ${star.style.width};
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation-delay: ${Math.random()}s;
            `;
            fragment.appendChild(star);
        }
        spaceBackground.appendChild(fragment);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    createStars();
});

function copyCode(button) {
    const codeBlock = button.parentElement.querySelector('code');
    const text = codeBlock.textContent;
    
    // Create temporary textarea
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    
    try {
        // Select and copy text
        textarea.select();
        document.execCommand('copy');
        
        // Visual feedback
        button.classList.add('copied');
        const originalIcon = button.innerHTML;
        button.innerHTML = '<i class="fas fa-check"></i>';
        
        // Reset button after 2 seconds
        setTimeout(() => {
            button.innerHTML = originalIcon;
            button.classList.remove('copied');
        }, 2000);
    } catch (err) {
        console.error('Failed to copy:', err);
    } finally {
        // Clean up
        document.body.removeChild(textarea);
    }
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => console.log('ServiceWorker registered'))
      .catch(err => console.log('ServiceWorker registration failed'));
  });
} 