function login() {
    const loginForm = document.querySelector('#form-login');
    console.log(loginForm);
// Lắng nghe sự kiện submit của form
loginForm.addEventListener('submit', (event) => {
  event.preventDefault(); // Ngăn chặn hành vi mặc định của form

  // Lấy dữ liệu từ các trường input
  const username = loginForm.querySelector('input[name="user"]').value;
  const password = loginForm.querySelector('input[name="pass"]').value;
  console.log('username', username, password);
  // Tiếp tục xử lý dữ liệu
  handleLogin(username, password);
});


}

let userData;
function handleLogin(username, password) {
  fetch('db.json')
    .then(response => response.json())
    .then(data => {
      // Tìm kiếm user trong dữ liệu
      const user = data.users.find(users => users.name === username && users.password === password);
      if (user) {
        // Kiểm tra trạng thái tài khoản
        if (user.status === 'Passive') {
          // Hiển thị thông báo tài khoản bị khóa
          alert("Your account is block!")
          return;
        }

        // Lưu thông tin user vào session storage
        sessionStorage.setItem('user', JSON.stringify(user));
        // Lấy dữ liệu người dùng từ session storage
        userData = JSON.parse(sessionStorage.getItem('user'));
        console.log('oke');

        // Kiểm tra vai trò của người dùng
        if (userData.role === 'admin') {
          // Chuyển hướng đến trang admin
          alert("Đăng nhập thành công!")
          window.location.href = './client/admin/index.html';
        } else {
          // Chuyển hướng đến trang client
          alert("Đăng nhập thành công!")
          window.location.href = './client/index.html';
        }
      } else {
        // Hiển thị thông báo lỗi
        let errorElement = loginForm.querySelector('.error-user');
        console.log('lỗi');
        errorElement.innerText = 'Invalid username or password';
        window.location.href = "index.html?a=b";
      }
    })
    .catch(error => {
      console.log('not found');
      let errorElement = document.querySelector('.error-user');
      errorElement.innerText = 'Invalid username or password';
    });
}