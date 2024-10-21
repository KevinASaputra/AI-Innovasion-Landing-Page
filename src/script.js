const burgerBtn = document.getElementById("burger-btn");
const sideNav = document.getElementById("side-nav");
const menuItems = document.querySelectorAll(".menu-item");
const hamburgerIcon = document.getElementById("hamburger-icon");
const closeIcon = document.getElementById("close-icon");

// Function to toggle the side navigation
function toggleSideNav() {
  sideNav.classList.toggle("translate-x-full");
  hamburgerIcon.classList.toggle("hidden");
  closeIcon.classList.toggle("hidden");
}

// Event listener for burger button click
burgerBtn.addEventListener("click", toggleSideNav);

// Close navigation when a menu item is clicked
menuItems.forEach((item) => {
  item.addEventListener("click", () => {
    if (!sideNav.classList.contains("translate-x-full")) {
      toggleSideNav();
    }
  });
});

// Close navigation if clicked outside
window.addEventListener("click", (event) => {
  if (!sideNav.contains(event.target) && !burgerBtn.contains(event.target)) {
    if (!sideNav.classList.contains("translate-x-full")) {
      toggleSideNav();
    }
  }
});

const text = "Revolutionizing the Future with AI";

// Kecepatan mengetik dan menghapus (dalam milidetik) serta jeda di antara setiap proses
const typingSpeed = 100;
const deletingSpeed = 50;
const pauseAfterTyping = 2000; // Jeda setelah selesai mengetik sebelum menghapus (dalam milidetik)
const pauseAfterDeleting = 1000; // Jeda setelah selesai menghapus sebelum mengetik kembali

// Fungsi untuk mengetik teks satu per satu
const typeAndDeleteText = () => {
  let index = 0;
  let isDeleting = false;
  const typingElement = document.getElementById("typing-text");

  const type = () => {
    if (!isDeleting && index < text.length) {
      // Menambahkan karakter saat mengetik
      typingElement.textContent += text.charAt(index);
      index++;
      setTimeout(type, typingSpeed);
    } else if (isDeleting && index > 1) {
      // Menghapus karakter tetapi sisakan huruf "R"
      typingElement.textContent = text.substring(0, index - 1);
      index--;
      setTimeout(type, deletingSpeed);
    } else if (!isDeleting && index === text.length) {
      // Setelah selesai mengetik, jeda sebelum mulai menghapus
      isDeleting = true;
      setTimeout(type, pauseAfterTyping);
    } else if (isDeleting && index === 1) {
      // Jika sudah sampai "R", hentikan penghapusan
      isDeleting = false;
      setTimeout(type, pauseAfterDeleting);
    }
  };

  // Mulai proses mengetik
  type();
};

// Pastikan function dipanggil setelah halaman selesai dimuat
window.addEventListener("DOMContentLoaded", (event) => {
  typeAndDeleteText();
});

const SERVICE_ID = "service_x2sk17k";
const TEMPLATE_ID = "template_3m6hqwg";

// Inisialisasi EmailJS dengan Public Key
(function () {
  emailjs.init("SP7ySrYcrk1DNmKxz"); // Pastikan Public Key ini benar
})();

// Fungsi untuk menangani pengiriman form Contact Us
document
  .getElementById("contact-form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Mencegah submit default

    // Ambil nilai dari form
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    // Validasi form (opsional, tambahkan validasi sesuai kebutuhan)
    if (!name || !email.includes("@") || !message) {
      alert("Semua kolom harus diisi!");
      return;
    }

    // Siapkan data untuk dikirim via EmailJS
    const templateParams = {
      from_name: name,
      from_email: email,
      message: message,
    };
    console.log("Data yang dikirim:", templateParams);

    // Kirim email menggunakan EmailJS
    emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams).then(
      function (response) {
        alert("Pesan berhasil dikirim! Kami akan segera menghubungi Anda.");
        console.log("SUCCESS!", response.status, response.text);
      },
      function (error) {
        alert("Pengiriman pesan gagal. Mohon coba lagi nanti.");
        console.error("FAILED...", error); // Menampilkan error lebih detail
      }
    );

    // Reset form setelah pengiriman
    document.getElementById("contact-form").reset();
  });
