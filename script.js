document.addEventListener('DOMContentLoaded', function() {
    
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('show');
        });
    }
    
    // Close mobile menu when clicking on any nav link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            if (navMenu && navMenu.classList.contains('show')) {
                navMenu.classList.remove('show');
            }
        });
    });
    
    // ========================================
    // 2. BOOKING FORM HANDLER (For index.html - appointmentForm)
    // ========================================
    const appointmentForm = document.getElementById('appointmentForm');
    if (appointmentForm) {
        // Set minimum date to today
        const dateInput = appointmentForm.querySelector('#date');
        if (dateInput) {
            const today = new Date().toISOString().split('T')[0];
            dateInput.setAttribute('min', today);
        }
        
        appointmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const nameInput = document.getElementById('name');
            const name = nameInput ? nameInput.value : '';
            
            if (name) {
                alert('✨ Thank you ' + name + '! Your appointment request has been sent. We\'ll confirm within 15 mins. ✨');
                appointmentForm.reset();
                
                // Reset date min after reset
                if (dateInput) {
                    const today = new Date().toISOString().split('T')[0];
                    dateInput.setAttribute('min', today);
                }
            } else {
                alert('Please fill in your name to proceed.');
            }
        });
    }
    
    // ========================================
    // 3. BOOKING FORM HANDLER (For book.html - bookingForm)
    // ========================================
    const bookingForm = document.getElementById('bookingForm');
    const successDiv = document.getElementById('bookingSuccess');
    
    if (bookingForm) {
        // Set minimum date to today
        const bookDateInput = document.getElementById('date');
        if (bookDateInput) {
            const today = new Date().toISOString().split('T')[0];
            bookDateInput.setAttribute('min', today);
        }
        
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const fullName = document.getElementById('fullName');
            const phone = document.getElementById('phone');
            const service = document.getElementById('service');
            const date = document.getElementById('date');
            const time = document.getElementById('time');
            
            const fullNameValue = fullName ? fullName.value : '';
            const phoneValue = phone ? phone.value : '';
            const serviceValue = service ? service.value : '';
            const dateValue = date ? date.value : '';
            const timeValue = time ? time.value : '';
            
            if (!fullNameValue || !phoneValue || !serviceValue || !dateValue || !timeValue) {
                alert('Please fill in all required fields (*)');
                return;
            }
            
            // Hide form, show success message
            bookingForm.style.display = 'none';
            if (successDiv) {
                successDiv.style.display = 'block';
            }
            
            // Log booking data (can be replaced with actual API call)
            console.log('Booking submitted:', {
                fullName: fullNameValue,
                phone: phoneValue,
                service: serviceValue,
                date: dateValue,
                time: timeValue
            });
        });
    }
    
    // ========================================
    // 4. RESET FORM FUNCTION (For book.html success screen)
    // ========================================
    window.resetForm = function() {
        const bookingFormElement = document.getElementById('bookingForm');
        const successDivElement = document.getElementById('bookingSuccess');
        const dateInputElement = document.getElementById('date');
        
        if (bookingFormElement) {
            bookingFormElement.reset();
            bookingFormElement.style.display = 'block';
            if (successDivElement) {
                successDivElement.style.display = 'none';
            }
            
            // Reset date min
            if (dateInputElement) {
                const today = new Date().toISOString().split('T')[0];
                dateInputElement.setAttribute('min', today);
            }
        }
    };
    
    // ========================================
    // 5. SMOOTH SCROLLING FOR ANCHOR LINKS
    // ========================================
    const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
    anchorLinks.forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if open
                if (navMenu && navMenu.classList.contains('show')) {
                    navMenu.classList.remove('show');
                }
            }
        });
    });
    
    // ========================================
    // 6. ACTIVE NAVIGATION LINK HIGHLIGHTING
    // ========================================
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const activeNavLink = document.querySelector('.nav-link[href="' + currentPage + '"]');
    if (activeNavLink) {
        activeNavLink.classList.add('active');
    }
    
    // ========================================
    // 7. FORM INPUT ANIMATION EFFECTS
    // ========================================
    const formInputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');
    formInputs.forEach(function(input) {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
        
        // Check if input has value on load
        if (input.value) {
            input.parentElement.classList.add('focused');
        }
    });
    
    // ========================================
    // 8. GALLERY IMAGE LIGHTBOX (Optional Enhancement)
    // ========================================
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(function(item) {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            if (img) {
                const imgSrc = img.getAttribute('src');
                const imgAlt = img.getAttribute('alt');
                
                // Create lightbox overlay
                const lightbox = document.createElement('div');
                lightbox.id = 'lightbox';
                lightbox.style.cssText = `
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0,0,0,0.9);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 9999;
                    cursor: pointer;
                `;
                
                const lightboxImg = document.createElement('img');
                lightboxImg.src = imgSrc;
                lightboxImg.alt = imgAlt;
                lightboxImg.style.cssText = `
                    max-width: 90%;
                    max-height: 90%;
                    border-radius: 16px;
                    box-shadow: 0 25px 50px rgba(0,0,0,0.3);
                `;
                
                lightbox.appendChild(lightboxImg);
                document.body.appendChild(lightbox);
                
                lightbox.addEventListener('click', function() {
                    document.body.removeChild(lightbox);
                });
                
                // Close on escape key
                document.addEventListener('keydown', function(e) {
                    if (e.key === 'Escape' && document.getElementById('lightbox')) {
                        document.body.removeChild(lightbox);
                    }
                });
            }
        });
    });
    
    // ========================================
    // 9. SERVICE CARD HOVER EFFECT ENHANCEMENT
    // ========================================
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(function(card) {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // ========================================
    // 10. TIME SLOT VALIDATION (Prevent past time selection for today)
    // ========================================
    const timeSelect = document.getElementById('time');
    const dateSelect = document.getElementById('date');
    
    function validateTimeSlot() {
        if (dateSelect && timeSelect) {
            const selectedDate = dateSelect.value;
            const today = new Date().toISOString().split('T')[0];
            
            if (selectedDate === today) {
                const now = new Date();
                const currentHour = now.getHours();
                const currentMinute = now.getMinutes();
                const currentTimeDecimal = currentHour + (currentMinute / 60);
                
                // Disable past time slots
                for (let i = 0; i < timeSelect.options.length; i++) {
                    const option = timeSelect.options[i];
                    const optionValue = option.value;
                    if (optionValue) {
                        const [hour, minute] = optionValue.split(':');
                        const optionTimeDecimal = parseInt(hour) + (parseInt(minute) / 60);
                        
                        if (optionTimeDecimal <= currentTimeDecimal + 0.5) { // 30 min buffer
                            option.disabled = true;
                            option.style.color = '#ccc';
                        } else {
                            option.disabled = false;
                            option.style.color = '';
                        }
                    }
                }
                
                if (timeSelect.value) {
                    const selectedTime = timeSelect.value;
                    const [selectedHour, selectedMinute] = selectedTime.split(':');
                    const selectedTimeDecimal = parseInt(selectedHour) + (parseInt(selectedMinute) / 60);
                    if (selectedTimeDecimal <= currentTimeDecimal + 0.5) {
                        timeSelect.value = '';
                    }
                }
            } else {
                // Enable all options for future dates
                for (let i = 0; i < timeSelect.options.length; i++) {
                    timeSelect.options[i].disabled = false;
                    timeSelect.options[i].style.color = '';
                }
            }
        }
    }
    
    if (dateSelect && timeSelect) {
        dateSelect.addEventListener('change', validateTimeSlot);
        validateTimeSlot();
    }
    
    // ========================================
    // 11. HEADER SCROLL EFFECT
    // ========================================
    const header = document.querySelector('header');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', function() {
        if (header) {
            if (window.scrollY > 100) {
                header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
                header.style.background = 'rgba(255,255,255,0.98)';
                header.style.backdropFilter = 'blur(10px)';
            } else {
                header.style.boxShadow = '0 2px 15px rgba(0,0,0,0.03)';
                header.style.background = '#ffffff';
                header.style.backdropFilter = 'none';
            }
        }
        lastScrollY = window.scrollY;
    });
    
    // ========================================
    // 12. FORM SUBMISSION WITH LOADING STATE
    // ========================================
    const allForms = document.querySelectorAll('form');
    allForms.forEach(function(form) {
        form.addEventListener('submit', function(e) {
            const submitBtn = form.querySelector('button[type="submit"]');
            if (submitBtn && !submitBtn.hasAttribute('data-no-loader')) {
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
                submitBtn.disabled = true;
                
                // Re-enable after 2 seconds (for demo, remove if using actual API)
                setTimeout(function() {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, 2000);
            }
        });
    });
    
    // ========================================
    // 13. LAZY LOADING FOR IMAGES (Performance)
    // ========================================
    const images = document.querySelectorAll('img:not([loading])');
    images.forEach(function(img) {
        img.setAttribute('loading', 'lazy');
    });
    
    // ========================================
    // 14. WINDOW LOAD ANIMATIONS
    // ========================================
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Add fade-in animation to sections
        const sections = document.querySelectorAll('section');
        sections.forEach(function(section, index) {
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';
            section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            
            setTimeout(function() {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 100 + (index * 100));
        });
    });
    
});


        // Services Accordion Functionality
        document.addEventListener('DOMContentLoaded', function() {
            const accordionBtns = document.querySelectorAll('.accordion-btn');
            
            accordionBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    const accordionItem = this.parentElement;
                    const accordionContent = this.nextElementSibling;
                    const arrow = this.querySelector('.accordion-arrow');
                    
                    // Close all other accordion items
                    const allItems = document.querySelectorAll('.accordion-item');
                    allItems.forEach(item => {
                        if (item !== accordionItem && item.classList.contains('active')) {
                            const content = item.querySelector('.accordion-content');
                            const itemArrow = item.querySelector('.accordion-arrow');
                            content.style.maxHeight = null;
                            item.classList.remove('active');
                            if (itemArrow) {
                                itemArrow.style.transform = 'rotate(0deg)';
                            }
                        }
                    });
                    
                    // Toggle current accordion item
                    if (accordionItem.classList.contains('active')) {
                        accordionContent.style.maxHeight = null;
                        accordionItem.classList.remove('active');
                        arrow.style.transform = 'rotate(0deg)';
                    } else {
                        accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';
                        accordionItem.classList.add('active');
                        arrow.style.transform = 'rotate(180deg)';
                    }
                });
            });
            
            // Open first accordion item by default
            const firstAccordion = document.querySelector('.accordion-item');
            if (firstAccordion) {
                const firstBtn = firstAccordion.querySelector('.accordion-btn');
                if (firstBtn) {
                    firstBtn.click();
                }
            }
        });
        
                // FAQ Toggle Function
        function toggleFAQ(element) {
            const faqItem = element.parentElement;
            const faqAnswer = faqItem.querySelector('.faq-answer');
            const arrow = element.querySelector('.faq-arrow');
            
            // Close all other FAQ items
            const allFaqItems = document.querySelectorAll('.faq-item');
            allFaqItems.forEach(item => {
                if (item !== faqItem && item.classList.contains('active')) {
                    const otherAnswer = item.querySelector('.faq-answer');
                    const otherArrow = item.querySelector('.faq-arrow');
                    item.classList.remove('active');
                    if (otherAnswer) {
                        otherAnswer.style.maxHeight = null;
                    }
                    if (otherArrow) {
                        otherArrow.style.transform = 'rotate(0deg)';
                    }
                }
            });
            
            // Toggle current FAQ item
            if (faqItem.classList.contains('active')) {
                faqAnswer.style.maxHeight = null;
                faqItem.classList.remove('active');
                if (arrow) {
                    arrow.style.transform = 'rotate(0deg)';
                }
            } else {
                faqAnswer.style.maxHeight = faqAnswer.scrollHeight + 'px';
                faqItem.classList.add('active');
                if (arrow) {
                    arrow.style.transform = 'rotate(180deg)';
                }
            }
        }
        
        // Contact Form Submission
