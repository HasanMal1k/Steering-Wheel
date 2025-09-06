import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { Settings, Camera, Info } from "lucide-react";
import { useScreenshotStore } from "../../utils/ScreenshotStore";

function OptionsButton() {
  const { gl, scene, camera } = useScreenshotStore();

  const takeScreenshot = () => {
    if (!gl || !scene || !camera) return;

    // Render once more to ensure the frame is up to date
    gl.render(scene, camera);

    // Convert to PNG
    const dataURL = gl.domElement.toDataURL("image/png");

    // Trigger download
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = `screenshot-${Date.now()}.png`;
    link.click();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center justify-center gap-1 sm:gap-2 border-1 border-gray-50/70 px-3 sm:px-4 py-2 rounded-md hover:cursor-pointer hover:bg-yellow-600" style={{ fontFamily: 'var(--font-geist-sans)' }}>
        <span className="flex items-center justify-center gap-1 sm:gap-2">
          <span><Settings strokeWidth={1.5} className="w-4 h-4 sm:w-5 sm:h-5" /></span>
          <span className="text-xs sm:text-sm uppercase hidden xs:inline sm:inline">{' ' + 'Options'}</span>
        </span>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-48 sm:w-56">
        <DropdownMenuItem className="hover:cursor-pointer" onClick={takeScreenshot}>
          <span className="mr-2"><Camera /></span> Download Image
        </DropdownMenuItem>
        <DropdownMenuItem className="hover:cursor-pointer">
          <span className="mr-2"><Info /></span> How To Use
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default OptionsButton;
