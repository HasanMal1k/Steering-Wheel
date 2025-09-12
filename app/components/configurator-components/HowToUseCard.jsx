import React, { useEffect } from 'react'
import { useConfigurationStore } from '../../utils/ConfigurationStore'
import { useRef } from 'react'
import gsap from 'gsap'

function HowToUseCard() {
  const { guideCard, setGuideCardFalse } = useConfigurationStore()
  const cardRef = useRef()

  useEffect(() => {
  if (!cardRef.current) return;

  if (guideCard) {
    cardRef.current.classList.remove("hidden");
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, filter: "blur(10px)" },
      {
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.5,
        ease: "power2.inOut",
      }
    );
  } else {
    gsap.to(cardRef.current, {
      opacity: 0,
      filter: "blur(10px)",
      duration: 0.5,
      ease: "power2.inOut",
      onComplete: () => cardRef.current.classList.add("hidden"),
    });
  }
}, [guideCard]);


  return (
    <>
      {/* {guideCard && ( */}
        <div className="fixed flex inset-0 items-center justify-center z-[1000] hidden" ref={cardRef}>
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={setGuideCardFalse}
          ></div>

          {/* Card */}
          <div className="relative z-10 bg-black/80 text-[#f6f6f6] rounded-2xl shadow-xl border border-gray-600 p-6 max-w-5xl w-[95%]">
            <h2 className="text-2xl font-bold mb-6 text-center">How It Works</h2>

            {/* Steps row */}
            <div className="flex flex-col md:flex-row items-stretch justify-between gap-6">
              {/* Step 1 */}
              <div className="flex-1 flex flex-col items-center text-center px-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#f6f6f6] text-[#f6f6f6] font-bold mb-3 hover:bg-[#f6f6f6]/90 hover:text-black transition">
                  1
                </span>
                <p className="text-sm md:text-base">
                  Hover over the component you want to customize, or select it from the dropdown menu on the bottom left.
                </p>
              </div>

              {/* Step 2 */}
              <div className="flex-1 flex flex-col items-center text-center px-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#f6f6f6] text-[#f6f6f6] font-bold mb-3 hover:bg-[#f6f6f6]/90 hover:text-black transition">
                  2
                </span>
                <p className="text-sm md:text-base">
                  Adjust its style — tweak colors, layout, or other details to match your preferences.
                </p>
              </div>

              {/* Step 3 */}
              <div className="flex-1 flex flex-col items-center text-center px-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#f6f6f6] text-[#f6f6f6] font-bold mb-3 hover:bg-[#f6f6f6]/90 hover:text-black transition">
                  3
                </span>
                <p className="text-sm md:text-base">
                  Review your design, confirm your choices, and complete your order securely.
                </p>
              </div>
            </div>

            {/* Close button */}
            <button
              onClick={setGuideCardFalse}
              className="mt-8 w-full border border-[#f6f6f6] text-[#f6f6f6] rounded-xl py-2 font-semibold hover:bg-[#f6f6f6]/90 hover:text-black transition"
            >
              Got it
            </button>
          </div>
        </div>
      {/* )} */}
    </>
  )
}

export default HowToUseCard
