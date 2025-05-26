import { SystrayIcon, SystrayOutput } from "zebar";
import React from "react";

const buttonType = {
  "LEFT": 0,
  "MIDDLE": 1,
  "RIGHT": 2,
};

interface SystrayItemProps {
  icon: SystrayIcon;
  systray: SystrayOutput;
}

function SystrayItemComponent({ icon, systray }: SystrayItemProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (e.shiftKey) return;
    switch (e.button) {
      case buttonType["LEFT"]:
        systray.onLeftClick(icon.id);
        break;
      case buttonType["MIDDLE"]:
        systray.onMiddleClick(icon.id);
        break;
      case buttonType["RIGHT"]:
        systray.onRightClick(icon.id);
        break;
    }
  };

  return (
    <button
      className="h-4 w-4 flex items-center justify-center"
      onMouseDown={handleClick}
      onContextMenu={(e) => e.preventDefault()}
      title={icon.tooltip}
    >
      <img
        src={icon.iconUrl}
        className="h-4 w-4"
      />
    </button>
  );
}

// Only re-render if icon or systray handlers change.
export const SystrayItem = React.memo(SystrayItemComponent, (prev, next) => {
  return (
    prev.icon.id === next.icon.id &&
    prev.icon.iconUrl === next.icon.iconUrl &&
    prev.icon.tooltip === next.icon.tooltip &&
    prev.systray.onLeftClick === next.systray.onLeftClick &&
    prev.systray.onMiddleClick === next.systray.onMiddleClick &&
    prev.systray.onRightClick === next.systray.onRightClick &&
    prev.systray.onHoverEnter === next.systray.onHoverEnter &&
    prev.systray.onHoverLeave === next.systray.onHoverLeave
  );
});

