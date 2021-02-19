import * as React from 'react'
import { Portal } from '@maker-ui/components/src/components/Portal'
import { mount } from '@cypress/react'

describe('Partal component (internal)', () => {
  it('attaches to the body element by default', () => {
    mount(
      <div>
        <div>
          <Portal>
            <div>Portal Content</div>
          </Portal>
        </div>
      </div>
    )
    cy.get('body div')
      .last()
      .contains('Portal Content')
  })
})
