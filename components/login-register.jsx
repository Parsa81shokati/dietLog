import React from "react";

function LOginRejister({ isRegister, handleSubmit, setIsRegister, setEmail }) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">
          {isRegister ? "ثبت نام" : "ورود"}
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="ایمیل"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="p-2 border rounded"
          />
          <input
            type="password"
            placeholder="رمز"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="p-2 border rounded"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          >
            {isRegister ? "ثبت نام" : "ورود"}
          </button>
        </form>
        <button
          className="mt-4 text-sm text-gray-500 hover:text-gray-700"
          onClick={() => setIsRegister(!isRegister)}
        >
          {isRegister ? "حساب داری؟ ورود" : "حساب نداری؟ ثبت نام"}
        </button>
      </div>
    </div>
  );
}

export default LOginRejister;
