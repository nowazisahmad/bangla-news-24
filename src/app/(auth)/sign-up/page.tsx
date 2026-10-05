"use client";

import { signIn, signUp } from "@/lib/auth-client";
import { toast } from "react-toastify";

const SignUpPage = () => {
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const name = String(formData.get("name") || "").trim();

    const email = String(formData.get("email") || "")
      .trim()
      .toLowerCase();

    const password = String(formData.get("password") || "");

    console.log("NAME:", JSON.stringify(name));
    console.log("EMAIL:", JSON.stringify(email));

    const { data: resUser, error } = await signUp.email({
      name,
      email,
      password,
      callbackURL: "/",
    });

    console.log("SIGN UP DATA:", resUser);
    console.log("SIGN UP ERROR:", error);

    if (error) {
      toast.error("Something went wrong");
      return;
    }
    toast.success("Signup successful!");
  };
  const handleGoogleSignUp = async () => {
    await signIn.social({
      provider: "google",
    });
  };

  const handleGithubSignUp = async () => {
    await signIn.social({
      provider: "github",
    });
  };
  return (
    <div className="flex justify-center my-10">
      <form onSubmit={onSubmit}>
        <h2 className="text-3xl text-red-700 font-bold mb-3 flex justify-center">
          সাইন আপ
        </h2>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <label className="label">নাম</label>
          <input name="name" type="text" className="input" required />

          <label className="label">ইমেইল</label>
          <input name="email" type="email" className="input" required />

          <label className="label">পাসওয়ার্ড</label>
          <input
            name="password"
            type="password"
            className="input"
            required
            minLength={8}
          />

          <button type="submit" className="btn bg-red-700 text-white mt-4">
            সাইন আপ করুন
          </button>
        </fieldset>
      </form>

      <p className="flex justify-center font-bold my-4">অথবা</p>

      <div className="flex flex-col gap-3 w-full max-w-sm">
        <button onClick={handleGoogleSignUp} className="btn bg-red-700 text-white w-full">
          গুগল দিয়ে সাইন আপ করুন
        </button>
        <button onClick={handleGithubSignUp} className="btn bg-red-700 text-white w-full">
          গিটহাব দিয়ে সাইন আপ করুন
        </button>
      </div>
    </div>
  );
};

export default SignUpPage;
