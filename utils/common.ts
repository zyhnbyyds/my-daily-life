export function handlePathGetFirst(path: string) {
  const arrs = path.split('/')
  return arrs.length >= 2 ? `/${arrs[1]}` : ''
}
