import { Transition } from "@headlessui/react";
import clsx from "clsx";
import {
  createContext,
  Dispatch,
  ReactElement,
  SetStateAction,
  useContext,
  useEffect,
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
  const message = (message: ToastMessageType) => {
    setMessages([
      ...messages,
      {
        type: ToastType.DEFAULT,
        timeOut: Date.now() + (message.timeOut || 5000),
        title: message.title,
        message: message.message
      }
    ]);
  };
  return { message };
};

const ToastMessage = ({ message, title, type, timeOut }: ToastMessageType) => {
  const [show, setShow] = useState(false);
  const [messages] = useContext(Context);
  useEffect(() => {
    if (timeOut > Date.now()) setShow(true);
    let t = setInterval(() => {
      if (timeOut < Date.now()) {
        setShow(false);
        clearInterval(t);
      }
    }, 1000);
    return () => t && clearInterval(t);
  }, [messages]);
  return (
    <Transition
      appear
      show={show}
      as="div"
      className={clsx(
        "min-w-[16rem] block p-4 transition-all my-2 rounded-md border",
        {
          "bg-red-50 text-red-500 border-red-500": type === ToastType.ERROR,
          "bg-green-50 text-green-500 border-green-500":
            type === ToastType.SUCCESS,
          "bg-blue-50 text-blue-500 border-blue-500":
            type === ToastType.DEFAULT,
          "bg-yellow-50 text-yellow-500 border-yellow-500":
            type === ToastType.WARNING
        }
      )}
      enter="ease-out duration-300"
      enterFrom="translate-x-20"
      enterTo="translate-x-0"
      leave="ease-in duration-200"
      leaveFrom="translate-x-0"
      leaveTo="translate-x-20"
    >
      <div className="flex gap-2 w-full justify-between">
        <div>
          <h6>{title}</h6>
          {message || null}
        </div>
        <div>
          <a className="cursor-pointer" onClick={(e) => {

          }}>
            Close
          </a>
        </div>
      </div>
    </Transition>
  );
};

export const ToastContextProvider = (props: { children: ReactElement }) => {
  const [messages, setMessages] = useState<ToastMessageType[]>([]);
  const showMessage = () => {
    return (
      <div className="fixed bottom-0 my-4 right-0 mr-2 z-[9997] text-xs">
        {messages.sort((a, b) => b.timeOut - a.timeOut).map((toast, index) => (
          <ToastMessage key={index} {...toast} />
        ))}
      </div>
    );
  };

  return (
    <Context.Provider
      value={[messages.filter((i) => i.timeOut > Date.now()), setMessages]}
    >
      {props.children}
      {messages.length > 0 && showMessage()}
    </Context.Provider>
  );
};
