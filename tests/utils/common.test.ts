import { describe, expect, test } from 'vitest'
import { setup } from '@nuxt/test-utils'
import { handlePathGetFirst } from '../../utils/common'

describe('My test', async () => {
  await setup({
    // test context options
  })

  test('my test', () => {
    expect(handlePathGetFirst('/tyty/1')).toBe('/tyty')
  })
})
