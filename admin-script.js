// Tab Switching
function switchTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // Show selected tab
    document.getElementById(tabName + '-tab').classList.add('active');
    event.target.classList.add('active');
}

// Load saved data from localStorage
function loadSavedData() {
    const savedProfile = localStorage.getItem('portfolioProfile');
    if (savedProfile) {
        const profile = JSON.parse(savedProfile);
        document.getElementById('fullName').value = profile.name || 'Khalid Khan';
        document.getElementById('jobTitle').value = profile.title || 'Full Stack Web Developer';
        document.getElementById('bio').value = profile.bio || '';
        document.getElementById('currentName').textContent = profile.name || 'Khalid Khan';
        document.getElementById('currentTitle').textContent = profile.title || 'Full Stack Web Developer';
        
        if (profile.image) {
            const imgElement = document.createElement('img');
            imgElement.src = profile.image;
            imgElement.style.width = '100%';
            imgElement.style.height = '100%';
            imgElement.style.objectFit = 'cover';
            document.getElementById('currentProfileImage').innerHTML = '';
            document.getElementById('currentProfileImage').appendChild(imgElement);
        }
    }

    const savedProjects = localStorage.getItem('portfolioProjects');
    if (savedProjects) {
        displayProjects(JSON.parse(savedProjects));
    }

    const savedContact = localStorage.getItem('portfolioContact');
    if (savedContact) {
        const contact = JSON.parse(savedContact);
        document.getElementById('email').value = contact.email || 'justk5166@gmail.com';
        document.getElementById('phone').value = contact.phone || '+92 344 0512364';
        document.getElementById('linkedin').value = contact.linkedin || '';
        document.getElementById('github').value = contact.github || '';
    }
}

// Profile Image Preview
document.getElementById('profileImageInput').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('profilePreviewImg').src = e.target.result;
            document.getElementById('profileImagePreview').style.display = 'block';
        };
        reader.readAsDataURL(file);
    }
});

// Project Image Preview
document.getElementById('projectImageInput').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('projectPreviewImg').src = e.target.result;
            document.getElementById('projectImagePreview').style.display = 'block';
        };
        reader.readAsDataURL(file);
    }
});

// Profile Form Submit
document.getElementById('profileForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const profileData = {
        name: document.getElementById('fullName').value,
        title: document.getElementById('jobTitle').value,
        bio: document.getElementById('bio').value,
        image: document.getElementById('profilePreviewImg').src || null
    };

    localStorage.setItem('portfolioProfile', JSON.stringify(profileData));
    
    // Update preview
    document.getElementById('currentName').textContent = profileData.name;
    document.getElementById('currentTitle').textContent = profileData.title;
    
    if (profileData.image) {
        const imgElement = document.createElement('img');
        imgElement.src = profileData.image;
        imgElement.style.width = '100%';
        imgElement.style.height = '100%';
        imgElement.style.objectFit = 'cover';
        document.getElementById('currentProfileImage').innerHTML = '';
        document.getElementById('currentProfileImage').appendChild(imgElement);
    }

    showSuccess('profile-success', 'Profile updated successfully!');
});

// Project Form Submit
document.getElementById('projectForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const projectData = {
        id: Date.now(),
        name: document.getElementById('projectName').value,
        description: document.getElementById('projectDescription').value,
        link: document.getElementById('projectLink').value,
        category: document.getElementById('projectCategory').value,
        image: document.getElementById('projectPreviewImg').src || null
    };

    let projects = JSON.parse(localStorage.getItem('portfolioProjects') || '[]');
    projects.push(projectData);
    localStorage.setItem('portfolioProjects', JSON.stringify(projects));

    displayProjects(projects);
    document.getElementById('projectForm').reset();
    document.getElementById('projectImagePreview').style.display = 'none';
    
    showSuccess('project-success', 'Project added successfully!');
});

// Contact Form Submit
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const contactData = {
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        linkedin: document.getElementById('linkedin').value,
        github: document.getElementById('github').value
    };

    localStorage.setItem('portfolioContact', JSON.stringify(contactData));
    showSuccess('contact-success', 'Contact information updated successfully!');
});

// Display Projects
function displayProjects(projects) {
    const projectsList = document.getElementById('projectsList');
    
    if (projects.length === 0) {
        projectsList.innerHTML = '<p style="color: var(--text-gray); text-align: center;">No projects added yet. Add your first project above!</p>';
        return;
    }

    projectsList.innerHTML = projects.map(project => `
        <div class="project-item">
            <div class="project-info">
                <h3>${project.name}</h3>
                <p>${project.description}</p>
                <small style="color: var(--primary-color);">${getCategoryName(project.category)}</small>
            </div>
            <div class="project-actions">
                <button class="btn btn-secondary" onclick="editProject(${project.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-danger" onclick="deleteProject(${project.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `).join('');
}

function getCategoryName(category) {
    const categories = {
        'web': 'Web Design',
        'app': 'Web Apps',
        'ecommerce': 'E-Commerce'
    };
    return categories[category] || category;
}

// Delete Project
function deleteProject(projectId) {
    if (!confirm('Are you sure you want to delete this project?')) return;
    
    let projects = JSON.parse(localStorage.getItem('portfolioProjects') || '[]');
    projects = projects.filter(p => p.id !== projectId);
    localStorage.setItem('portfolioProjects', JSON.stringify(projects));
    displayProjects(projects);
    showSuccess('project-success', 'Project deleted successfully!');
}

// Edit Project
function editProject(projectId) {
    let projects = JSON.parse(localStorage.getItem('portfolioProjects') || '[]');
    const project = projects.find(p => p.id === projectId);
    
    if (project) {
        document.getElementById('projectName').value = project.name;
        document.getElementById('projectDescription').value = project.description;
        document.getElementById('projectLink').value = project.link || '';
        document.getElementById('projectCategory').value = project.category;
        
        if (project.image) {
            document.getElementById('projectPreviewImg').src = project.image;
            document.getElementById('projectImagePreview').style.display = 'block';
        }
        
        // Delete the old project
        deleteProject(projectId);
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
        alert('Edit the project details and click "Add Project" to save changes.');
    }
}

// Show Success Message
function showSuccess(elementId, message) {
    const element = document.getElementById(elementId);
    element.textContent = message;
    element.style.display = 'block';
    
    setTimeout(() => {
        element.style.display = 'none';
    }, 3000);
}

// Generate Portfolio HTML (for download)
function generatePortfolioHTML() {
    const profile = JSON.parse(localStorage.getItem('portfolioProfile') || '{}');
    const projects = JSON.parse(localStorage.getItem('portfolioProjects') || '[]');
    const contact = JSON.parse(localStorage.getItem('portfolioContact') || '{}');
    
    console.log('Profile Data:', profile);
    console.log('Projects Data:', projects);
    console.log('Contact Data:', contact);
    
    alert('Data saved successfully! Your portfolio will be updated automatically.');
}

// Export Data (for backup)
function exportData() {
    const data = {
        profile: JSON.parse(localStorage.getItem('portfolioProfile') || '{}'),
        projects: JSON.parse(localStorage.getItem('portfolioProjects') || '[]'),
        contact: JSON.parse(localStorage.getItem('portfolioContact') || '{}')
    };
    
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'portfolio-data.json';
    link.click();
}

// Load data on page load
window.addEventListener('load', loadSavedData);
