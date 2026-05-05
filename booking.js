    <script>
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        const dropdownNav = document.querySelectorAll('.dropdown-nav');

        /* TOGGLE MENU */
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        dropdownNav.forEach(item => {
            item.addEventListener('click', (e) => {
                if (window.innerWidth <= 768) {
                    e.preventDefault();

                    dropdownNav.forEach(i => {
                        if (i !== item) i.classList.remove('active');
                    });

                    item.classList.toggle('active');
                }
            });
        });


        const dropdowns = document.querySelectorAll('.dropdown');
        const navDropdownLinks = document.querySelectorAll('.nav-dropdown-menu li a');

        dropdowns.forEach(dropdown => {
            const btn = dropdown.querySelector('.dropdown-btn');

            btn.addEventListener('click', function () {
                dropdowns.forEach(other => {
                    if (other !== dropdown) {
                        other.classList.remove('active');
                    }
                });

                dropdown.classList.toggle('active');
            });
        });

        document.addEventListener('click', function (e) {
            if (!e.target.closest('.dropdown')) {
                dropdowns.forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            }
        });

        navDropdownLinks.forEach(link => {
            link.addEventListener('click', function (e) {
                e.preventDefault();

                const category = this.getAttribute('data-category');
                const targetDropdown = document.querySelector('.dropdown[data-category="' + category + '"]');

                if (targetDropdown) {
                    dropdowns.forEach(d => d.classList.remove('active'));

                    targetDropdown.classList.add('active');

                    targetDropdown.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            });
        });

         const bookingForm = document.getElementById('bookingForm');
        const bookingSuccess = document.getElementById('bookingSuccess');
        const phoneInput = document.getElementById('phone');
        const fullNameInput = document.getElementById('fullName');
        const dateInput = document.getElementById('date');
        const timeInput = document.getElementById('time');

        fullNameInput.addEventListener('input', function() {
            this.value = this.value.replace(/[^a-zA-Z\s]/g, '');
        });

        fullNameInput.addEventListener('keydown', function(e) {
            if (e.key === ' ') {
                return;
            }
            if (!/^[a-zA-Z]$/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete' && e.key !== 'ArrowLeft' && e.key !== 'ArrowRight' && e.key !== 'Tab') {
                e.preventDefault();
            }
        });

        phoneInput.addEventListener('input', function() {
            this.value = this.value.replace(/\D/g, '');
            if (this.value.length > 11) {
                this.value = this.value.slice(0, 11);
            }
        });

        phoneInput.addEventListener('keydown', function(e) {
            if (!/^\d$/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete' && e.key !== 'ArrowLeft' && e.key !== 'ArrowRight' && e.key !== 'Tab') {
                e.preventDefault();
            }
        });

        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);

        timeInput.addEventListener('change', function() {
            validateDateTime();
        });

        dateInput.addEventListener('change', function() {
            validateDateTime();
        });

        function validateDateTime() {
            const selectedDate = dateInput.value;
            const selectedTime = timeInput.value;

            if (selectedDate && selectedTime) {
                const now = new Date();
                const selectedDateTime = new Date(selectedDate + 'T' + selectedTime + ':00');
                
                if (selectedDateTime <= now) {
                    timeInput.setCustomValidity('This time has already passed. Please choose a future time.');
                    timeInput.style.borderColor = '#e74c3c';
                    timeInput.style.background = '#fff5f5';
                } else {
                    timeInput.setCustomValidity('');
                    timeInput.style.borderColor = '';
                    timeInput.style.background = '';
                }
            }
        }

        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const phoneValue = phoneInput.value;
            const nameValue = fullNameInput.value.trim();
            const selectedDate = dateInput.value;
            const selectedTime = timeInput.value;
            
            if (nameValue === '') {
                alert('Please enter your full name.');
                fullNameInput.focus();
                return;
            }
            
            if (phoneValue.length < 10 || phoneValue.length > 11) {
                alert('Please enter a valid phone number (10-11 digits).');
                phoneInput.focus();
                return;
            }

            if (selectedDate && selectedTime) {
                const now = new Date();
                const selectedDateTime = new Date(selectedDate + 'T' + selectedTime + ':00');
                
                if (selectedDateTime <= now) {
                    alert('The selected time has already passed. Please choose a future date and time.');
                    timeInput.focus();
                    return;
                }
            }
            
            bookingForm.style.display = 'none';
            bookingSuccess.style.display = 'block';
            
            bookingSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
    </script>