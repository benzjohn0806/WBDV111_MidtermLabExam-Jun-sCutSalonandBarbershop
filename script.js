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
        document.addEventListener('DOMContentLoaded', function() {
            const contactForm = document.getElementById('contactForm');
            const contactSuccess = document.getElementById('contactSuccess');
            
            if (contactForm) {
                contactForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    
                    const fullName = document.getElementById('fullName').value;
                    const email = document.getElementById('email').value;
                    const subject = document.getElementById('subject').value;
                    const message = document.getElementById('message').value;
                    
                    if (!fullName || !email || !subject || !message) {
                        alert('Please fill in all required fields (*)');
                        return;
                    }
                    
                    // Hide form, show success message
                    contactForm.style.display = 'none';
                    if (contactSuccess) {
                        contactSuccess.style.display = 'block';
                    }
                    
                    console.log('Contact form submitted:', {fullName, email, subject, message});
                });
            }
            
            // Reset contact form function
            window.resetContactForm = function() {
                if (contactForm) {
                    contactForm.reset();
                    contactForm.style.display = 'block';
                    if (contactSuccess) {
                        contactSuccess.style.display = 'none';
                    }
                }
            };
        });

document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navOverlay = document.getElementById('nav-overlay');
    const body = document.body;
    
    if (hamburger && navMenu) {
        function toggleMenu() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            if (navOverlay) navOverlay.classList.toggle('active');
            body.classList.toggle('menu-open');
        }
        
        hamburger.addEventListener('click', toggleMenu);
        
        // Close menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                if (navOverlay) navOverlay.classList.remove('active');
                body.classList.remove('menu-open');
            });
        });
        
        // Close menu when clicking overlay
        if (navOverlay) {
            navOverlay.addEventListener('click', toggleMenu);
        }
    }
});

const phoneInput = document.getElementById('phone');

phoneInput.addEventListener('input', function(e) {
    // Remove any non-digit characters
    this.value = this.value.replace(/\D/g, '');
    
    // Limit to 11 digits
    if (this.value.length > 11) {
        this.value = this.value.slice(0, 11);
    }
});

console.log('Jun\'s Cut Salon - Website loaded successfully! ✅');