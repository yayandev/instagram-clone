import { FaFacebook } from "react-icons/fa6";

const FacebookButtonLogin = () => {
  return (
    <div className="p-3">
      <button className="w-full p-1 rounded bg-[#0095f6] font-semibold text-white flex justify-center items-center gap-2 my-2">
        <FaFacebook /> <span>Log in with Facebook</span>
      </button>
    </div>
  );
};

export default FacebookButtonLogin;
