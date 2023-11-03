import { render, screen } from '@testing-library/vue'
import About from '@/views/AboutView.vue'
import { expect, test } from 'vitest'
test('should render', () => {
  render(About)
  expect(screen.getByText('This is an about page'))
})
