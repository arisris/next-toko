import { Transition } from "@headlessui/react";
import clsx from "clsx";
import { Link } from "konsta/react";
import {
  createContext,
  Dispatch,
  ReactElement,
  SetStateAction,
  useContext,
  useEffect,
  useState
} from "react";

export const enum ToastPosition {
  TOP_LEFT = 0,
  TOP_CENTER = 1,
  TOP_RIGHT = 2,
  BOTTOM_LEFT = 3,
  BOTTOM_CENTER = 4,
  BOTTOM_RIGHT = 5,
  CENTER = 6
}

export const enum ToastType {
  DEFAULT = 0,
  ERROR = 1,
  WARNING = 2,
  SUCCESS = 3
}

type ToastMessageType = {
  type?: ToastType;
  timeOut?: number;
  title: string;
  message?: ReactElement | string;
};

const Context = createContext<{
  messages: ToastMessageType[];
  setMessages: Dispatch<SetStateAction<ToastMessageType[]>>;
  position: ToastPosition;
  setPosition: Dispatch<SetStateAction<ToastPosition>>;
}>(null);

export const useToast = () => {
  const { messages, setMessages, setPosition } = useContext(Context);
  const message = (message: ToastMessageType, position?: ToastPosition) => {
    setPosition(position || ToastPosition.BOTTOM_RIGHT);
    setMessages([
      ...messages,
      {
        type: message.type || ToastType.DEFAULT,
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
  const { messages, setMessages, position } = useContext(Context);
  const destroy = () =>
    setMessages(messages.filter((i) => i.timeOut !== timeOut));
  useEffect(() => {
    if (timeOut > Date.now()) setShow(true);
    let t = setInterval(() => {
      if (timeOut < Date.now()) {
        setShow(false);
        clearInterval(t);
        destroy();
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
        "min-w-[16rem] block p-4 transition-all my-2 rounded-md border text-white",
        {
          "bg-red-500": type === ToastType.ERROR,
          "bg-green-500": type === ToastType.SUCCESS,
          "bg-blue-500": type === ToastType.DEFAULT,
          "bg-yellow-500": type === ToastType.WARNING
        }
      )}
      enter="ease-out duration-300"
      leave={clsx("ease-in duration-300")}
      enterFrom={"opacity-0"}
      enterTo={"opacity-100"}
    >
      <div className="flex gap-2 items-center w-full justify-between">
        <div>
          <h6 className="font-bold">{title}</h6>
          {message || null}
        </div>
        <div>
          <Link
            colors={{
              text: "text-white"
            }}
            onClick={(e) => destroy()}
          >
            Close
          </Link>
        </div>
      </div>
    </Transition>
  );
};

export const ToastContextProvider = (props: { children: ReactElement }) => {
  const [messages, setMessages] = useState<ToastMessageType[]>([]);
  const [position, setPosition] = useState<ToastPosition>(
    ToastPosition.BOTTOM_CENTER
  );
  const showMessage = () => {
    return (
      <div
        className={clsx("text-sm fixed z-[999]", {
          hidden: messages.length === 0,
          "bottom-0 left-0 ml-2": position === ToastPosition.BOTTOM_LEFT,
          "bottom-0 inset-x-0 flex flex-col items-center justify-center self-center":
            position === ToastPosition.BOTTOM_CENTER,
          "bottom-0 right-0 mr-2": position === ToastPosition.BOTTOM_RIGHT,
          "top-0 left-0 ml-2": position === ToastPosition.TOP_LEFT,
          "top-0 inset-x-0 flex flex-col items-center justify-center self-center":
            position === ToastPosition.TOP_CENTER,
          "top-0 right-0 mr-2": position === ToastPosition.TOP_RIGHT
        })}
      >
        {messages.map((toast, index) => (
          <ToastMessage key={index} {...toast} />
        ))}
      </div>
    );
  };

  return (
    <Context.Provider
      value={{
        messages: messages.filter((i) => i.timeOut > Date.now()),
        setMessages: setMessages,
        position,
        setPosition
      }}
    >
      {props.children}
      {messages.length > 0 && showMessage()}
    </Context.Provider>
  );
};
