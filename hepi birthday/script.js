// ===== SCRIPT.JS – Birthday Website Logic =====
(function () {
  'use strict';

  // ---------- PAGE REFERENCES ----------
  const pages = {
    welcome: document.getElementById('pageWelcome'),
    wish: document.getElementById('pageWish'),
    gif: document.getElementById('pageGif'),
    menu: document.getElementById('pageMenu'),
    photo: document.getElementById('pagePhoto'),
    message: document.getElementById('pageMessage'),
  };

  function showPage(pageId) {
    Object.values(pages).forEach((page) => {
      if (page) page.classList.remove('active');
    });
    const target = pages[pageId];
    if (target) target.classList.add('active');
  }

  // ---------- TYPEWRITER MESSAGE ----------
  const messageParagraph = document.getElementById('typedMessage');
  const fullMessage =
"\"Selamat ulang tahun kasep ku aowokwok, i wish you all the best for your career, segala urusan pekerjaan kamu dilancarkan, dan semua capek kamu digantikan dengan hasil yang terbaik, jangan lupa untuk selalu jaga kesehatan yakkk, im sori kalau selama ini aku masih banyak kurangnya dan mungkin belum bisa jadi yg terbaik buat kamu, maaf juga klo aku ngeselin(HEHEHEHE), dan aku terus mensupport kamu (asekk), POKONYA HEPI BIRTHDAYYYY!\n— with love, Audy 💖\"";
  let typewriterTimeout = null;
  let isTyping = false;

  function resetTypewriter() {
    if (typewriterTimeout) {
      clearTimeout(typewriterTimeout);
      typewriterTimeout = null;
    }
    if (!messageParagraph) return;
    messageParagraph.innerHTML = '';
    isTyping = true;
    let i = 0;
    let cursorSpan = document.createElement('span');
    cursorSpan.className = 'cursor-blink';
    messageParagraph.appendChild(cursorSpan);

    function typeNext() {
      if (i < fullMessage.length) {
        const char = fullMessage.charAt(i);
        const cursor = messageParagraph.querySelector('.cursor-blink');
        if (char === '\n') {
          const br = document.createElement('br');
          messageParagraph.insertBefore(br, cursor);
        } else {
          const textNode = document.createTextNode(char);
          messageParagraph.insertBefore(textNode, cursor);
        }
        i++;
        typewriterTimeout = setTimeout(typeNext, 55);
      } else {
        const cursor = messageParagraph.querySelector('.cursor-blink');
        if (cursor) cursor.remove();
        isTyping = false;
      }
    }

    typeNext();
  }

  // ---------- STEP 1: WELCOME TO WISH ----------
  const welcomeImg2 = document.querySelector('.welcome-img-2');
  if (welcomeImg2) {
    welcomeImg2.addEventListener('click', () => {
      showPage('wish');
      const wishInput = document.getElementById('wishInput');
      if (wishInput) setTimeout(() => wishInput.focus(), 400);
    });
  }

  // ---------- STEP 2: WISH SUBMIT TO CAKE ----------
  const wishForm = document.getElementById('wishForm');
  if (wishForm) {
    wishForm.addEventListener('submit', function (e) {
      e.preventDefault();
      showPage('gif'); 
    });
  }

  // ---------- STEP 3: BLOW CANDLE TO MENU ----------
  const cakeWrap = document.getElementById('cakeWrap');
  if (cakeWrap) {
    cakeWrap.addEventListener('click', function () {
      if (this.classList.contains('candles-out')) return;
      this.classList.add('candles-out'); 
      
      setTimeout(() => {
        showPage('menu');
      }, 1500);
    });
  }
  
  // ---------- MENU NAVIGATION ----------
  function bindGiftCards() {
    const cards = document.querySelectorAll('.gift-card');
    cards.forEach((card) => {
      card.addEventListener('click', function () {
        const type = this.getAttribute('data-gift');
        if (type === 'photo') {
          showPage('photo');
        } else if (type === 'message') {
          resetTypewriter();
          showPage('message');
        }
      });
    });
  }

  document.getElementById('backToMenuFromPhoto')?.addEventListener('click', () => showPage('menu'));
  document.getElementById('backToMenuFromMsg')?.addEventListener('click', () => showPage('menu'));

  // ---------- MUSIC PLAYER SYSTEM ----------
  const musicBtn = document.getElementById('musicToggleBtn');
  const bgMusic = document.getElementById('bgMusic');
  const volumeSlider = document.getElementById('volumeSlider');
  const volumeWrap = document.querySelector('.volume-control-wrap');

  if (musicBtn && bgMusic) {
    bgMusic.volume = 0.5;

    if (volumeSlider) {
      volumeSlider.addEventListener('input', function() {
        bgMusic.volume = this.value;
      });
    }

    musicBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      if (volumeWrap) {
        volumeWrap.classList.toggle('show');
      }
      if (bgMusic.paused) {
        bgMusic.play().catch(() => {});
      }
    });

    document.addEventListener('click', function (e) {
      if (volumeWrap && !volumeWrap.contains(e.target) && e.target !== musicBtn) {
        volumeWrap.classList.remove('show');
      }
    });

    document.body.addEventListener('click', function startMusicOnFirstClick() {
      if (bgMusic.paused) {
        bgMusic.play().catch(() => {});
      }
      document.body.removeEventListener('click', startMusicOnFirstClick);
    });
  }

  // ---------- INITIALIZE ----------
  bindGiftCards();
  console.log('🎂 Birthday website ready with the new workflow!');
})();