const pageDepth: Record<string, number> = {
  '/': 0,
  '/projects': 1,
  '/contact': 2,
}

function getDepth(path: string): number {
  return pageDepth[path] ?? 0
}

export function useTransitionDirection() {
  const transitionName = useState('transitionName', () => 'slide-left')

  function setDirection(fromPath: string, toPath: string) {
    const toDepth = getDepth(toPath)
    const fromDepth = getDepth(fromPath)
    transitionName.value = toDepth > fromDepth ? 'slide-left' : 'slide-right'
  }

  return { transitionName, setDirection }
}