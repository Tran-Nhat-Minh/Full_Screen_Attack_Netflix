// Lấy các phần tử
const modal = document.getElementById('student-list');
const overlay = document.getElementById('overlay');
const audio = document.getElementById('modal-audio');

// Hàm yêu cầu toàn màn hình
function requestFullScreen() {
    document.getElementById("spoofLink").classList.add("hidden");
    document.getElementById("main-content").classList.remove("hidden");
    if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().catch(err => {
            console.error("Không thể vào chế độ toàn màn hình:", err);
        });
    } else {
        console.warn("Trình duyệt không hỗ trợ Fullscreen API");
    }
}

// Gán sự kiện cho nút Netflix
const netflixButton = document.getElementById("netflixButton");
if (netflixButton) {
    netflixButton.onclick = function (event) {
        event.preventDefault();
        requestFullScreen();
    };
} else {
    console.error("Không tìm thấy nút #netflixButton");
}

// Mở modal khi nhấp vào main-content
const mainContent = document.getElementById("main-content");
if (mainContent) {
    mainContent.onclick = function (event) {
        overlay.classList.remove("hidden");
        modal.classList.remove("hidden");
        audio.play().catch(error => {
            console.log('Lỗi phát âm thanh:', error);
        });
    };
} else {
    console.error("Không tìm thấy #main-content");
}

// Hàm đóng modal
function closeModal() {
    if (overlay && modal) {
        overlay.classList.add("hidden");
        modal.classList.add("hidden");
        audio.pause();
        audio.currentTime = 0; // Đặt lại thời gian phát về 0
    } else {
        console.error("Không tìm thấy #overlay hoặc #student-list");
    }
}

// Sự kiện thay đổi trạng thái toàn màn hình
document.addEventListener("fullscreenchange", function () {
    if (!document.fullscreenElement) {
        closeModal();
        const spoofLink = document.getElementById("spoofLink");
        const mainContent = document.getElementById("main-content");
        if (spoofLink && mainContent) {
            spoofLink.classList.remove("hidden");
            mainContent.classList.add("hidden");
        } else {
            console.error("Không tìm thấy #spoofLink hoặc #main-content");
        }
    }
});

// Điều khiển thanh trượt
document.getElementById("prevBtn").addEventListener("click", function () {
    document.getElementById("slider").scrollBy({ left: -200, behavior: "smooth" });
});

document.getElementById("nextBtn").addEventListener("click", function () {
    document.getElementById("slider").scrollBy({ left: 200, behavior: "smooth" });
});

// Xử lý form email
const emailForms = document.querySelectorAll("form");
emailForms.forEach(form => {
    form.addEventListener("submit", function (e) {
        e.preventDefault();
        const email = form.querySelector("input[type='email']").value;
        console.log("Email đã nhập:", email);
    });
});