// ========== MOBILE HAMBURGER MENU FIX ==========

// Simplified hamburger menu
// ========== MOBILE HAMBURGER MENU - COMPLETE FIX ==========
document.addEventListener('DOMContentLoaded', function() {
    
    // Get all necessary elements
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navOverlay = document.querySelector('.nav-overlay');
    const body = document.body;
    
    // Check if hamburger exists
    if (!hamburger || !navMenu) {
        console.log('Hamburger or nav menu not found');
        return;
    }
    
    // Function to open menu
    function openMenu() {
        hamburger.classList.add('active');
        navMenu.classList.add('active');
        if (navOverlay) navOverlay.classList.add('active');
        body.classList.add('menu-open');
        body.style.position = 'fixed';
        body.style.width = '100%';
    }
    
    // Function to close menu
    function closeMenu() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        if (navOverlay) navOverlay.classList.remove('active');
        body.classList.remove('menu-open');
        body.style.position = '';
        body.style.width = '';
    }
    
    // Toggle menu function
    function toggleMenu() {
        if (navMenu.classList.contains('active')) {
            closeMenu();
        } else {
            openMenu();
        }
    }
    
    // Add click event to hamburger
    hamburger.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        toggleMenu();
    });
    
    // Close menu when clicking on nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            closeMenu();
        });
    });
    
    // Close menu when clicking overlay
    if (navOverlay) {
        navOverlay.addEventListener('click', function() {
            closeMenu();
        });
    }
    
    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            closeMenu();
        }
    });
    
    // Fix for window resize - close menu if screen becomes larger
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
                closeMenu();
            }
        }, 250);
    });
    
    // Prevent horizontal scroll on touch devices
    document.addEventListener('touchmove', function(e) {
        if (body.classList.contains('menu-open')) {
            e.preventDefault();
        }
    }, { passive: false });
});

