export const rollDie = (sides) => Math.floor(Math.random() * sides) + 1
export const rollDice = (count, sides) =>
  Array.from({ length: count }, () => rollDie(sides)).reduce((a, b) => a + b, 0)
export const roll3d6 = () => rollDice(3, 6)
export const roll4d6drop = () => {
  const rolls = Array.from({ length: 4 }, () => rollDie(6))
  rolls.sort((a, b) => a - b)
  return rolls.slice(1).reduce((a, b) => a + b, 0)
}
export const statMod = (stat) => Math.floor((stat - 10) / 2)
export const fmtMod = (mod) => (mod >= 0 ? `+${mod}` : `${mod}`)
export const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]
export const rollStats = () => ({
  str: roll3d6(),
  dex: roll3d6(),
  con: roll3d6(),
  int: roll3d6(),
  wis: roll3d6(),
  cha: roll3d6(),
})
