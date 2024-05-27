import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import { BsDiscord, BsFacebook, BsGithub } from "react-icons/bs";

export default function FooterComp() {
  return (
    <Footer
      container
      className="border border-t-8 dark:border-slate-500 border-slate-700"
    >
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid w-full justify-between sm:flex md:grid-cols">
          <div className="mt-5">
            <Link
              to="/"
              className="self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white"
            >
              <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-md">
                Reactive
              </span>
              Blog
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <Footer.Title title="About" />
              <Footer.LinkGroup col>
                <Footer.Link href="#">About</Footer.Link>
                <Footer.Link href="#">More about us</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Follow Us" />
              <Footer.LinkGroup col>
                <Footer.Link href="https://github.com/s4zgard">
                  Github
                </Footer.Link>
                <Footer.Link href="https://discord.com/users/s4zgard#3619">
                  Discord
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Legal" />
              <Footer.LinkGroup col>
                <Footer.Link href="#">Privacy Policy</Footer.Link>
                <Footer.Link href="#">Terms & Condition</Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright
            href="https://github.com/s4zgard"
            by="Sajjad Ahmed"
            year={new Date().getFullYear()}
          />
          <div className="flex gap-6 sm:mt-0 mt-4 ">
            <Footer.Icon
              href="https://facebook.com/s4zgard"
              icon={BsFacebook}
            />
            <Footer.Icon
              href="https://discord.com/users/s4zgard#3619"
              icon={BsDiscord}
            />
            <Footer.Icon href="https://github.com/s4zgard" icon={BsGithub} />
          </div>
        </div>
      </div>
    </Footer>
  );
}
