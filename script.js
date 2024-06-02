// Event listener for form submission
document.getElementById('creditForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const accountBalance = parseFloat(document.getElementById('accountBalance').value);
  const creditHistory = parseInt(document.getElementById('creditHistory').value);
  const lastDepositDate = new Date(document.getElementById('lastDepositDate').value);
  const lastLoanCollectionDate = new Date(document.getElementById('lastLoanCollectionDate').value);
  const accountType = document.getElementById('accountType').value;
  const annualIncome = 100000; // Example annual income

  let score = 0;

  if (accountBalance === '' || isNaN(accountBalance)) {
    document.getElementById('accErr').innerText = 'Please Enter a Valid Account Balance.';
    return;
  } else if (accountBalance >= 0.45 * annualIncome) {
    score += 10;
  } else {
    score -= 10;
  }

  score += creditHistory;

  const currentDate = new Date();
  const oneMonthAgo = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, currentDate.getDate());
  if (lastDepositDate > oneMonthAgo) {
    score += 5;
  }
  
  const currentDate2 = new Date();
  const sixMonthsAgo = new Date(currentDate2.getFullYear(), currentDate2.getMonth() - 6, currentDate2.getDate());
  if (lastLoanCollectionDate <= sixMonthsAgo) {
    score += 10;
  }
  

  if (accountType === 'current') {
    score += 10;
  } else if (accountType === 'savings') {
    score += 5;
  }

  const collectionDate = document.getElementById('collectionDate').value;
  const payoffDate = document.getElementById('payoffDate').value;
  score += calculateLoanScore(collectionDate, payoffDate);

  displayLoanApprovalStatus(score);
});

function validateNumberInput(inputElement) {
  // Remove non-numeric characters
  inputElement.value = inputElement.value.replace(/[^0-9]*$/, '');
}

function displayLoanApprovalStatus(score) {
  const letterContainer = document.getElementById('letterContainer');
  const letterContent = document.createElement('div');
  letterContent.classList.add('letter-content');
  let mdName = 'Rachael Dennis';
  let Position = 'Chief Financial Officer';
  const companyName = 'Cash Bay';
  const userFullName = document.getElementById('fullName').value;
  
  if(userFullName === ''){
    document.getElementById('nameErr').innerHTML = 'Please Enter Full Name';
  }else if (score >= 30) {
    letterContent.innerHTML = `
      <h2>Congratulations! Your Loan Application Has Been Approved</h2><br/>
      <p>
        Dear ${userFullName},
        <br><br>
        We are pleased to inform you that your loan application has been approved! Your creditworthiness meets our criteria, and we are delighted to offer you the loan you requested.
        <br><br>
        Please proceed with the next steps outlined in our communication to finalize the loan process. If you have any questions or need assistance, feel free to contact our customer support team.
        <br><br>
        Thank you for choosing ${companyName}.
        <br><br>
        Best regards,
        <br>
        ${mdName}
        <br>
        ${Position}
      </p>
    `;
    document.getElementById('block').style.display = 'none';
    document.getElementsByClassName('letter-wrapper')[0].style.marginTop ='40px';
  } else {
    letterContent.innerHTML = `
      <h2>Notification: Your Loan Application Has Been Declined</h2><br/>
      <p>
        Dear ${userFullName},
        <br><br>
        We regret to inform you that your loan application has been declined. After a thorough review of your creditworthiness, we are unable to approve your loan request at this time.
        <br><br>
        We understand that this may be disappointing news, and we encourage you to review your financial situation and credit history to improve your chances in the future. If you have any questions or need further clarification, please don't hesitate to reach out to us.
        <br><br>
        Thank you for considering ${companyName}.
        <br><br>
        Sincerely,
        <br>
        ${mdName}
        <br>
        ${Position}
      </p>
    `;
    document.getElementById('block').style.display = 'none';
    document.getElementsByClassName('letter-wrapper')[0].style.marginTop ='40px';
  }

  // Clear previous content before displaying new content
  letterContainer.innerHTML = '';
  letterContainer.appendChild(letterContent);
}

function calculateLoanScore(collectionDate, payoffDate) {
  const collection = new Date(collectionDate);
  const payoff = new Date(payoffDate);
  const diffMonths = (payoff.getFullYear() - collection.getFullYear()) * 12 + (payoff.getMonth() - collection.getMonth());
  return diffMonths < 6 ? 10 : 0;
}

// function UserNameInput(){
//   const userFullName = document.getElementById('fullName').value;
// }


