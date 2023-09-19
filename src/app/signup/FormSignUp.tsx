import Information from "./Information";

const FormSignUp = () => {
  return (
    <form className="w-full p-3">
      <input
        type="text"
        placeholder="Mobile Number or email"
        className="w-full p-2 bg-[#fafafa] rounded-sm text-sm border mb-2"
      />
      <input
        type="text"
        placeholder="Full name"
        className="w-full p-2 bg-[#fafafa] rounded-sm text-sm border mb-2"
      />
      <input
        type="text"
        placeholder="Username"
        className="w-full p-2 bg-[#fafafa] rounded-sm text-sm border mb-2"
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full p-2 bg-[#fafafa] rounded-sm text-sm border mb-2"
      />
      <Information />
      <button className="w-full p-1 rounded bg-[#4CB5F9] text-white text-center my-2">
        Sign up
      </button>
    </form>
  );
};

export default FormSignUp;
