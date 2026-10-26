import userData from '../fixtures/user-data.json'

describe('Orange HRM Tests', () => {

  const selectorsList = {
    usernameField: '[name="username"]',
    passwordField: '[name="password"]',
    loginButton: '.oxd-button',
    sectionTitleTopBar: '.oxd-topbar-header-breadcrumb > .oxd-text',
    wrongCredentialAlert: '.oxd-alert',
    firstNameField: "[name='firstName']",
    lastNameField: "[name='lastName']",
    middleNameField: '[name="middleName"]',
    genericField: ".oxd-input--active",
    submitButton: "[type='submit']"
  }

  it.only('User Info Update - Success', () => {
    cy.visit('/auth/login')
    cy.get(selectorsList.usernameField).type(userData.userSuccess.username)
    cy.get(selectorsList.passwordField).type(userData.userSuccess.password)
    cy.get(selectorsList.loginButton).click()
    cy.location('pathname').should('equal', '/web/index.php/dashboard/index')
    cy.get(selectorsList.sectionTitleTopBar).contains('Dashboard')
    cy.get(':nth-child(6) > .oxd-main-menu-item > .oxd-text').click()
    cy.get(selectorsList.firstNameField)
      .type('FirstNameTest', { scrollBehavior: 'center' })
    cy.get(selectorsList.middleNameField).type('MiddleNameTest')
    cy.get(selectorsList.lastNameField).type('LastNameTest')
    cy.get(selectorsList.genericField).eq(3).clear().type('Employ')
    cy.get(selectorsList.genericField).eq(4).type('ID')
    cy.get(selectorsList.genericField).eq(5).type('1234')
    cy.get(selectorsList.genericField).eq(6).clear().type('2027-06-11')
    cy.get(selectorsList.submitButton).eq(1).click()
    
  })
  it('Login - Fail', () => {
    cy.visit('/auth/login')
    cy.get(selectorsList.usernameField).type(userData.userFail.username)
    cy.get(selectorsList.passwordField).type(userData.userFail.password)
    cy.get(selectorsList.loginButton).click()
    cy.get(selectorsList.wrongCredentialAlert)
  })
})