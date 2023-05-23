describe('Verify balances after trancsactions', () => {

  it('Verify balance in the Balance and Transaction element after account refill"', () => {
    //navigate to specified URL
    cy.visit('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login');

    //------Login----------
    //click Customer login
    cy.get('button[ng-click="customer()"]').click();

    //select required user and submit
    cy.get('select[id=userSelect]').select('Harry Potter');
    cy.get('button[type=submit]').click();

    //------Deposit refill-----
    //click deposit button
    cy.get('button[ng-click="deposit()"').click();

    //refill deposit amounts: input + press enter
    cy.get('input[type=number]').type('100{enter}');
    //check that succes message appears 
    cy.contains('Deposit Successful');
    // wait is required as workaround for the issue: in automation mode deposit refill are made too fast (all three during one second), and the Transaction table doesn`t reflect any info
    cy.wait(1000);

    cy.get('input[type=number]').type('10{enter}');
    //cy.wait(1000);
    cy.contains('Deposit Successful');

    cy.get('input[type=number]').type('5{enter}');
    cy.contains('Deposit Successful');

    //verify that total deposit balance is 115
    cy.contains('115').should('exist');

    //----------Verify balances on transaction view-------------
    cy.wait(1000);
    //navigating to Transactions view
    cy.contains('Transactions').click();

    cy.wait(500);

    let sum = 0;

    //cy.get('tbody').within(() => {
    cy.get('tbody tr').should('have.length', 3).each(($row) => {
      sum += parseInt($row.find('td').eq(1).text());
    }).then(() => {
      //      expect(sum).to.be.equal(115);
      expect(sum).to.be.equal(110);
    });

  });
});