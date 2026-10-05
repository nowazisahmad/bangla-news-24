"use client";

import { signIn } from "@/lib/auth-client";
import { toast } from "react-toastify";

const SignInPage = () => {
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = String(formData.get("email") || "").trim().toLowerCase();
    const password = String(formData.get("password") || "");

    const { data: resUser, error } = await signIn.email({
      email,
      password,
      callbackURL: "/",
    });

    console.log("SIGN IN DATA:", resUser);
    console.log("SIGN IN ERROR:", error);

    if (error) {
      toast.error("Something went wrong");
      return;
    }

    toast.success("SignIn successful!");
  };

  const handleGoogleSignIn = async () => {
    await signIn.social({
      provider: "google",
    });
  };

  const handleGithubSignIn = async () => {
    await signIn.social({
      provider: "github",
    });
  };

  return (
    <div className="flex flex-col items-center justify-center my-10">
      <form onSubmit={onSubmit} className="w-full max-w-sm">
        <h2 className="text-3xl text-red-700 font-bold mb-3 flex justify-center">
          সাইন ইন
        </h2>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4">
          <label className="label">ইমেইল</label>
          <input name="email" type="email" className="input w-full" />

          <label className="label">পাসওয়ার্ড</label>
          <input name="password" type="password" className="input w-full" />

          <button type="submit" className="btn bg-red-700 text-white mt-4 w-full">
            সাইন ইন করুন
          </button>
        </fieldset>
      </form>

      <p className="flex justify-center font-bold my-4">অথবা</p>

      <div className="flex flex-col gap-3 w-full max-w-sm">
        <button onClick={handleGoogleSignIn} className="btn bg-red-700 text-white w-full">
          গুগল দিয়ে সাইন ইন করুন
        </button>
        <button onClick={handleGithubSignIn} className="btn bg-red-700 text-white w-full">
          গিটহাব দিয়ে সাইন ইন করুন
        </button>
      </div>
    </div>
  );
};

export default SignInPage;
