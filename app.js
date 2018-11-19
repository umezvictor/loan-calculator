//listen for submit
document.getElementById('loan-form').addEventListener('submit', function(e){

    //hide results
    document.getElementById('results').style.display = 'none';
//show loader whnbtn is clicked
document.getElementById('loading').style.display = 'block';

//calculate resultsfter2 seconds
setTimeout(calculateResults, 2000);

e.preventDefault();
});

//calculate results

function calculateResults() {
    //ui variables
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');

    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    //calculate 
    //parsefloat converts to decimal 
    const principal = parseFloat(amount.value);

    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value) * 12;


    //calculate monthly payments
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);

    const monthly = (principal * x * calculatedInterest) / (x - 1);

    //check if x is a finite numbeer

    if (isFinite(monthly)) {
        monthlyPayment.value = monthly.toFixed(2);//to 2 dp
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);
        //show resuslts
        document.getElementById('results').style.display = 'block';
//hide spinner
document.getElementById('loading').style.display = 'none';


    } else {
        showError('Please check your input');
    }



    
}

function showError(error){
    //hide results after shows
    document.getElementById('results').style.display = 'none';

    //hide loader after error shows
    document.getElementById('loading').style.display = 'none';


    const errorDiv = document.createElement('div');//create a div for the error div
    //get elements
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');
    
    //add class
    errorDiv.className = 'alert alert-danger';

    //create textnode and append to div
errorDiv.appendChild(document.createTextNode(error));

//insert error above heading
card.insertBefore(errorDiv, heading);

//clear error message after 3 seconds
setTimeout(clearError, 3000);

}

//clear error using timeout 
function clearError(){
    document.querySelector('.alert').remove();
}