import type { uniqueIdentifier } from "shared/types"

let latestUnqi = 0
let freeUnqis: uniqueIdentifier[] = []

function getLeastAvailableFreeUnqi(): uniqueIdentifier {
  if (freeUnqis.length < 1) {
    latestUnqi ++

    return latestUnqi
  }

  const minFreeUnqi = Math.min(...freeUnqis)
  freeUnqis = freeUnqis.filter((id) => id !== minFreeUnqi)

  return minFreeUnqi
}

function freeUnqi(unqi: uniqueIdentifier): void {
  if (unqi === latestUnqi) {
    latestUnqi --
  } else if (unqi > 0 && unqi < latestUnqi) {
    if (!freeUnqis.includes(unqi)) {
      freeUnqis.push(unqi)
    }
  }
}

function getUnqi(): uniqueIdentifier {
  return getLeastAvailableFreeUnqi()
}

export default { getUnqi, freeUnqi }