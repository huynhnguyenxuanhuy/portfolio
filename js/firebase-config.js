import { db, collection, query, where, getDocs } from "./firebase-config.js";

async function loginAdmin() {
    // Lấy giá trị từ các ô nhập trong HTML
    const userInp = document.getElementById('username');
    const passInp = document.getElementById('password');

    if (!userInp || !passInp) {
        console.error("Lỗi: Không tìm thấy ID 'username' hoặc 'password' trong HTML.");
        return;
    }

    const username = userInp.value;
    const password = passInp.value;

    try {
        // Tìm trong bảng 'admins' xem có tài khoản nào khớp không
        const q = query(collection(db, "admins"), 
                        where("username", "==", username), 
                        where("password", "==", password));
        
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            alert("Đăng nhập thành công!");
            // Lưu trạng thái để biết đã đăng nhập
            localStorage.setItem("isAdmin", "true");
            // Chuyển hướng sang trang quản trị
            window.location.href = "admin.html"; 
        } else {
            alert("Sai tài khoản hoặc mật khẩu rồi ba ơi!");
        }
    } catch (error) {
        console.error("Lỗi kết nối Firebase:", error);
        alert("Không kết nối được database. Hãy kiểm tra lại phần Rules trên Firebase.");
    }
}

// Chờ HTML load xong mới gán sự kiện cho nút bấm
document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.getElementById('loginBtn');
    if (loginBtn) {
        loginBtn.addEventListener('click', (e) => {
            e.preventDefault(); // Ngăn trang web load lại khi bấm nút
            loginAdmin();
        });
    } else {
        console.error("Lỗi: Không tìm thấy ID 'loginBtn' trên trang này.");
    }
});