// ========== FIX HORIZONTAL SCROLL ON ALL PAGES ==========
(function() {
    // Prevent horizontal scroll
    const body = document.body;
    const html = document.documentElement;
    
    function preventHorizontalScroll() {
        if (window.scrollX > 0) {
            window.scrollTo(0, window.scrollY);
        }
    }
    
    window.addEventListener('scroll', preventHorizontalScroll);
    
    // Fix for touch devices
    document.addEventListener('touchstart', function(e) {
        let startX = e.touches[0].clientX;
        
        function onTouchMove(e) {
            let currentX = e.touches[0].clientX;
            let diffX = currentX - startX;
            
            // If swiping right when scrolled to left edge
            if (diffX > 0 && window.scrollX === 0) {
                e.preventDefault();
            }
        }
        
        document.addEventListener('touchmove', onTouchMove, { passive: false });
        document.addEventListener('touchend', function() {
            document.removeEventListener('touchmove', onTouchMove);
        });
    });
})();

// ========== APPOINTMENT BOOKING FORM - COMPLETE FIX ==========
document.addEventListener('DOMContentLoaded', function() {
    
    const bookingForm = document.getElementById('bookingForm');
    const bookingSuccess = document.getElementById('bookingSuccess');
    
    if (bookingForm) {
        
        // Disable browser's default validation
        bookingForm.setAttribute('novalidate', true);
        
        // Get form elements
        const fullNameInput = document.getElementById('fullName');
        const emailInput = document.getElementById('email');
        const phoneInput = document.getElementById('phone');
        const serviceSelect = document.getElementById('service');
        const dateInput = document.getElementById('date');
        const messageInput = document.getElementById('message');
        
// ========== FULL NAME - Letters and spaces only ==========
if (fullNameInput) {
    fullNameInput.addEventListener('input', function() {
        // Remove numbers and special characters, keep letters and spaces
        this.value = this.value.replace(/[^a-zA-Z\s]/g, '');
        
        // Capitalize first letter of each word
        this.value = this.value.replace(/\b\w/g, function(char) {
            return char.toUpperCase();
        });
    });
}
        
        // ========== PHONE NUMBER - Exactly 11 digits ==========
        if (phoneInput) {
            phoneInput.addEventListener('input', function() {
                let cleaned = this.value.replace(/\D/g, '');
                if (cleaned.length > 11) {
                    cleaned = cleaned.slice(0, 11);
                }
                this.value = cleaned;
            });
        }
        
        // ========== DATE VALIDATION ==========
        if (dateInput) {
            const today = new Date().toISOString().split('T')[0];
            dateInput.setAttribute('min', today);
        }
        
                if (timeInput) {
            // Set default time options if needed
            timeInput.addEventListener('change', function() {
                if (this.value && this.value !== '') {
                    this.style.borderColor = '#2ecc71';
                    hideError(this);
                } else {
                    this.style.borderColor = '#e74c3c';
                }
            });
        }
        // ========== FORM SUBMIT ==========
        bookingForm.addEventListener('submit', function(e) {
            // Prevent default form submission
            e.preventDefault();
            
            // Get values
            const fullName = fullNameInput ? fullNameInput.value.trim() : '';
            const email = emailInput ? emailInput.value.trim() : '';
            const phone = phoneInput ? phoneInput.value.trim() : '';
            const service = serviceSelect ? serviceSelect.value : '';
            const date = dateInput ? dateInput.value : '';
            
            // Validation array
            let errors = [];
            
            // Reset border colors
            if (fullNameInput) fullNameInput.style.borderColor = '#e0d5c5';
            if (emailInput) emailInput.style.borderColor = '#e0d5c5';
            if (phoneInput) phoneInput.style.borderColor = '#e0d5c5';
            if (serviceSelect) serviceSelect.style.borderColor = '#e0d5c5';
            if (dateInput) dateInput.style.borderColor = '#e0d5c5';
            
            // Validate Full Name
            if (!fullName) {
                errors.push('Full Name is required');
                if (fullNameInput) fullNameInput.style.borderColor = '#e74c3c';
            } else if (fullName.length < 2) {
                errors.push('Name must be at least 2 characters');
                if (fullNameInput) fullNameInput.style.borderColor = '#e74c3c';
            }
            
            // Validate Email (optional)
            if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                errors.push('Please enter a valid email address');
                if (emailInput) emailInput.style.borderColor = '#e74c3c';
            }
            
            // Validate Phone
            if (!phone) {
                errors.push('Phone Number is required');
                if (phoneInput) phoneInput.style.borderColor = '#e74c3c';
            } else if (phone.length !== 11) {
                errors.push('Phone number must be exactly 11 digits');
                if (phoneInput) phoneInput.style.borderColor = '#e74c3c';
            } else if (!/^\d+$/.test(phone)) {
                errors.push('Phone number can only contain digits');
                if (phoneInput) phoneInput.style.borderColor = '#e74c3c';
            }
            
            // Validate Service
            if (!service || service === '') {
                errors.push('Please select a service');
                if (serviceSelect) serviceSelect.style.borderColor = '#e74c3c';
            }
            
            // Validate Date
            if (!date) {
                errors.push('Please select a preferred date');
                if (dateInput) dateInput.style.borderColor = '#e74c3c';
            } else {
                const today = new Date().toISOString().split('T')[0];
                if (date < today) {
                    errors.push('Please select today or a future date');
                    if (dateInput) dateInput.style.borderColor = '#e74c3c';
                }
            }
            
            // Show errors if any
            if (errors.length > 0) {
                alert('Please fix the following:\n\n• ' + errors.join('\n• '));
                return;
            }
            
            // Success - hide form and show success message
            bookingForm.style.display = 'none';
            if (bookingSuccess) {
                bookingSuccess.style.display = 'block';
                bookingSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            
            // Log booking
            console.log('Booking submitted:', {
                fullName: fullName,
                email: email || 'Not provided',
                phone: phone,
                service: service,
                date: date,
                timestamp: new Date().toISOString()
            });
        });
    }
});
    // ========== CONTACT FORM HANDLER ==========
