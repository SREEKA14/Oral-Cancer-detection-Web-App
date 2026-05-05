export default function ForgotPassword() {
  return (
    <div className="min-h-screen bg-sky-50 flex justify-center items-center">
      <div className="bg-white p-10 rounded-3xl shadow-xl w-[420px]">
        <h2 className="text-3xl font-bold text-center text-sky-700 mb-6">
          Forgot Password
        </h2>

        <input
          placeholder="Enter Email"
          className="w-full border p-3 rounded-xl mb-4"
        />

        <button className="w-full bg-sky-600 text-white py-3 rounded-xl">
          Send Reset Link
        </button>

        <a
          href="/"
          className="block text-center mt-5 text-sky-600"
        >
          Back to Login
        </a>
      </div>
    </div>
  );
}