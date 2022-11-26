import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar({
  pelisPuntuadas,
  pelisPopulares,
  pelisProx,
  busqueda,
  setInput,
}) {
  const navigation = [
    { name: "Populares", fn: pelisPopulares, current: true },
    { name: "Mejor Puntuadas", fn: pelisPuntuadas, current: false },
    { name: "Estrenos", fn: pelisProx, current: false },
  ];
  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="block h-8 w-auto lg:hidden"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                    alt="Your Company"
                  />
                  <img
                    className="hidden h-8 w-auto lg:block"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                    alt="Your Company"
                  />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-1 align-center justify-center">
                    {navigation.map((item) => (
                      <li
                        key={item.name}
                        onClick={item.fn}
                        className={classNames(
                          item.current
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "px-3 py-2 rounded-md text-sm font-medium list-none"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </li>
                    ))}
                    <form onSubmit={busqueda} className="text-gray-300">
                      <input
                        onChange={(e) => setInput(e.target.value)}
                        className="bg-white w-28 sm:w-36 md:w-64 lg:w-96 border-none mr-2 py-2 px-2 rounded-sm leading-tight focus:outline-none"
                        type="text"
                        placeholder="Search"
                      />
                      <button className="border p-1" type="submit">
                        Buscar
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  onClick={item.fn}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block px-3 py-2 rounded-md text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
              <form onSubmit={busqueda} className="text-gray-300">
                <input
                  onChange={(e) => setInput(e.target.value)}
                  className="bg-white w-6/12 border-none mx-2 py-2 px-2 rounded-sm leading-tight focus:outline-none"
                  type="text"
                  placeholder="Search"
                />
                <button className="border p-1" type="submit">
                  Buscar
                </button>
              </form>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
