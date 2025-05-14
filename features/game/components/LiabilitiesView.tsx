export function LiabilitiesView() {
  return (
    <div className="bg-white border border-[#dcdddf] rounded-md p-4 mb-6">
      <h3 className="text-lg font-medium mb-4">Liabilities and Stake Factor</h3>

      <div className="grid grid-cols-2 gap-4">
        <div className="border border-[#dcdddf] rounded-md p-4">
          <h4 className="font-medium mb-2">Market Liabilities</h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Moneyline</span>
              <span>$12,450</span>
            </div>
            <div className="flex justify-between">
              <span>Spread</span>
              <span>$8,320</span>
            </div>
            <div className="flex justify-between">
              <span>Total Points</span>
              <span>$15,780</span>
            </div>
            <div className="flex justify-between">
              <span>Player Props</span>
              <span>$6,240</span>
            </div>
          </div>
        </div>

        <div className="border border-[#dcdddf] rounded-md p-4">
          <h4 className="font-medium mb-2">Stake Factors</h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Lakers Win</span>
              <span className="text-[#eb6a2e]">1.2x</span>
            </div>
            <div className="flex justify-between">
              <span>Celtics Win</span>
              <span>0.8x</span>
            </div>
            <div className="flex justify-between">
              <span>Over 200.5</span>
              <span className="text-[#eb6a2e]">1.5x</span>
            </div>
            <div className="flex justify-between">
              <span>Under 200.5</span>
              <span>0.7x</span>
            </div>
          </div>
        </div>

        <div className="border border-[#dcdddf] rounded-md p-4 col-span-2">
          <h4 className="font-medium mb-2">Risk Assessment</h4>
          <div className="flex items-center mb-2">
            <div className="w-full bg-[#f1f2f3] rounded-full h-2.5">
              <div className="bg-[#eb6a2e] h-2.5 rounded-full w-[65%]"></div>
            </div>
            <span className="ml-2">65%</span>
          </div>
          <p className="text-sm text-[#5f6368]">
            Current risk level is moderate. Consider adjusting Lakers moneyline odds.
          </p>
        </div>
      </div>
    </div>
  )
}
