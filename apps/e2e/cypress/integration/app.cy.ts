describe('dsadsad', () => {
  it('passes', () => {
    cy.visit('/')
    cy.contains('Home')
    cy.get('button').click()
    cy.wait(3000)
  })
})
