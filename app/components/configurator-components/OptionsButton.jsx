import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { Settings, Camera, Info, Phone } from "lucide-react";
import { useScreenshotStore } from "../../utils/ScreenshotStore";
import { useConfigurationStore } from "@/app/utils/ConfigurationStore";
import { gsap } from "gsap"; // Add this import

function OptionsButton() {
  const { gl, scene, camera, controls } = useScreenshotStore();
  const { setActiveComponent, setGuideCardTrue } = useConfigurationStore()

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

  const moveCameraToDefaultPosition = () => {
  return new Promise((resolve) => {
    if (!camera || !controls) {
      console.log('Missing camera or controls, resolving immediately');
      resolve();
      return;
    }

    console.log('Starting GSAP animation...');
    const tl = gsap.timeline({
      onComplete: () => {
        console.log('GSAP animation completed');
        resolve(); // <-- now works
      }
    });

    tl.to(camera.position, {
      x: 0,
      y: 0,
      z: 5,
      duration: 1.2,
      ease: "power2.inOut",
      onUpdate: () => {
        console.log('Camera position updating:', camera.position);
      }
    }, 0);

    tl.to(controls.target, {
      x: 0,
      y: 0,
      z: 0,
      duration: 1.2,
      ease: "power2.inOut",
      onUpdate: () => {
        controls.update();
        console.log('Controls target updating:', controls.target);
      }
    }, 0);

    tl.to(camera, {
      fov: 75,
      duration: 1.2,
      ease: "power2.inOut",
      onUpdate: () => {
        camera.updateProjectionMatrix();
        console.log('FOV updating:', camera.fov);
      }
    }, 0);
  });
};

  const takeScreenshot = async () => {
  if (!gl || !scene || !camera) return;

  // Wait for camera reset animation to finish
  await moveCameraToDefaultPosition();

  // Extra tiny wait if you want
  await sleep(200);

  gl.render(scene, camera);
  const dataURL = gl.domElement.toDataURL("image/png");

  const link = document.createElement("a");
  link.href = dataURL;
  link.download = `My Configuration.png`;
  link.click();
};

const guideClick = () => {
  setGuideCardTrue()
}

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="flex items-center justify-center gap-1 sm:gap-2
                      border border-white/30
                      bg-white/10 backdrop-blur-sm
                      px-3 sm:px-4 py-2 rounded-md
                      hover:bg-yellow-600/80
                      text-white transition-colors
                     h-9 sm:h-10 hover:cursor-pointer"
          style={{ fontFamily: 'var(--font-geist-sans)' }}
        >
          <Settings strokeWidth={1.5} className="w-[18px] h-[18px] sm:w-5 sm:h-5" />
          <span className="text-xs sm:text-sm uppercase hidden xs:inline sm:inline">
            {' ' + 'Options'}
          </span>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-48 sm:w-56">
        <DropdownMenuItem className="hover:cursor-pointer" onClick={takeScreenshot}>
          <span className="mr-2"><Camera /></span> Download Image
        </DropdownMenuItem>
        <DropdownMenuItem className="hover:cursor-pointer" onClick={guideClick}>
          <span className="mr-2"><Info /></span> How To Use
        </DropdownMenuItem>
        <DropdownMenuItem className="hover:cursor-pointer">
          <a href="https://tripleseven-na.com/pages/contact" target="_blank" rel="noopener noreferrer" className="flex gap-2">
            <span className="mr-2 inline"><Phone /></span> Contact Us
          </a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default OptionsButton;