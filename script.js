const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');
const modal = document.querySelector('#auth-modal');
const loginForm = document.querySelector('#login-form');
const registerForm = document.querySelector('#register-form');
const authTitle = document.querySelector('#auth-title');
const authSubtitle = document.querySelector('#auth-subtitle');
const authNote = document.querySelector('#auth-note');
const openButtons = document.querySelectorAll('[data-open-auth]');
const closeButtons = document.querySelectorAll('[data-close-auth]');

menuToggle?.addEventListener('click', () => {
  const open = mainNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Tutup menu navigasi' : 'Buka menu navigasi');
});

mainNav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  mainNav.classList.remove('open');
  menuToggle?.setAttribute('aria-expanded', 'false');
}));

function setAuthMode(mode) {
  const isLogin = mode === 'login';
  document.querySelector('#login-panel').hidden = !isLogin;
  document.querySelector('#register-panel').hidden = isLogin;
  authTitle.textContent = isLogin ? 'Selamat datang kembali.' : 'Bergabung bersama kami.';
  authSubtitle.textContent = isLogin ? 'Akses ruang anggota Paguyuban Jogja Bersatu.' : 'Buat akun untuk ikut dalam gerakan sosial PJB.';
  authNote.textContent = 'Demo front-end: data belum dikirim ke server.';
}

function openAuth(mode='login') {
  setAuthMode(mode);
  modal.hidden = false;
  document.body.classList.add('modal-open');
  setTimeout(() => (isLoginMode() ? loginForm : registerForm).querySelector('input')?.focus(), 50);
}
function closeAuth() {
  modal.hidden = true;
  document.body.classList.remove('modal-open');
}
function isLoginMode() { return !loginForm.hidden; }

openButtons.forEach(btn => btn.addEventListener('click', () => openAuth(btn.dataset.openAuth)));
closeButtons.forEach(btn => btn.addEventListener('click', closeAuth));
document.addEventListener('keydown', e => { if (e.key === 'Escape' && !modal.hidden) closeAuth(); });

function demoSubmit(form, mode) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const button = form.querySelector('button[type="submit"]');
    button.textContent = mode === 'login' ? 'Berhasil masuk ✓' : 'Akun dibuat ✓';
    button.disabled = true;
    authNote.textContent = mode === 'login'
      ? 'Simulasi berhasil. Hubungkan form ini ke API autentikasi untuk produksi.'
      : 'Simulasi berhasil. Hubungkan form ini ke backend untuk menyimpan akun.';
    setTimeout(() => { button.textContent = mode === 'login' ? 'Masuk ke akun' : 'Buat akun anggota'; button.disabled = false; }, 1800);
  });
}
demoSubmit(loginForm, 'login');
demoSubmit(registerForm, 'register');

const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();

const reveals = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  reveals.forEach((el, i) => {
    el.style.transitionDelay = `${Math.min(i * 45, 250)}ms`;
    observer.observe(el);
  });
} else {
  reveals.forEach(el => el.classList.add('visible'));
}

document.querySelectorAll('[data-switch-auth]').forEach(btn => btn.addEventListener('click', () => setAuthMode(btn.dataset.switchAuth)));
document.querySelector('.forgot-btn')?.addEventListener('click', () => { authNote.textContent = 'Demo: alur reset kata sandi siap dihubungkan ke email/API backend.'; });
