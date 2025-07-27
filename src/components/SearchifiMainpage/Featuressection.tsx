import { CloudArrowUpIcon, CpuChipIcon, WrenchScrewdriverIcon,
  CodeBracketSquareIcon,
  PlayCircleIcon,
  RocketLaunchIcon, } from '@heroicons/react/20/solid'

const features = [
  {
    name: 'Upload Projects Instantly.',
    description:
      'Share full web apps, components, and UI kits with the world in just a few clicks.',
    icon: CloudArrowUpIcon,
  },
  {
    name: 'AI Website Generator.',
    description:
      'Generate fully responsive websites with the power of AI — custom-built from your prompts.',
    icon: CpuChipIcon,
  },
  {
    name: 'No-Code Site Builder.',
    description:
      'Design beautiful websites visually using our drag-and-drop builder — no coding required.',
    icon: WrenchScrewdriverIcon,
  },
  {
    name: 'Built-in API Tester.',
    description:
      'Test your APIs inside Searchifi with our Postman-style interface — fast, simple, and secure.',
    icon: CodeBracketSquareIcon,
  },
  {
    name: 'Developer Roadmaps & Videos.',
    description:
      'Explore curated roadmaps and tutorials to level up your dev journey, plus in-depth video guides.',
    icon: PlayCircleIcon,
  },
  {
    name: '1-Click Deployment (Coming Soon).',
    description:
      'Deploy your frontend apps with a single click — blazing fast and Netlify-style simplicity.',
    icon: RocketLaunchIcon,
  },
];
export default function Example() {
  return (
    <div className="overflow-hidden bg-black  py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pt-4 lg:pr-8">
            <div className="lg:max-w-lg">
              <h2 className="text-base/7 -mt-8 font-semibold text-violet-600">The Developers Hub</h2>
              <p className="mt-2 w-[900px] z-50 text-4xl font-light tracking-tight text-pretty text-white sm:text-8xl">
                A better workflow
              </p>

              <dl className="mt-10 max-w-xl space-y-8 text-base/7 text-white lg:max-w-none">
                {features.map((feature) => (
                  <div key={feature.name} className="relative pl-9">
                    <dt className="inline font-semibold text-white">
                      <feature.icon aria-hidden="true" className="absolute top-1 left-1 size-5 text-violet-600" />
                      {feature.name}
                    </dt>{' '}
                    <dd className="inline">{feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          {/* Image with Text Overlay */}
          <div className="relative z-10 mt-36 -ml-5">
            <img
              alt="Product screenshot"
              src="/Add a little bit of body text.png"
              width={1000}
              height={542}
              className="w-3xl max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-228 md:-ml-4 lg:-ml-0"
            />

            {/* Overlay text */}
          </div>
        </div>
      </div>
    </div>
  )
}
