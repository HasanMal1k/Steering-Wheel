import { useThree } from "@react-three/fiber"
import { useRef } from "react"

export default function ScreenshotButton() {
  const { gl, scene, camera } = useThree()
  const linkRef = useRef<HTMLAnchorElement>(null)

  const takeScreenshot = () => {
    // Render the current frame
    gl.render(scene, camera)

    // Get screenshot as Data URL
    const dataURL = gl.domElement.toDataURL("image/png")

    // Trigger download
    if (linkRef.current) {
      linkRef.current.href = dataURL
      linkRef.current.download = "screenshot.png"
      linkRef.current.click()
    }
  }

  return (
    <>
      <button
        onClick={takeScreenshot}
        className="p-2 bg-blue-500 text-white rounded-md"
      >
        Take Screenshot
      </button>
      <a ref={linkRef} style={{ display: "none" }}>download</a>
    </>
  )
}
