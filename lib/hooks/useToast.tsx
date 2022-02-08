import { Portal, Transition } from "@headlessui/react";
import clsx from "clsx";
import {
  createContext,
  Dispatch,
  ReactElement,
  SetStateAction,
  useContext,
  useState
} from "react";

export const enum ToastType {
  DEFAULT = "default",
  ERROR = "error",
  WARNING = "warning",
  SUCCESS = "success"
}

type ToastMessageType = {
  type?: ToastType;
  timeOut?: number;
  title: string;
  message?: ReactElement;
};

const Context =
  createContext<
    [ToastMessageType[], Dispatch<SetStateAction<ToastMessageType[]>>]
  >(null);

export const useToast = () => {
  const [messages, setMessages] = useContext(Context);
  
};

const ToastMessage = ({ message, title, type, timeOut }: ToastMessageType) => {
  const [show, setShow] = useState(false);
  return (
    <Transition
      appear
      show={true}
      as="div"
      className="transition-transform"
      enter="ease-out duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="ease-in duration-200"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div
        className={clsx("p-2 min-w-[12rem] flex gap-2 items-center", {
          "bg-red-300 text-red-500": type === ToastType.ERROR,
          "bg-green-300 text-green-500": type === ToastType.SUCCESS,
          "bg-blue-300 text-blue-500": type === ToastType.DEFAULT,
          "bg-yellow-300 text-yellow-500": type === ToastType.WARNING
        })}
      >
        <div>
          <h6>{title}</h6>
          {message || null}
        </div>
        <div>
          <a className="cursor-pointer" onClick={(e) => {}}>
            Close
          </a>
        </div>
      </div>
    </Transition>
  );
};

export const ToastContextProvider = (props: { children: ReactElement }) => {
  const [messages, setMessages] = useState<ToastMessageType[]>([]);

  return (
    <Context.Provider value={[messages, setMessages]}>
      {props.children}
      {messages.length > 0 && (
        <Portal>
          {messages.map((toast, index) => (
            <ToastMessage key={index} {...toast} />
          ))}
        </Portal>
      )}
    </Context.Provider>
  );
};
