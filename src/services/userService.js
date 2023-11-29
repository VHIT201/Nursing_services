import axios from "axios"

export const loginUser = async (data) => {
  try {
      const response = await fetch('https://nursing-app-api.vercel.app/api/v1/users/login', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
      });

      if (!response.ok) {
          // Xử lý lỗi khi trả về mã lỗi HTTP không thành công (ví dụ: 404, 500)
          throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log(responseData);
  } catch (error) {
      // Xử lý lỗi nếu có
      console.error('Fetch Error:', error);
  }
}

export const registerUser = async (registerData) => {

    try {
      // console.log(registerData)
      const res = await axios.post(`https://nursing-app-api.vercel.app/api/v1/users/register`,registerData);
      return res.data;
    } catch (error) {
      console.error(error);
      throw error; 
    }
  };


