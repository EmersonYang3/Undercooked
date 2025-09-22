let latestUnqi = 0
let freeUnqis: number[] = []

function getLeastAvailableFreeUnqi(): number {
  if (freeUnqis.length < 1) {
    latestUnqi ++

    return latestUnqi
  }

  const minFreeUnqi = Math.min(...freeUnqis)
  freeUnqis = freeUnqis.filter((id) => id !== minFreeUnqi)

  return minFreeUnqi
}

function freeUnqi(unqi: number): void {
  if (unqi === latestUnqi) {
    latestUnqi --
  } else if (unqi > 0 && unqi < latestUnqi) {
    if (!freeUnqis.includes(unqi)) {
      freeUnqis.push(unqi)
    }
  }
}

function getUnqi(): number {
  return getLeastAvailableFreeUnqi()
}

export default { getUnqi, freeUnqi }