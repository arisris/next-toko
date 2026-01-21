import { useKeyPress } from "ahooks";
import { Card, Segmented, SegmentedButton } from "konsta/react";
import { PropsWithChildren, useState } from "react";

export default function DialogConfirm(
  props: PropsWithChildren<{
    title?: string;
    textNo?: string;
    textOk?: string;
    onConfirm: (reponse: boolean) => void;
  }>
) {
  const [active, setActive] = useState(false);
  const keyName = ["Enter", "ArrowLeft", "ArrowRight"];
  useKeyPress(
    (i) => keyName.includes(i.key),
    ({ key }) => {
      if (key === keyName[0]) {
        props.onConfirm(active);
      }
      if (key === keyName[1]) setActive(false);
      if (key === keyName[2]) setActive(true);
    }
  );
  return (
    <Card
      className="min-w-[300px] lg:min-w-[360px] p-4"
      header={<h3>{props.title || "Are you sure?"}</h3>}
    >
      {props.children}
      <Segmented raised>
        <SegmentedButton
          active={!active}
          onClick={() => {
            setActive(false);
            props.onConfirm(false);
          }}
        >
          {props.textNo || "No"}
        </SegmentedButton>
        <SegmentedButton
          active={active}
          onClick={() => {
            setActive(true);
            props.onConfirm(true);
          }}
        >
          {props.textOk || "Ok"}
        </SegmentedButton>
      </Segmented>
    </Card>
  );
}
