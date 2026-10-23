// Sync portfolio with admin panel data
(function() {
    // Load profile data
    const profileData = localStorage.getItem('portfolioProfile');
    if (profileData) {
        const profile = JSON.parse(profileData);
        
        // Update name
        if (profile.name) {
            document.querySelectorAll('.highlight').forEach(el => {
                if (el.textContent === 'Khalid Khan') {
                    el.textContent = profile.name;
                }
            });
            document.querySelector('.hero-content h1').innerHTML = `Hello, I'm <span class="highlight">${profile.name}</span>`;
        }
        
        // Update title
        if (profile.title) {
            const typingText = document.querySelector('.typing-text');
            if (typingText) {
                typingText.textContent = profile.title;
            }
        }
        
        // Update bio
        if (profile.bio) {
            const heroP = document.querySelector('.hero-content p');
            if (heroP) {
                heroP.textContent = profile.bio;
            }
        }
        
        // Update profile images
        if (profile.image) {
            // Hero image
            const heroImg = document.querySelector('.hero-image .image-placeholder img');
            if (heroImg) {
                heroImg.src = profile.image;
            }
            
            // About image
            const aboutImg = document.querySelector('.about-image .image-placeholder img');
            if (aboutImg) {
                aboutImg.src = profile.image;
            }
        }
    }
    
    // Load projects data
    const projectsData = localStorage.getItem('portfolioProjects');
    if (projectsData) {
        const projects = JSON.parse(projectsData);
        const portfolioGrid = document.querySelector('.portfolio-grid');
        
        if (portfolioGrid && projects.length > 0) {
            // Clear existing projects (optional - you can keep default ones)
            // portfolioGrid.innerHTML = '';
            
            // Add new projects
            projects.forEach(project => {
                const projectHTML = `
                    <div class="portfolio-item" data-category="${project.category}">
                        <div class="portfolio-image">
                            ${project.image 
                                ? `<img src="${project.image}" alt="${project.name}" style="width: 100%; height: 100%; object-fit: cover;">`
                                : `<div class="image-placeholder"><i class="fas fa-image"></i></div>`
                            }
                        </div>
                        <div class="portfolio-info">
                            <h3>${project.name}</h3>
                            <p>${project.description}</p>
                            <a href="${project.link || 'https://github.com/Khalid-332'}" class="btn-view" target="_blank">View Project <i class="fas fa-arrow-right"></i></a>
                        </div>
                    </div>
                `;
                portfolioGrid.insertAdjacentHTML('beforeend', projectHTML);
            });
        }
    }
    
    // Load contact data
    const contactData = localStorage.getItem('portfolioContact');
    if (contactData) {
        const contact = JSON.parse(contactData);
        
        // Update email
        if (contact.email) {
            document.querySelectorAll('a[href^="mailto:"]').forEach(el => {
                el.href = `mailto:${contact.email}`;
            });
            const emailText = document.querySelector('.contact-item p');
            if (emailText && emailText.textContent.includes('@')) {
                emailText.textContent = contact.email;
            }
        }
        
        // Update phone
        if (contact.phone) {
            const phoneElements = document.querySelectorAll('.contact-item p');
            phoneElements.forEach(el => {
                if (el.textContent.includes('+92')) {
                    el.textContent = contact.phone;
                }
            });
        }
        
        // Update LinkedIn
        if (contact.linkedin) {
            document.querySelectorAll('a[href*="linkedin"]').forEach(el => {
                el.href = contact.linkedin;
            });
        }
        
        // Update GitHub
        if (contact.github) {
            document.querySelectorAll('a[href*="github"]').forEach(el => {
                el.href = contact.github;
            });
        }
        
        // Update WhatsApp
        if (contact.phone) {
            const phoneNumber = contact.phone.replace(/[^0-9]/g, '');
            document.querySelectorAll('a[href*="wa.me"]').forEach(el => {
                el.href = `https://wa.me/${phoneNumber}`;
            });
        }
    }
})();
