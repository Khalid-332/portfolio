// EmailJS Configuration
// Initialize EmailJS with your public key
(function() {
    // This will be set up after you create your EmailJS account
    // For now, keeping the structure ready
    
    const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY'; // You'll get this from EmailJS
    const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID'; // You'll get this from EmailJS
    const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID'; // You'll get this from EmailJS
    
    // Initialize EmailJS
    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_PUBLIC_KEY);
    }
})();

// Contact Form Handler
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    // Get form data
    const formData = {
        from_name: document.getElementById('name').value,
        from_email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value,
        to_email: 'justk5166@gmail.com'
    };
    
    // Check if EmailJS is configured
    const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';
    
    if (EMAILJS_PUBLIC_KEY === 'YOUR_PUBLIC_KEY') {
        // EmailJS not configured yet - show instructions
        alert('⚠️ Email service is not configured yet!\n\nPlease follow the setup instructions in EMAIL-SETUP-GUIDE.md file to enable email functionality.');
        
        // For testing, show the data
        console.log('Form Data:', formData);
        alert(`📧 Email Preview:\n\nFrom: ${formData.from_name}\nEmail: ${formData.from_email}\nSubject: ${formData.subject}\nMessage: ${formData.message}\n\nThis will be sent to: justk5166@gmail.com`);
        
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        this.reset();
        return;
    }
    
    // Send email using EmailJS
    const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';
    const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
    
    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formData)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            
            // Success message
            alert('✅ Message sent successfully!\n\nThank you for contacting me. I will get back to you soon!');
            
            // Reset form
            document.getElementById('contactForm').reset();
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
        }, function(error) {
            console.log('FAILED...', error);
            
            // Error message
            alert('❌ Failed to send message.\n\nPlease try again or contact me directly at justk5166@gmail.com');
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        });
});
