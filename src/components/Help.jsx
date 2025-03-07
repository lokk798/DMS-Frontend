import { Link } from "react-router-dom";
import BrandSection from "./BrandSection";

export { HelpUI };

function HelpUI() {
  return (
    <div className="flex min-h-screen">
      {/* Left Side - Brand Section */}
      <BrandSection />

      {/* Right Side - Help Content */}
      <div className="w-full md:w-3/5 bg-gradient-to-br from-gray-50 to-slate-100 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Mobile Logo (visible only on small screens) */}
          <div className="md:hidden w-12 h-12 rounded-xl bg-indigo-600 mx-auto mb-6 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
              />
            </svg>
          </div>

          {/* Help Container */}
          <div className="bg-white/90 backdrop-blur-sm shadow-xl rounded-2xl p-8 border border-white/20">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold text-slate-800">
                Help & Support
              </h2>
              <p className="text-slate-500 mt-2">
                How can we assist you today?
              </p>
            </div>

            {/* Help Options */}
            <div className="space-y-6">
              {/* FAQ Section */}
              <div className="bg-slate-50/50 rounded-xl p-5 border border-slate-200">
                <div className="flex items-start">
                  <div className="bg-indigo-100 p-2 rounded-lg mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-indigo-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-slate-800 text-lg mb-1">
                      Frequently Asked Questions
                    </h3>
                    <p className="text-slate-600 text-sm">
                      Find answers to the most common questions about our
                      platform.
                    </p>
                    <Link
                      to="../faq"
                      className="inline-block text-sm text-indigo-600 hover:text-indigo-800 font-medium mt-2"
                    >
                      View FAQs →
                    </Link>
                  </div>
                </div>
              </div>

              {/* Documentation Section */}
              <div className="bg-slate-50/50 rounded-xl p-5 border border-slate-200">
                <div className="flex items-start">
                  <div className="bg-indigo-100 p-2 rounded-lg mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-indigo-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-slate-800 text-lg mb-1">
                      Documentation
                    </h3>
                    <p className="text-slate-600 text-sm">
                      Detailed guides and technical documentation for all
                      features.
                    </p>
                    <Link
                      to="../docs"
                      className="inline-block text-sm text-indigo-600 hover:text-indigo-800 font-medium mt-2"
                    >
                      Browse Docs →
                    </Link>
                  </div>
                </div>
              </div>

              {/* Contact Support Section */}
              <div className="bg-slate-50/50 rounded-xl p-5 border border-slate-200">
                <div className="flex items-start">
                  <div className="bg-indigo-100 p-2 rounded-lg mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-indigo-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-slate-800 text-lg mb-1">
                      Contact Support
                    </h3>
                    <p className="text-slate-600 text-sm">
                      Our support team is available 24/7 to assist you.
                    </p>
                    <Link
                      to="../contact"
                      className="inline-block text-sm text-indigo-600 hover:text-indigo-800 font-medium mt-2"
                    >
                      Get Support →
                    </Link>
                  </div>
                </div>
              </div>

              {/* Back to Login Button */}
              <Link
                to="../login"
                className="w-full flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-xl shadow-lg hover:shadow-indigo-500/30 transform hover:-translate-y-0.5 transition-all duration-200"
              >
                Back to Login
              </Link>
            </div>
          </div>

          {/* Security note */}
          <div className="text-center mt-6 text-xs text-slate-500">
            <p>© 2025 Enterprise DMS • All rights reserved</p>
          </div>
        </div>
      </div>
    </div>
  );
}
