/**
 * FIGHT FOR JUSTICES — ADVOCATE JATIN PAREEK
 * PREMIUM INTERACTIVE JAVASCRIPT ENGINE v2.1
 * Mobile-first & Desktop-optimized, 60fps animations
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // ========================================================================
  // 1. MOBILE MENU DRAWER
  // ========================================================================
  const header = document.getElementById('site-header');
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuClose = document.querySelector('.menu-close');
  const mobileLinks = document.querySelectorAll('.mobile-links a');
  const scrollProgressBar = document.querySelector('.scroll-progress span');
  const backToTopBtn = document.getElementById('back-to-top');

  function toggleMenu(isOpen) {
    if (!mobileMenu) return;
    mobileMenu.classList.toggle('is-open', isOpen);
    mobileMenu.setAttribute('aria-hidden', String(!isOpen));
    document.body.classList.toggle('menu-open', isOpen);
    if (menuToggle) menuToggle.setAttribute('aria-expanded', String(isOpen));
    if (isOpen && menuClose) menuClose.focus();
  }

  if (menuToggle) menuToggle.addEventListener('click', () => toggleMenu(true));
  if (menuClose) menuClose.addEventListener('click', () => toggleMenu(false));
  mobileLinks.forEach(link => link.addEventListener('click', () => toggleMenu(false)));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('is-open')) {
      toggleMenu(false);
    }
  });

  // ========================================================================
  // 2. SCROLL HANDLING — Progress, Header, Back-to-Top (RAF-optimized)
  // ========================================================================
  let ticking = false;

  function handleScroll() {
    const scrollY = window.scrollY;

    // Sticky header state
    if (header) {
      header.classList.toggle('is-scrolled', scrollY > 50);
    }

    // Back to top button
    if (backToTopBtn) {
      backToTopBtn.classList.toggle('is-visible', scrollY > 350);
    }

    // Scroll progress bar
    if (scrollProgressBar) {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollY / docHeight) : 0;
      scrollProgressBar.style.transform = `scaleX(${Math.min(progress, 1)})`;
    }

    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(handleScroll);
      ticking = true;
    }
  }, { passive: true });

  handleScroll();

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ========================================================================
  // 3. SCROLL REVEAL ANIMATIONS (IntersectionObserver)
  // ========================================================================
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.08
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('visible'));
  }

  // ========================================================================
  // 4. INTERACTIVE LEGAL ASSESSMENT TOOL
  // ========================================================================
  const assessmentData = {
    'civil': {
      title: 'Civil Suit / Property Dispute (दीवानी मामला)',
      checklist: [
        'Registered title deeds / Sale deed / Conveyance deed',
        'Site map (naksha) and boundary demarcation',
        'Revenue Jamabandi / Khasra records (if land involved)',
        'Legal notices or court summons received (if any)',
        'Identity & address proof of claimant'
      ],
      timeline: '2 to 12 months for injunctions; variable for trials',
      court: 'Jaipur District & Sessions Courts / Rajasthan High Court',
      waMessage: 'Namaste Advocate Jatin Pareek ji, I need legal consultation regarding a Civil / Property Dispute in Jaipur.'
    },
    'jda': {
      title: 'Land & Colony Regularisation (JDA / UIT पट्टा नियमन)',
      checklist: [
        'Original Society allotment letter & possession receipt',
        'Chain of previous agreement to sell / power of attorney',
        'Electricity / Water bills or municipal tax receipts as proof of possession',
        'Site plan / layout map of the colony',
        'Aadhaar card & PAN card of the current owner'
      ],
      timeline: '45 to 90 working days depending on JDA camp schedule',
      court: 'Jaipur Development Authority (JDA) / UIT / Nagar Nigam',
      waMessage: 'Namaste Advocate Jatin Pareek ji, I want to check eligibility and apply for JDA / UIT Land Regularisation (Patta) in Jaipur.'
    },
    'saledeed': {
      title: 'Sale Deed Registration (बैनामा / विक्रय पत्र)',
      checklist: [
        'Original Title Deed & chain of previous title documents (30 years search)',
        'Up-to-date JDA / Nagar Nigam Patta and building approval',
        'No-dues certificate from society / electricity bill',
        'Aadhaar card, PAN card & passport photos of Buyer and Seller',
        'Two independent witnesses with valid Aadhaar IDs'
      ],
      timeline: '1 to 2 working days (Drafting, stamp duty & Sub-Registrar biometric registration)',
      court: 'Office of Sub-Registrar (I to X), Jaipur',
      waMessage: 'Namaste Advocate Jatin Pareek ji, I need assistance in drafting and registering a Sale Deed (Bikray Patra) in Jaipur.'
    },
    'giftdeed': {
      title: 'Gift Deed Registration (दान पत्र - Blood Relatives)',
      checklist: [
        'Original Property Title Deed & legal ownership proof',
        'Proof of family relationship (for Rajasthan stamp duty concession)',
        'Valuation certificate of immovable property (DLC rate)',
        'Aadhaar, PAN & photographs of Donor and Donee',
        'Two local witnesses'
      ],
      timeline: '1 to 2 working days',
      court: 'Sub-Registrar Office, Jaipur',
      waMessage: 'Namaste Advocate Jatin Pareek ji, I need to register a Gift Deed (Dan Patra) for family property in Jaipur.'
    },
    'revenue': {
      title: 'Revenue Mutation & Jamabandi Correction (दाखिल खारिज / नामान्तरण)',
      checklist: [
        'Copy of registered Sale Deed / Gift Deed / Will',
        'Latest Jamabandi Nakal and Khasra Girdawari',
        'Family tree (Vanshvali) in case of inheritance / succession',
        'NOC / Consent affidavits from other legal heirs (if applicable)',
        'Identity proofs of applicant'
      ],
      timeline: '15 to 45 days',
      court: 'Tehsildar / SDO Revenue Court, Jaipur / Board of Revenue Ajmer',
      waMessage: 'Namaste Advocate Jatin Pareek ji, I require legal help with Revenue Mutation (Nakal / Jamabandi correction) in Rajasthan.'
    },
    'will': {
      title: 'Will Drafting & Registration (वसीयतनामा)',
      checklist: [
        'List of all self-acquired properties, bank accounts & assets',
        'Full details and ID proof of testator & beneficiaries',
        'Names and ID proofs of Executor and two reliable witnesses',
        'Medical fitness certificate of testator (recommended for senior citizens)',
        'Clear allocation ratios and terms'
      ],
      timeline: '1 to 2 days for drafting & registration',
      court: 'Sub-Registrar Office, Jaipur',
      waMessage: 'Namaste Advocate Jatin Pareek ji, I wish to draft and register a legally sound Will (Vasiyatnama).'
    }
  };

  const matterButtons = document.querySelectorAll('.matter-btn');
  const resultTitle = document.getElementById('result-title');
  const resultChecklist = document.getElementById('result-checklist');
  const resultTimeline = document.getElementById('result-timeline');
  const resultCourt = document.getElementById('result-court');
  const resultWaLink = document.getElementById('result-wa-link');

  function updateAssessment(key) {
    const data = assessmentData[key];
    if (!data) return;

    if (resultTitle) resultTitle.textContent = data.title;
    if (resultTimeline) resultTimeline.textContent = data.timeline;
    if (resultCourt) resultCourt.textContent = data.court;
    if (resultWaLink) {
      resultWaLink.href = `https://wa.me/918094119111?text=${encodeURIComponent(data.waMessage)}`;
    }

    if (resultChecklist) {
      resultChecklist.innerHTML = data.checklist.map(item => `<li>${item}</li>`).join('');
    }

    matterButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.matter === key);
    });
  }

  matterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      updateAssessment(btn.dataset.matter);
    });
  });

  if (matterButtons.length > 0) {
    updateAssessment(matterButtons[0].dataset.matter || 'civil');
  }

  // ========================================================================
  // 5. PRACTICE AREAS FILTER
  // ========================================================================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const practiceCards = document.querySelectorAll('.practice-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.dataset.filter;
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      practiceCards.forEach((card, index) => {
        const shouldShow = category === 'all' || card.dataset.category === category;
        
        if (shouldShow) {
          card.style.display = 'flex';
          card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
          card.style.transitionDelay = `${index * 0.05}s`;
          requestAnimationFrame(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          });
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(12px)';
          card.style.transitionDelay = '0s';
          setTimeout(() => { card.style.display = 'none'; }, 250);
        }
      });
    });
  });

  // ========================================================================
  // 6. ACCORDION (Property Registration & FAQs)
  // ========================================================================
  const accordionButtons = document.querySelectorAll('.accordion-button');

  accordionButtons.forEach(button => {
    button.addEventListener('click', () => {
      const item = button.closest('.accordion-item');
      const panel = item.querySelector('.accordion-panel');
      const isOpen = item.classList.contains('is-open');
      const parentContainer = item.closest('.accordion-container');

      // Close other panels in same container
      if (parentContainer && !parentContainer.dataset.allowMultiple) {
        parentContainer.querySelectorAll('.accordion-item').forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('is-open');
            const otherBtn = otherItem.querySelector('.accordion-button');
            const otherPanel = otherItem.querySelector('.accordion-panel');
            if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
            if (otherPanel) otherPanel.style.maxHeight = '0px';
          }
        });
      }

      if (isOpen) {
        item.classList.remove('is-open');
        button.setAttribute('aria-expanded', 'false');
        panel.style.maxHeight = '0px';
      } else {
        item.classList.add('is-open');
        button.setAttribute('aria-expanded', 'true');
        panel.style.maxHeight = panel.scrollHeight + 'px';
      }
    });
  });

  // Initialize open accordions
  document.querySelectorAll('.accordion-item.is-open').forEach(item => {
    const panel = item.querySelector('.accordion-panel');
    const button = item.querySelector('.accordion-button');
    if (panel) panel.style.maxHeight = panel.scrollHeight + 'px';
    if (button) button.setAttribute('aria-expanded', 'true');
  });

  // ========================================================================
  // 7. FAQ SEARCH FILTER
  // ========================================================================
  const faqInput = document.getElementById('faq-search');
  const faqItems = document.querySelectorAll('.faq-accordion .accordion-item');
  let faqDebounceTimer;

  if (faqInput) {
    faqInput.addEventListener('input', (e) => {
      clearTimeout(faqDebounceTimer);
      faqDebounceTimer = setTimeout(() => {
        const term = e.target.value.toLowerCase().trim();

        faqItems.forEach(item => {
          const text = item.textContent.toLowerCase();
          const matches = !term || text.includes(term);
          item.style.display = matches ? 'block' : 'none';
        });
      }, 150);
    });
  }

  // ========================================================================
  // 8. ANIMATED STATISTICS COUNTERS
  // ========================================================================
  const statsSection = document.getElementById('statistics');
  let statsAnimated = false;

  function countUp(el) {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 1800;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * target);

      el.textContent = `${current.toLocaleString()}${suffix}`;
      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = `${target.toLocaleString()}${suffix}`;
      }
    }
    requestAnimationFrame(update);
  }

  if (statsSection && 'IntersectionObserver' in window) {
    const statsObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !statsAnimated) {
          statsAnimated = true;
          document.querySelectorAll('.stat-number').forEach(el => {
            const delay = Array.from(el.closest('.stats-grid').children).indexOf(el.closest('.stat-item')) * 150;
            setTimeout(() => countUp(el), delay);
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.25 });
    statsObserver.observe(statsSection);
  }

  // ========================================================================
  // 9. TESTIMONIALS CAROUSEL
  // ========================================================================
  const track = document.querySelector('.carousel-track');
  const slides = document.querySelectorAll('.testimonial-card');
  const nextBtn = document.querySelector('.carousel-arrow[data-dir="next"]');
  const prevBtn = document.querySelector('.carousel-arrow[data-dir="prev"]');
  const dotsContainer = document.querySelector('.carousel-dots');

  if (track && slides.length > 0) {
    let currentIndex = 0;
    let autoPlayTimer;

    // Create dots
    if (dotsContainer) {
      dotsContainer.innerHTML = '';
      slides.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.className = `carousel-dot ${i === 0 ? 'active' : ''}`;
        dot.setAttribute('aria-label', `Go to testimonial ${i + 1}`);
        dot.addEventListener('click', () => { goToSlide(i); resetAutoPlay(); });
        dotsContainer.appendChild(dot);
      });
    }

    function updateDots() {
      const dots = document.querySelectorAll('.carousel-dot');
      dots.forEach((dot, i) => dot.classList.toggle('active', i === currentIndex));
    }

    function goToSlide(index) {
      currentIndex = ((index % slides.length) + slides.length) % slides.length;
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
      updateDots();
    }

    function nextSlide() { goToSlide(currentIndex + 1); }
    function prevSlide() { goToSlide(currentIndex - 1); }

    if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetAutoPlay(); });
    if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetAutoPlay(); });

    function resetAutoPlay() {
      clearInterval(autoPlayTimer);
      autoPlayTimer = setInterval(nextSlide, 5500);
    }

    // Touch swipe support with momentum
    let startX = 0;
    let startTime = 0;
    let isDragging = false;

    track.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      startTime = Date.now();
      isDragging = true;
      clearInterval(autoPlayTimer);
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
      if (!isDragging) return;
      isDragging = false;
      const endX = e.changedTouches[0].clientX;
      const diff = startX - endX;
      const elapsed = Date.now() - startTime;
      const velocity = Math.abs(diff) / elapsed;

      if (Math.abs(diff) > 40 || velocity > 0.3) {
        if (diff > 0) nextSlide();
        else prevSlide();
      }
      resetAutoPlay();
    }, { passive: true });

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        clearInterval(autoPlayTimer);
      } else {
        resetAutoPlay();
      }
    });

    resetAutoPlay();
  }

  // ========================================================================
  // 10. ROBUST CONSULTATION FORM HANDLER
  // ========================================================================
  const consultForm = document.getElementById('consultation-form');
  const feedbackBox = document.getElementById('form-feedback-box');
  const phoneInput = document.getElementById('phone-number');
  const nameInput = document.getElementById('full-name');
  const emailInput = document.getElementById('email-address');
  const matterInput = document.getElementById('matter-type');
  const msgInput = document.getElementById('matter-description');

  if (consultForm && feedbackBox) {
    // Restrict phone input to numeric digits (max 10)
    if (phoneInput) {
      phoneInput.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, '').slice(0, 10);
        e.target.classList.remove('is-invalid');
      });
    }

    // Clear validation styling on typing
    [nameInput, emailInput, matterInput, msgInput].forEach(input => {
      if (input) {
        input.addEventListener('input', () => input.classList.remove('is-invalid'));
        input.addEventListener('change', () => input.classList.remove('is-invalid'));
      }
    });

    function showFeedback(type, messageHtml) {
      feedbackBox.className = `form-feedback ${type} is-visible`;
      feedbackBox.innerHTML = messageHtml;
      feedbackBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    function hideFeedback() {
      feedbackBox.className = 'form-feedback';
      feedbackBox.innerHTML = '';
    }

    consultForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      hideFeedback();

      // Form validation
      let hasError = false;
      const nameVal = nameInput ? nameInput.value.trim() : '';
      const phoneVal = phoneInput ? phoneInput.value.trim() : '';
      const emailVal = emailInput ? emailInput.value.trim() : '';
      const matterVal = matterInput ? matterInput.value : '';
      const msgVal = msgInput ? msgInput.value.trim() : '';

      if (!nameVal || nameVal.length < 2) {
        if (nameInput) nameInput.classList.add('is-invalid');
        hasError = true;
      }

      // Valid Indian 10-digit mobile number starting with 6,7,8,9
      const phoneRegex = /^[6-9]\d{9}$/;
      if (!phoneVal || !phoneRegex.test(phoneVal)) {
        if (phoneInput) phoneInput.classList.add('is-invalid');
        hasError = true;
      }

      // Valid email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailVal || !emailRegex.test(emailVal)) {
        if (emailInput) emailInput.classList.add('is-invalid');
        hasError = true;
      }

      if (!matterVal) {
        if (matterInput) matterInput.classList.add('is-invalid');
        hasError = true;
      }

      if (!msgVal || msgVal.length < 5) {
        if (msgInput) msgInput.classList.add('is-invalid');
        hasError = true;
      }

      if (hasError) {
        showFeedback('error', '⚠️ <strong>Please complete all required fields correctly</strong> (including a valid 10-digit mobile number and email).');
        return;
      }

      const submitBtn = consultForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>⏳ Sending Confidential Enquiry...</span>';

      const formData = new FormData(consultForm);

      try {
        const response = await fetch(consultForm.action, {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
          consultForm.reset();
          const waPrefilled = `Namaste Advocate Jatin Pareek ji, I have submitted a consultation enquiry on your website regarding: ${encodeURIComponent(matterVal)}. My name is ${encodeURIComponent(nameVal)}.`;
          showFeedback('success', `
            <div style="display:flex; flex-direction:column; gap:0.5rem;">
              <div><strong>✅ Thank You, ${nameVal}!</strong> Your confidential legal enquiry has been submitted successfully. Advocate Jatin Pareek will review your matter and contact you within 24 hours.</div>
              <div style="margin-top:0.35rem;">
                <a href="https://wa.me/918094119111?text=${waPrefilled}" target="_blank" rel="noopener" class="btn btn-whatsapp btn-sm" style="display:inline-flex; width:auto;">
                  <span>💬 Follow up on WhatsApp for Urgent Advice</span>
                </a>
              </div>
            </div>
          `);
        } else {
          throw new Error('Submission server error');
        }
      } catch (err) {
        // Fallback with direct WhatsApp enquiry so the lead is never lost!
        const waFallback = `Namaste Advocate Jatin Pareek ji, I tried sending an enquiry on your website.%0A%0A*Name:* ${encodeURIComponent(nameVal)}%0A*Phone:* ${encodeURIComponent(phoneVal)}%0A*Matter:* ${encodeURIComponent(matterVal)}%0A*Details:* ${encodeURIComponent(msgVal)}`;
        showFeedback('error', `
          <div style="display:flex; flex-direction:column; gap:0.5rem;">
            <div>⚠️ Form server connection was slow, but you can <strong>send your enquiry directly to Advocate Jatin Pareek on WhatsApp</strong>:</div>
            <div style="margin-top:0.35rem;">
              <a href="https://wa.me/918094119111?text=${waFallback}" target="_blank" rel="noopener" class="btn btn-whatsapp btn-sm" style="display:inline-flex; width:auto;">
                <span>💬 Send via WhatsApp Instantly (+91 80941 19111)</span>
              </a>
            </div>
          </div>
        `);
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
      }
    });
  }

  // ========================================================================
  // 11. ACTIVE NAVIGATION INDICATOR (Scrollspy)
  // ========================================================================
  const navSections = document.querySelectorAll('section[id]');
  const desktopNavLinks = document.querySelectorAll('.desktop-nav a');
  const mobileBottomLinks = document.querySelectorAll('.mobile-bottom-nav a[href^="#"]');

  let navTicking = false;

  function updateActiveNav() {
    let currentId = 'home';
    const scrollPos = window.scrollY + 150;

    navSections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = sec.getAttribute('id');
      }
    });

    desktopNavLinks.forEach(link => {
      const href = link.getAttribute('href').replace('#', '');
      link.classList.toggle('active', href === currentId);
    });

    // Update mobile bottom nav
    mobileBottomLinks.forEach(link => {
      const href = link.getAttribute('href').replace('#', '');
      link.classList.toggle('active', href === currentId);
    });

    navTicking = false;
  }

  window.addEventListener('scroll', () => {
    if (!navTicking) {
      requestAnimationFrame(updateActiveNav);
      navTicking = true;
    }
  }, { passive: true });

  // ========================================================================
  // 12. SMOOTH SCROLL FOR ANCHOR LINKS
  // ========================================================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth' });
        
        if (history.pushState) {
          history.pushState(null, null, targetId);
        }
      }
    });
  });

  // ========================================================================
  // 13. PERFORMANCE: Add will-change hints to animated elements
  // ========================================================================
  const animatedElements = document.querySelectorAll('.practice-card, .roadmap-card, .why-card, .cred-card, .court-forum-item');
  
  animatedElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      el.style.willChange = 'transform';
    });
    el.addEventListener('mouseleave', () => {
      el.style.willChange = 'auto';
    });
  });

});