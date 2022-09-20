import { Transition } from '@headlessui/react'
import { Ping } from '@uiball/loaders'

export type LoadingStateProps = {
  show?: boolean
}

const LoadingState: React.FC<LoadingStateProps> = ({ show = false }) => {
  return (
    <div className="fixed z-50">
      <Transition
        as="div"
        show={show}
        appear
        enter="transition-opacity duration-200"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="backdrop-blur-sm h-screen w-full fixed inset-0 bg-transparent flex flex-col items-center justify-center">
          <Ping size={65} speed={2} color="gray" />
        </div>
      </Transition>
    </div>
  )
}

export default LoadingState
