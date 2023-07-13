/**
 * 将网易云歌词秒和毫秒转化为时间戳格式时间
 * @param numberTime 传入秒级时间
 * @returns 时间戳格式时间[00:00.123]
 */
export function handleNumberTimeToString(numberTime: number) {
  const arrs = numberTime.toString().split('.')
  if (arrs.length !== 2)
    return ''

  const time = useDateFormat(numberTime * 1000, 'mm:ss').value
  return `[${time}.${arrs[1].slice(0, 3)}]`
}

// Gpt生成
/**
 * 将网易云歌词的时间戳格式时间转化为秒和毫秒
 * @param timeString 时间戳格式时间[00:00.123]
 * @returns 秒级时间 0.123
 */
export function hadnleStringTimeToNumber(timeString: string) {
  const { cloned } = useCloned(timeString)

  // 提取分钟、秒钟和毫秒部分
  const regex = /\[(\d{2}):(\d{2})\.(\d{3})\]/
  const match = cloned.value.match(regex)

  if (match) {
    const minutes = Number.parseInt(match[1])
    const seconds = Number.parseInt(match[2])
    const milliseconds = Number.parseInt(match[3])

    // 将分钟、秒钟和毫秒转换为秒形式，毫秒放在小数点后面
    const totalSeconds = minutes * 60 + seconds + milliseconds / 1000
    return totalSeconds
  }

  // 如果时间格式无效，则返回 null 或适当的错误值
  return -1
}
