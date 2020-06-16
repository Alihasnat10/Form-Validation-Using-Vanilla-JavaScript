const form = document.getElementById("form");
const fname = document.getElementById("fname");
const lname = document.getElementById("lname");
const email = document.getElementById("email");
const password = document.getElementById("pass");
const contact = document.getElementById("contact");
const cnic = document.getElementById("cnic");


function showError(input, message) {
	const formControl = input.parentElement;
	formControl.className = 'form-control error';
	const small = formControl.querySelector('small');
	small.innerText = message;
}

function showSuccess(input) {
	const formControl = input.parentElement;
	formControl.className = 'form-control success';
}

function checkEmail(input) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    if (re.test(input.value.trim())) {
    	showSuccess(input);
    } else {
    	showError(input, "Email is invalid");
    }
}

function checkPassword(input) {
	if (input.length < 6) {
		showError(input, 'Password weak')
	} else if (input >= 6 && input < 8) {
		showError(input, 'Password medium')
	} else {
		const formControl = input.parentElement;
	    formControl.className = 'form-control success';
	    const small = formControl.querySelector('small');
		small.innerText = 'Password Strong';
	}
}

function checkRequired(inputArr) {
	inputArr.forEach(function(input) {
		if(input.value.trim() === '') {
			showError(input, `${getFieldName(input)} is required`);
		} else {
			showSuccess(input);
		}

	});
}

function checkLength(input, min, max) {
	if (input.value.length < min) {
		showError(input, `${getFieldName(input)} must be atleast ${min} characters`);
	} else if (input.value.length > max) {
		showError(input, `${getFieldName(input)} must be at most ${max} characters`);
	} else {
		showSuccess(input);
	}
}

function checkAlphabets(input) {
	const alpha = /^[a-zA-Z]+$/
	if (input.value.match(alpha)) {
		showSuccess(input);
	}
	else {
		showError(input, 'Alphabets allowed only');
	}
}

function checkDigits(input) {
	const alpha = /^[0-9]+$/
	if (input.value.trim().match(alpha)) {
		showSuccess(input);
	}
	else {
		showError(input, 'Digits allowed only');
	}
}
function getFieldName(input) {
 	return input.id.charAt(0).toUpperCase() + input.id.slice(1);
 }

form.addEventListener('submit', function(e) {
	e.preventDefault();

	checkAlphabets(fname);
	checkAlphabets(lname);
	checkDigits(cnic);
	checkDigits(contact);
	
	checkLength(fname , 3, 20);
	checkLength(lname, 3, 20);
	checkLength(contact, 11, 11);
	checkLength(cnic, 13, 13);

	checkRequired([fname, lname, email, password, contact, cnic]);
	
	checkEmail(email);

	checkRequired([fname, lname, email, password, contact, cnic]);
});