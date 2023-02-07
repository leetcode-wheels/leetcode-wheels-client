import {
  CloudArrowUpIcon,
  LockClosedIcon,
  ServerIcon,
} from '@heroicons/react/20/solid'

type Feature = {
  name: string
  description: string
  icon(props: React.ComponentProps<'svg'>): JSX.Element
}

const features: Feature[] = [
  {
    name: 'Basic Leetcode funcionalities (Coming soon).',
    description:
      'Of course you can do most thing you normally do on Leetcode. Like solving problems, visiting user profiles, participating in contests, etc.',
    icon: CloudArrowUpIcon,
  },
  {
    name: '1 vs 1 Comparison (Coming soon).',
    description:
      'You can compare Leetcode users based on rating, problems solved, points, etc.',
    icon: LockClosedIcon,
  },
  {
    name: 'Better user profiles information (Coming soon).',
    description:
      'The profile page for users provides a more detailed view, with not only basic user details information but also some other useful metadata that describes more accurately to the user',
    icon: ServerIcon,
  },
  {
    name: 'Basic Leetcode funcionalities (Coming soon).',
    description:
      'Of course you can do most thing you normally do on Leetcode. Like solving problems, visiting user profiles, participating in contests, etc.',
    icon: CloudArrowUpIcon,
  },
  {
    name: '1 vs 1 Comparison (Coming soon).',
    description:
      'You can compare Leetcode users based on rating, problems solved, points, etc.',
    icon: LockClosedIcon,
  },
  {
    name: 'Better user profiles information (Coming soon).',
    description:
      'The profile page for users provides a more detailed view, with not only basic user details information but also some other useful metadata that describes more accurately to the user',
    icon: ServerIcon,
  },
]

const Features: React.FC = () => {
  return (
    <section id="features" className="py-2 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl sm:text-center">
          <h2 className="text-lg font-semibold leading-8 tracking-tight text-indigo-400">
            Everything you need
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            No server? No problem.
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores
            impedit perferendis suscipit eaque, iste dolor cupiditate
            blanditiis.
          </p>
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-7xl px-6 sm:mt-20 md:mt-24 lg:px-8">
        <dl className="mx-auto grid max-w-2xl grid-cols-1 gap-x-6 gap-y-10 text-base leading-7 text-gray-300 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16">
          {features.map((feature) => (
            <div key={feature.name} className="relative pl-9">
              <dt className="inline font-semibold text-white">
                <feature.icon
                  className="absolute top-1 left-1 h-5 w-5 text-indigo-500"
                  aria-hidden="true"
                />
                {feature.name}
              </dt>{' '}
              <dd className="inline">{feature.description}</dd>
            </div>
          ))}
        </dl>
      </div>
      <svg
        className="pointer-events-none absolute top-1/2 left-12 -z-10 h-[42.375rem] -translate-y-1/2 transform-gpu blur-3xl lg:top-auto lg:bottom-[-12rem] lg:translate-y-0"
        viewBox="0 0 1155 678"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="url(#c0458c57-1330-459f-9d5c-f0d75c210466)"
          fillOpacity=".25"
          d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
        />
        <defs>
          <linearGradient
            id="c0458c57-1330-459f-9d5c-f0d75c210466"
            x1="1155.49"
            x2="-78.208"
            y1=".177"
            y2="474.645"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#9089FC" />
            <stop offset={1} stopColor="#FF80B5" />
          </linearGradient>
        </defs>
      </svg>
    </section>
  )
}

export default Features
