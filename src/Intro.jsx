import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
} from "@clerk/clerk-react";

function Intro() {
  return (
    <div className="min-h-screen bg-slate-950 text-white cursor-default min-w-screen text-center flex flex-col justify-center items-center">
      <main className="flex-1 flex flex-col items-center justify-center px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">TodoTada</h1>
        <p className="text-neutral-400 max-w-md mb-6">
          Stay on top of your day with a fast, minimal task manager built just
          for you.
        </p>
        <p className="text-sm text-neutral-500 max-w-sm">
          Sign in to create tasks, sync them securely, and access them from
          anywhere.
        </p>
      </main>

      {/* Bottom auth buttons */}
      <div className="w-full px-4 pb-8 flex md:mt-20 flex-col items-center gap-3">
        <SignedOut>
          <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs">
            <SignInButton mode="modal">
              <button className="w-full rounded-full px-4 py-2 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-700 transition">
                Sign In
              </button>
            </SignInButton>

            <SignUpButton mode="modal">
              <button className="w-full rounded-full px-4 py-2 text-sm font-semibold bg-green-500 hover:bg-green-600 transition">
                Sign Up
              </button>
            </SignUpButton>
          </div>
        </SignedOut>
      </div>
    </div>
  );
}

export default Intro;
