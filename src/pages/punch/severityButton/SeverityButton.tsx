import { Icon } from "@equinor/eds-core-react";
import { error_filled, info_circle, warning_filled } from "@equinor/eds-icons";
import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "../styles";

function SeverityButton({
  severity,
  setSeverity,
}: {
  severity: SetStateAction<string>;
  setSeverity: Dispatch<SetStateAction<string>>;
}) {
  const [activeButtonIndex, setActiveButtonIndex] = useState(0);

  function handleChecked(index: number) {
    setActiveButtonIndex(index);
    setSeverity(SeverityButtons[index].name);
  }

  const SeverityButtons = [
    {
      name: "Minor",
      icon: info_circle,
      color: "#FBCA36",
    },
    {
      name: "Major",
      icon: warning_filled,
      color: "#ED8936",
    },
    {
      name: "Critical",
      icon: error_filled,
      color: "#EB0000",
    },
  ];

  return (
    <>
      {SeverityButtons.map((button, index) => {
        const isActive = index === activeButtonIndex;
        return (
          <Button
            style={
              !isActive
                ? {
                    backgroundColor: "transparent",
                    boxShadow: "none",
                    color: "#bebebe",
                  }
                : {}
            }
            type="button"
            onClick={() => handleChecked(index)}
          >
            <Icon
              data={button.icon}
              color={isActive ? button.color : "#BEBEBE"}
              style={{ zIndex: 3 }}
            />
            {button.name}
          </Button>
        );
      })}
    </>
  );
}

export default SeverityButton;
