// ─────────────────────────────────────────────
        //  HOW TO SET UP EmailJS (free, no backend):
        //
        //  1. Go to https://www.emailjs.com and create a free account
        //  2. Add an Email Service (Gmail, Outlook, etc.)
        //  3. Create an Email Template — use these variables:
        //       {{from_name}}  {{from_email}}  {{subject}}  {{message}}
        //  4. Replace the three values below with your own IDs
        // ─────────────────────────────────────────────

        const EMAILJS_PUBLIC_KEY  = 'lTQFF2j3dvQtT53CK';   // Account → API Keys
        const EMAILJS_SERVICE_ID  = 'service_8fl1hso';   // Email Services tab
        const EMAILJS_TEMPLATE_ID = 'template_3gomp6a';  // Email Templates tab

        // ─────────────────────────────────────────────

        emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });

        const form      = document.getElementById('contactForm');
        const feedback  = document.getElementById('feedback');
        const spinner   = document.getElementById('spinner');
        const btnLabel  = document.getElementById('btnLabel');
        const btnIcon   = document.getElementById('btnIcon');
        const submitBtn = document.getElementById('submitBtn');
        const textarea  = document.getElementById('fmessage');
        const charCount = document.getElementById('charCount');

        // Live character counter
        textarea.addEventListener('input', () => {
            charCount.textContent = `${textarea.value.length} / 1000`;
        });

        // Inline validation helpers
        function setValid(el)   { el.classList.remove('invalid'); }
        function setInvalid(el) { el.classList.add('invalid'); el.addEventListener('input', () => setValid(el), { once: true }); }

        function validate() {
            const name    = document.getElementById('fname');
            const email   = document.getElementById('femail');
            const subject = document.getElementById('fsubject');
            const msg     = document.getElementById('fmessage');
            let ok = true;

            if (!name.value.trim())    { setInvalid(name);    ok = false; }
            if (!email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
                setInvalid(email); ok = false;
            }
            if (!subject.value.trim()) { setInvalid(subject); ok = false; }
            if (!msg.value.trim())     { setInvalid(msg);     ok = false; }

            return ok;
        }

        function setLoading(on) {
            submitBtn.disabled = on;
            spinner.style.display  = on ? 'block' : 'none';
            btnIcon.style.display  = on ? 'none'  : 'inline';
            btnLabel.textContent   = on ? 'Sending…' : 'Send Message';
        }

        function showFeedback(type, msg) {
            feedback.className = `feedback ${type}`;
            feedback.textContent = msg;
        }

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            feedback.className = 'feedback';

            if (!validate()) {
                showFeedback('error', 'Please fill in all fields correctly.');
                return;
            }

            setLoading(true);

            try {
                await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form);

                showFeedback('success', "Message sent! Thanks for reaching out — I'll get back to you within 24 hours.");
                form.reset();
                charCount.textContent = '0 / 1000';

            } catch (err) {
                console.error('EmailJS error:', err);
                showFeedback('error', 'Something went wrong. Please email me directly at radjkewalbansing@icloud.com');
            }

            setLoading(false);
        });
