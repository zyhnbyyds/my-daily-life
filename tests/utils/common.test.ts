import { describe, expect, test } from 'vitest'
import { handlePathGetFirst } from '../../utils/common'

describe('utils/common', async () => {
  test('utils/common/handlePathGetFirst', () => {
    expect(handlePathGetFirst('/tyty/1')).toBe('/tyty')
  })
})
