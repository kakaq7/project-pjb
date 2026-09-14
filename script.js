const modal = document.getElementById("modal");
const navbar = document.getElementById("navbar");
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const toast = document.getElementById("toast");

function showForm(type) {
  const isLogin = type === "login";
  loginForm.hidden = !isLogin;
  registerForm.hidden = isLogin;
}

function openModal(type) {
  showForm(type);
  modal.classList.add("show");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modal.classList.remove("show");
  document.body.style.overflow = "";
}

document.querySelectorAll("[data-modal]").forEach((button) => {
  button.addEventListener("click", () => openModal(button.dataset.modal));
});

document.querySelectorAll("[data-switch]").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    showForm(link.dataset.switch);
  });
});

document.getElementById("close").addEventListener("click", closeModal);

modal.addEventListener("click", (event) => {
  if (event.target === modal) closeModal();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeModal();
});

document.getElementById("menu").addEventListener("click", () => {
  navbar.classList.toggle("open");
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => navbar.classList.remove("open"));
});

document.querySelectorAll(".form").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    closeModal();
    toast.textContent = form.dataset.demo;
    toast.style.display = "block";

    window.setTimeout(() => {
      toast.style.display = "none";
    }, 2800);

    form.reset();
  });
});
