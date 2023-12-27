import Cookies from "js-cookie";

const token = Cookies.get("accessToken");
const headers = {
   Authorization: `Bearer ${token}`,
    //   "Content-Type": "application/json",
};
export default headers