import React from 'react'
import { useConfigurationStore } from '../utils/ConfigurationStore'

function HowToUseCard() {
  const { guideCard, setGuideCardFalse } = useConfigurationStore()

  return (
    <>
      {guideCard && (
        <div className="fixed inset-0 flex items-center justify-center z-[1000]">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={setGuideCardFalse}
          ></div>

          {/* Card */}
          <div className="relative z-10 bg-black/80 text-[#f6f6f6] rounded-2xl shadow-xl border border-gray-600 p-6 max-w-4xl w-[95%]">
            <h2 className="text-2xl font-bold mb-6 text-center">How It Works</h2>

            {/* Steps row */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              {/* Step 1 */}
              <div className="flex flex-col items-center text-center max-w-sm">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#f6f6f6] text-[#f6f6f6] font-bold mb-3 hover:bg-[#f6f6f6]/90 hover:text-black transition">
                  1
                </span>
                <p className="text-sm md:text-base">
                  Hover over the section you want to customize, or select it from the dropdown menu.
                </p>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center text-center max-w-sm">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#f6f6f6] text-[#f6f6f6] font-bold mb-3 hover:bg-[#f6f6f6]/90 hover:text-black transition">
                  2
                </span>
                <p className="text-sm md:text-base">
                  Adjust its style — tweak colors, layout, or other details to match your preferences.
                </p>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center text-center max-w-sm">
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
      )}
    </>
  )
}

export default HowToUseCard
