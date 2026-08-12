// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Navbar scroll effect
    const nav = document.querySelector('nav');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > lastScroll) {
            nav.style.transform = 'translateY(-100%)';
            nav.style.transition = 'transform 0.3s ease-in-out';
        } else {
            nav.style.transform = 'translateY(0)';
        }
        lastScroll = currentScroll;
    });

    // Animate sections on scroll
    const sections = document.querySelectorAll('section');
    
    const observerOptions = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(section);
    });

    // Skills section hover effect
    const skillCells = document.querySelectorAll('.cell');
    
    skillCells.forEach(cell => {
        cell.addEventListener('mouseenter', () => {
            cell.style.transform = 'scale(1.05)';
            cell.style.transition = 'transform 0.3s ease';
        });
        
        cell.addEventListener('mouseleave', () => {
            cell.style.transform = 'scale(1)';
        });
    });

    // Form validation and submission
    const form = document.querySelector('form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Reset error states
        [nameInput, emailInput, messageInput].forEach(input => {
            input.style.borderColor = '#1a1c20';
        });

        let isValid = true;
        
        // Name validation
        if (nameInput.value.trim() === '') {
            nameInput.style.borderColor = 'red';
            isValid = false;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
            emailInput.style.borderColor = 'red';
            isValid = false;
        }

        // Message validation
        if (messageInput.value.trim() === '') {
            messageInput.style.borderColor = 'red';
            isValid = false;
        }

        if (isValid) {
            const successMessage = document.createElement('div');
            successMessage.textContent = 'Message sent successfully!';
            successMessage.style.color = 'green';
            successMessage.style.marginTop = '10px';
            successMessage.style.textAlign = 'center';
            
            form.appendChild(successMessage);
            
            form.reset();
            
            setTimeout(() => {
                successMessage.remove();
            }, 3000);
        }
    });

    // Enhanced typing animation for hero section
    const heroText = document.querySelector('.hero-section .text h2');
    const text = "Hi, I'm Eden!";
    heroText.innerHTML = ''; 
    
    const cursor = document.createElement('span');
    cursor.innerHTML = '|';
    cursor.style.animation = 'blink 1s infinite';
    heroText.appendChild(cursor);

    // Add CSS for cursor animation
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
        }
    `;
    document.head.appendChild(style);

    // Typing animation function
    let charIndex = 0;
    function typeText() {
        if (charIndex < text.length) {
            if (text.charAt(charIndex) === '✌') {
                // Handle emoji (assuming it's 2 characters long)
                heroText.insertBefore(
                    document.createTextNode(text.substr(charIndex, 2)), 
                    cursor
                );
                charIndex += 2;
            } else {
                heroText.insertBefore(
                    document.createTextNode(text.charAt(charIndex)), 
                    cursor
                );
                charIndex++;
            }
            
            // Add random delay between characters for more realistic typing effect
            const delay = Math.random() * 100 + 100;
            setTimeout(typeText, delay);
        }
    }

    // Start typing animation after a short delay
    setTimeout(typeText, 500);
});