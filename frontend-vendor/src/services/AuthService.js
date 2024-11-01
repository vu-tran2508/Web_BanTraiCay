import axios from "axios";

const AUTH_URL = "http://localhost:8080/api/v1/auth/";


class AuthService {

    login(user) {
        console.log("THONG TIN NHẬP", user);
        return axios.post(AUTH_URL + "login", user)
            .then(response => {
                return response;
            })
            .catch(error => {
                console.error("LỖI ĐĂNG NHẬP", error);
                if (error.response) {
                    console.error("THÔNG BÁO LỖI TỪ SERVER", error.response);
                }
                throw error;
            });
    }

    logout() {
        localStorage.removeItem("user");
        localStorage.removeItem("account");
    }

  
    register(user){
        return axios.post(AUTH_URL + "signup", user);
    }

    getUserLogin() {
        try {
            const response = this.getCurrentUser();
            const email = response.email;
            if (!email) {
                // Xử lý khi không có email trong phản hồi
                console.error('Không có email trong phản hồi getCurrentUser().');
                return null;
            }
            const url = `account/${email}`;
            return axios.get(AUTH_URL+url);
        } catch (error) {
            // Xử lý lỗi nếu có
            console.error('Lỗi khi gọi API để lấy thông tin người dùng đăng nhập.', error);
            throw error; // hoặc trả về một giá trị mặc định hoặc rỗng tùy vào yêu cầu của bạn
        }
    }
    

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));
    }
}

export default new AuthService();