import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-white px-4 pt-16 pb-8 border-t border-slate-100">
      <div className="container mx-auto max-w-[1100px]">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          <div className="lg:col-span-4 pr-0 lg:pr-8 flex flex-col">
            <div className="flex items-center gap-2 font-bold text-[22px] tracking-tight mb-5">
              <img
                src="/blue-logo-trimed.png"
                alt="mb"
                className="w-full object-contain"
              />
            </div>
            <p className="text-slate-500 leading-relaxed mb-12 text-[15px]">
              Transform your backend development career with our proven Learn →
              Build → Grow methodology. Join thousands of developers who have
              successfully landed their dream jobs.
            </p>
            <div className="space-y-3 mt-auto">
              <div className="flex gap-3">
                <input
                  type="email"
                  placeholder="example@email.com"
                  className="w-full md:w-auto flex-1 px-4 py-3 rounded-lg border border-slate-300 text-sm focus:outline-none focus:border-[#0B152A] focus:ring-1 focus:ring-[#0B152A] transition-colors"
                />
                <button className="px-6 py-3 bg-[#111827] text-white text-[15px] font-medium rounded-lg hover:bg-slate-800 transition-colors whitespace-nowrap">
                  <a href="https://backendweekly.dev" target="_blank">
                    Subscribe
                  </a>
                </button>
              </div>
              <p className="text-[14.5px] text-slate-500">
                Get weekly tips, project ideas, and career advice
              </p>
            </div>
          </div>

          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12 lg:gap-4 lg:ml-12 pt-2">
            <div className="flex flex-col">
              <h3 className="font-bold text-[17px] text-[#0B152A] mb-7">
                Learn
              </h3>
              <ul className="space-y-5 text-[15px] text-[#0B152A]/80 font-medium">
                <li>
                  <a
                    href="https://courses.masteringbackend.com"
                    className="hover:text-[#13AECE] transition-colors"
                  >
                    Courses
                  </a>
                </li>
                <li>
                  <a
                    href="https://academy.masteringbackend.com"
                    className="hover:text-[#13AECE] transition-colors"
                  >
                    Bootcamps
                  </a>
                </li>

                <li>
                  <a
                    href="https://courses.masteringbackend.com"
                    className="hover:text-[#13AECE] transition-colors"
                  >
                    Learning Paths
                  </a>
                </li>
              </ul>
            </div>
            <div className="flex flex-col">
              <h3 className="font-bold text-[17px] text-[#0B152A] mb-7">
                Build
              </h3>
              <ul className="space-y-5 text-[15px] text-[#0B152A]/80 font-medium">
                <li>
                  <a
                    href="https://projects.masteringbackend.com"
                    className="hover:text-[#13AECE] transition-colors"
                  >
                    MB Projects
                  </a>
                </li>
                <li>
                  <Link
                    href="https://python30.masteringbackend.com/project30"
                    className="hover:text-[#13AECE] transition-colors"
                  >
                    Project30
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#13AECE] transition-colors"
                  >
                    MB Lands
                  </Link>
                </li>
              </ul>
            </div>
            <div className="flex flex-col">
              <h3 className="font-bold text-[17px] text-[#0B152A] mb-7">
                Grow
              </h3>
              <ul className="space-y-5 text-[15px] text-[#0B152A]/80 font-medium">
                <li>
                  <Link
                    href="https://masteringbackend.com/interviews"
                    className="hover:text-[#13AECE] transition-colors"
                  >
                    Mock Interviews
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#13AECE] transition-colors"
                  >
                    Certifications
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://masteringbackend.com/community"
                    className="hover:text-[#13AECE] transition-colors"
                  >
                    Community
                  </Link>
                </li>
              </ul>
            </div>
            <div className="flex flex-col">
              <h3 className="font-bold text-[17px] text-[#0B152A] mb-7">
                Company
              </h3>
              <ul className="space-y-5 text-[15px] text-[#0B152A]/80 font-medium">
                <li>
                  <Link
                    href="https://masteringbackend.com/about"
                    className="hover:text-[#13AECE] transition-colors"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://blog.masteringbackend.com"
                    className="hover:text-[#13AECE] transition-colors"
                  >
                    Blog
                  </Link>
                </li>

                <li>
                  <Link
                    href="https://masteringbackend.com/contact"
                    className="hover:text-[#13AECE] transition-colors"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-6 text-[15px] font-medium text-[#0B152A]">
          <p>
            &copy; {new Date().getFullYear()} Masteringbackend. All Rights
            Reserved.
          </p>
          <div className="flex items-center flex-wrap justify-center gap-x-12 gap-y-4">
            <Link
              href="https://masteringbackend.com/privacy-policy"
              className="hover:text-[#13AECE] transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="https://masteringbackend.com/disclaimer"
              className="hover:text-[#13AECE] transition-colors"
            >
              Disclaimer
            </Link>
            <Link
              href="https://masteringbackend.com/terms-and-conditions"
              className="hover:text-[#13AECE] transition-colors"
            >
              Terms Of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
