import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Image from '../assets/a9fe655d796d4e04a201cfdcbe523855-free.png'

const navigation = [
  { name: 'Home', href: '/', current: false },
  { name: 'Features', href: '#features', current: false },
  { name: 'How to use', href: '#how-it-works', current: false },
];

const services = [
  { name: 'Crop Recommendation', href: '/predict_crop' },
  { name: 'Disease Prediction', href: '/api/disease-prediction' },
  { name: 'Fertilizer Prediction', href: '/api/predict-fertilizer' },
  {name: 'Weather Prediction',href:'/predict-weather'},
];
const premium=[
  { name:"Government Policies",href:'/gov-policies'},
  { name:"Market Trends",href:'/market-trends'}
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
  return (
    <Disclosure as="nav" className="fixed top-0 left-0 right-0 z-50" style={{ backgroundColor: "#4DA131" }}>
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          {/* Mobile menu button */}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                aria-hidden="true"
                className="block size-6 group-data-[open]:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden size-6 group-data-[open]:block"
              />
            </DisclosureButton>
          </div>

          {/* Logo and Navigation */}
          <div className="flex flex-1 items-center sm:items-center sm:justify-between">
            {/* Logo */}
            <div className="flex items-center h-full">
              <img
                alt="SmartFarm"
                src={Image}
                className="h-16 w-auto object-contain"
              />
            </div>

            {/* Centered Navigation */}
            <div className="hidden sm:ml-6 sm:block flex-1">
              <div className="flex justify-center items-center space-x-4 h-full">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    aria-current={item.current ? "page" : undefined}
                    className={classNames(
                      item.current
                        ? "bg-gray-900 text-white"
                        : "text-white text-lg hover:bg-gray-900 hover:text-white",
                      "rounded-md px-3 py-2 flex items-center text-lg font-medium transition-all duration-300"
                    )}
                  >
                    {item.name}
                  </a>
                ))}
                
                {/* Services Accordion */}
                <Disclosure>
                  {({ open }) => (
                    <>
                      <DisclosureButton className="text-white text-lg flex items-center space-x-2 hover:bg-gray-900 hover:text-white rounded-md px-3 py-2">
                        <span>Services</span>
                        <svg
                          className={`h-4 w-4 transform transition-transform ${
                            open ? "rotate-180" : "rotate-0"
                          }`}
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </DisclosureButton>
                      <DisclosurePanel className="mt-32 space-y-1 bg-white rounded-md p-3">
                        {services.map((service) => (
                          <a
                            key={service.name}
                            href={service.href}
                            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                          >
                            {service.name}
                          </a>
                        ))}
                      </DisclosurePanel>
                    </>
                  )}
                </Disclosure>
                {/* Premium */}
                <Disclosure>
                  {({ open }) => (
                    <>
                      <DisclosureButton className="text-white text-lg flex items-center space-x-2 hover:bg-gray-900 hover:text-white rounded-md px-3 py-2">
                        <span>Premium</span>
                        <svg
                          className={`h-4 w-4 transform transition-transform ${
                            open ? "rotate-180" : "rotate-0"
                          }`}
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </DisclosureButton>
                      <DisclosurePanel className="mt-32 space-y-1 bg-white rounded-md p-3">
                        {premium.map((premium) => (
                          <a
                            key={premium.name}
                            href={premium.href}
                            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                          >
                            {premium.name}
                          </a>
                        ))}
                      </DisclosurePanel>
                    </>
                  )}
                </Disclosure>
              </div>
            </div>
          </div>

          {/* Profile & Notifications */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button
              type="button"
              className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <span className="sr-only">View notifications</span>
              <BellIcon aria-hidden="true" className="size-6" />
            </button>

            <Menu as="div" className="relative ml-3">
              <div>
                <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span className="sr-only">Open user menu</span>
                  <img
                    alt=""
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    className="size-8 rounded-full"
                  />
                </MenuButton>
              </div>
              <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none">
                <MenuItem>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Your Profile
                  </a>
                </MenuItem>
                <MenuItem>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Settings
                  </a>
                </MenuItem>
                <MenuItem>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Sign out
                  </a>
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>
    </Disclosure>
  );
}
