import type { Game } from "../types"

interface ScoreboardViewProps {
  game: Game
}

export function ScoreboardView({ game }: ScoreboardViewProps) {
  if (!game.stats) return null

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div className="flex flex-col items-center">
          <img src={game.awayTeam.logo || "/placeholder.svg"} alt={game.awayTeam.name} width={100} height={100} />
        </div>
        <div className="text-4xl font-bold">
          {game.awayTeam.score} - {game.homeTeam.score}
        </div>
        <div className="flex flex-col items-center">
          <img src={game.homeTeam.logo || "/placeholder.svg"} alt={game.homeTeam.name} width={100} height={100} />
        </div>
      </div>

      {/* Team Names and Game Status */}
      <div className="flex justify-between items-center mb-6">
        <div className="text-2xl font-bold text-[#eb6a2e]">{game.awayTeam.abbreviation}</div>
        <div className="text-xl text-[#5f6368]">
          {game.period} - {game.timeRemaining}
        </div>
        <div className="text-2xl font-bold">{game.homeTeam.abbreviation}</div>
      </div>

      {/* Scoreboard Content */}
      <div className="bg-white border border-[#dcdddf] rounded-md overflow-hidden mb-6">
        {/* Team Stats */}
        <div className="grid grid-cols-3 border-b border-[#dcdddf]">
          <div className="text-center py-3">{game.stats.timeoutsLeft[0]}</div>
          <div className="text-center py-3 font-medium">Timeouts Left</div>
          <div className="text-center py-3">{game.stats.timeoutsLeft[1]}</div>
        </div>
        <div className="grid grid-cols-3 border-b border-[#dcdddf]">
          <div className="text-center py-3">{game.stats.fouls[0]}</div>
          <div className="text-center py-3 font-medium">Fouls</div>
          <div className="text-center py-3">{game.stats.fouls[1]}</div>
        </div>
        <div className="grid grid-cols-3 border-b border-[#dcdddf]">
          <div className="text-center py-3">{game.stats.twoPoints[0]}</div>
          <div className="text-center py-3 font-medium">2 Points</div>
          <div className="text-center py-3">{game.stats.twoPoints[1]}</div>
        </div>
        <div className="grid grid-cols-3 border-b border-[#dcdddf]">
          <div className="text-center py-3">{game.stats.threePoints[0]}</div>
          <div className="text-center py-3 font-medium">3 Points</div>
          <div className="text-center py-3">{game.stats.threePoints[1]}</div>
        </div>
        <div className="grid grid-cols-3 border-b border-[#dcdddf]">
          <div className="text-center py-3">{game.stats.freeThrows[0]}</div>
          <div className="text-center py-3 font-medium">Free Throws</div>
          <div className="text-center py-3">{game.stats.freeThrows[1]}</div>
        </div>

        {/* Quarter Scores */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#dcdddf] bg-[#f1f2f3]">
                <th className="py-3 px-4 text-left font-medium"></th>
                {game.stats.quarterScores.map((quarter, index) => (
                  <th key={index} className="py-3 px-4 text-center font-medium">
                    {quarter.period}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[#dcdddf]">
                <td className="py-3 px-4 text-left text-[#eb6a2e] font-medium flex items-center">
                  <span className="inline-block w-2 h-2 rounded-full bg-[#eb6a2e] mr-2"></span>
                  {game.awayTeam.abbreviation}
                </td>
                {game.stats.quarterScores.map((quarter, index) => (
                  <td
                    key={index}
                    className={`py-3 px-4 text-center ${quarter.period === "Half" || quarter.period === "T" ? "text-[#eb6a2e] font-medium" : ""}`}
                  >
                    {quarter.scores[0]}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-4 text-left">{game.homeTeam.abbreviation}</td>
                {game.stats.quarterScores.map((quarter, index) => (
                  <td
                    key={index}
                    className={`py-3 px-4 text-center ${quarter.period === "Half" || quarter.period === "T" ? "font-medium" : ""}`}
                  >
                    {quarter.scores[1]}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
