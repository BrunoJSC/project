import { Dialog, Disclosure, Popover, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/20/solid";
import { signOut } from "firebase/auth";
import { BikeIcon, CarIcon, ChevronDownIcon, Move3dIcon } from "lucide-react";
import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase";

const pages = [
  { name: "Carros", href: "/criar-carro", icon: CarIcon },
  { name: "Motos", href: "/create-bikes", icon: BikeIcon },
  { name: "Repasse", href: "/create-transfer", icon: Move3dIcon },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("Logout");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <header className="bg-black">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link to="/dashboard" className="-m-1.5 p-1.5 flex items-center">
            <CarIcon className="text-green-500" size={32} />
            <span className="ml-2 text-xl font-bold tracking-wide text-white">
              Admin
            </span>
          </Link>
        </div>

        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6 text-white" aria-hidden="true" />
          </button>
        </div>

        <Popover.Group className="hidden lg:flex lg:gap-x-12">
          <Popover className="relative">
            <Popover.Button className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-white">
              <span>Veículos</span>
              <ChevronDownIcon
                className="h-5 w-5 flex-none text-gray-400"
                aria-hidden="true"
              />
            </Popover.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                <div className="p-4">
                  {pages.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="flex items-center gap-x-2 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100 rounded-md p-2.5"
                    >
                      <item.icon className="h-5 w-5 flex-none text-gray-400" />
                      <span>{item.name}</span>
                    </Link>
                  ))}
                </div>
              </Popover.Panel>
            </Transition>
          </Popover>
        </Popover.Group>

        <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:gap-x-12">
          <button
            type="button"
            className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-white"
            onClick={handleSignOut}
          >
            <span>Sair</span>
          </button>
        </div>
      </nav>

      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-black px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-green-900">
          <div className="flex items-center justify-between">
            <Link to="/dashboard" className="-m-1.5 p-1.5 flex items-center">
              <CarIcon className="text-green-500" size={32} />
              <span className="ml-2 text-xl font-bold tracking-wide text-white">
                Admin
              </span>
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
            </button>
          </div>

          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Disclosure as="div" className="-mx-3">
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="flex items-center justify-between w-full px-3 py-2 text-sm font-medium leading-6 text-white rounded-md hover:bg-green-500 focus:outline-none focus-visible:ring focus-visible:ring-green-900 focus-visible:ring-opacity-75">
                        <span>Veículos</span>
                        <ChevronDownIcon
                          className={`${
                            open ? "transform rotate-180" : ""
                          } w-5 h-5 text-white`}
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className="px-3 pt-2 pb-4 space-y-1">
                        <Link
                          to="/dashboard"
                          className="flex items-center gap-x-2 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100 rounded-md p-2.5"
                        >
                          <span>Dashboard</span>
                        </Link>
                        {pages.map((item) => (
                          <Link
                            key={item.name}
                            to={item.href}
                            className="flex items-center gap-x-2 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100 rounded-md p-2.5"
                          >
                            <item.icon className="h-5 w-5 flex-none text-green-700" />
                            <span className="text-white">{item.name}</span>
                          </Link>
                        ))}
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
                <div className="flex items-center gap-x-2 text-sm font-semibold leading-6 text-white absolute bottom-0">
                  <button
                    type="button"
                    className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-white"
                    onClick={handleSignOut}
                  >
                    <span>Sair</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