// ========== CONTACT FORM HANDLER ==========
document.addEventListener('DOMContentLoaded', function() {
    
    const contactForm = document.getElementById('contactForm');
    const formHeader = document.getElementById('formHeader');
    const successDiv = document.getElementById('contactSuccess');
    
    if (contactForm) {
        
        contactForm.setAttribute('novalidate', true);
        
        const fullNameInput = document.getElementById('fullName');
        const emailInput = document.getElementById('email');
        const phoneInput = document.getElementById('phone');
        const subjectSelect = document.getElementById('subject');
        const messageInput = document.getElementById('message');
        
        // Full Name validation
        if (fullNameInput) {
            fullNameInput.addEventListener('input', function() {
                this.value = this.value.replace(/[^a-zA-Z\s]/g, '');
                this.value = this.value.replace(/\b\w/g, function(char) {
                    return char.toUpperCase();
                });
            });
            
            fullNameInput.addEventListener('keydown', function(e) {
                if (e.key === ' ') return;
                if (!/^[a-zA-Z]$/.test(e.key) && 
                    e.key !== 'Backspace' && 
                    e.key !== 'Delete' && 
                    e.key !== 'ArrowLeft' && 
                    e.key !== 'ArrowRight' && 
                    e.key !== 'Tab') {
                    e.preventDefault();
                }
            });
        }
        
        // Phone validation - 11 digits
        if (phoneInput) {
            phoneInput.addEventListener('input', function() {
                let cleaned = this.value.replace(/\D/g, '');
                if (cleaned.length > 11) {
                    cleaned = cleaned.slice(0, 11);
                }
                this.value = cleaned;
            });
        }
        
        // Form submit
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const fullName = fullNameInput ? fullNameInput.value.trim() : '';
            const email = emailInput ? emailInput.value.trim() : '';
            const phone = phoneInput ? phoneInput.value.trim() : '';
            const subject = subjectSelect ? subjectSelect.value : '';
            const message = messageInput ? messageInput.value.trim() : '';
            
            let errors = [];
            
            // Reset borders
            [fullNameInput, emailInput, phoneInput, subjectSelect, messageInput].forEach(input => {
                if (input) input.style.borderColor = '#e0d5c5';
            });
            
            // Validations
            if (!fullName) errors.push('Full Name is required');
            else if (fullName.length < 2) errors.push('Name must be at least 2 characters');
            
            if (!email) errors.push('Email Address is required');
            else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push('Valid email is required');
            
            if (phone && phone.length !== 11) errors.push('Phone must be exactly 11 digits');
            
            if (!subject || subject === '') errors.push('Please select a subject');
            
            if (!message) errors.push('Message is required');
            else if (message.length < 10) errors.push('Message must be at least 10 characters');
            
            if (errors.length > 0) {
                alert('Please fix:\n\n• ' + errors.join('\n• '));
                return;
            }
            
            // SUCCESS - Hide header and form
            if (formHeader) formHeader.style.display = 'none';
            contactForm.style.display = 'none';
            
            // Show success message
            if (successDiv) {
                successDiv.innerHTML = `
                    <div class="success-message-centered">
                        <i class="fas fa-check-circle"></i>
                        <h3>Message Sent!</h3>
                        <p>Thank you for reaching out, <strong>${escapeHtml(fullName)}</strong>!</p>
                        <p>We'll get back to you within 24 hours.</p>
                        <button type="button" class="btn-new-message" onclick="resetContactForm()">Send Another Message</button>
                    </div>
                `;
                successDiv.style.display = 'block';
                successDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            
            console.log('Contact form submitted');
        });
    }
});

// Reset function
function resetContactForm() {
    const contactForm = document.getElementById('contactForm');
    const formHeader = document.getElementById('formHeader');
    const successDiv = document.getElementById('contactSuccess');
    
    if (contactForm) {
        if (formHeader) formHeader.style.display = 'block';
        contactForm.style.display = 'block';
        contactForm.reset();
        
        // Reset borders
        ['fullName', 'email', 'phone', 'subject', 'message'].forEach(id => {
            const input = document.getElementById(id);
            if (input) input.style.borderColor = '#e0d5c5';
        });
    }
    
    if (successDiv) {
        successDiv.style.display = 'none';
        successDiv.innerHTML = '';
    }
    
    if (contactForm) {
        contactForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// FAQ Toggle
function toggleFAQ(element) {
    const faqItem = element.closest('.faq-item');
    if (faqItem) {
        faqItem.classList.toggle('active');
    }
}

console.log('Jun\'s Cut Salon - Website loaded successfully! ✅');