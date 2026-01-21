import { Dialog, Transition } from "@headlessui/react";
import {
  createContext,
  Dispatch,
  Fragment,
  ReactElement,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState
} from "react";

const defaultClasses = {
  rootClasses:
    "fixed flex flex-col justify-center items-center inset-0 z-50 overflow-y-auto",
  overlayClasses: "fixed inset-0 z-10 bg-black bg-opacity-30 cursor-pointer",
  dialogClasses:
    "asbolute z-50 flex justify-center flex-col items-center p-6 bg-transparent",
  overlayTransitionClasses: {
    enter: "ease-out duration-200",
    enterFrom: "opacity-0",
    enterTo: "opacity-100",
    leave: "ease-in duration-200",
    leaveFrom: "opacity-100",
    leaveTo: "opacity-0"
  },
  dialogTransitionClasses: {
    enter: "ease-out duration-300",
    enterFrom: "opacity-0 scale-0",
    enterTo: "opacity-100 scale-100",
    leave: "ease-in duration-300",
    leaveFrom: "opacity-100 scale-100",
    leaveTo: "opacity-0 scale-0"
  }
};

const Context = createContext<{
  state: [ReactNode, Dispatch<SetStateAction<ReactNode>>];
  config: [
    Partial<typeof defaultClasses>,
    Dispatch<SetStateAction<Partial<typeof defaultClasses>>>
  ];
} | null>(null);
export function useHeadlessuiDialog(
  config?: Omit<Partial<typeof defaultClasses>, "useRoot">
) {
  const ctx = useContext(Context);
  if (!ctx) throw new Error("Undefined");
  const {
    config: [, setConfig],
    state: [body, setBody]
  } = ctx;
  useEffect(() => {
    if (config) {
      setConfig((prev) => ({ ...prev, ...config }));
    }
  }, [config]);
  return {
    opened: !!body,
    create: (element: ReactElement) => setBody(element),
    destroy: () => setBody(null)
  };
}

export const UseHeadlessuiDialogComponent = () => {
  const ctx = useContext(Context);
  if (!ctx) throw new Error("Undefined");
  const {
    config: [config],
    state: [body, setBody]
  } = ctx;
  return (
    <Transition appear show={!!body} as={Fragment}>
      <Dialog
        as="div"
        onClose={() => setBody(null)}
        className={config.rootClasses}
      >
        <Transition.Child as={Fragment} {...config.overlayTransitionClasses}>
          <Dialog.Overlay
            className={config.overlayClasses}
            onClick={() => setBody(null)}
          />
        </Transition.Child>
        <Transition.Child as={Fragment} {...config.dialogTransitionClasses}>
          <div className={config.dialogClasses}>{body}</div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};

export function UseHeadlessuiDialogContextProvider(props: {
  children: ReactElement;
  config?: Partial<typeof defaultClasses> & { useRoot?: boolean };
}) {
  let config = useState({ ...defaultClasses, ...(props.config || {}) });
  let state = useState();
  return (
    <Context.Provider value={{ state, config }}>
      {props.children}
      {props.config?.useRoot && <UseHeadlessuiDialogComponent />}
    </Context.Provider>
  );
}
