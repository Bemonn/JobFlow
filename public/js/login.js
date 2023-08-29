// login handler

document
	.getElementById('login-form')
	.addEventListener('submit', async (event) => {
		event.preventDefault();

		const form = document.getElementById('login-form');
		const email = form.elements['email'].value;
		const password = form.elements['password'].value;

		try {
			const response = await fetch('/api/user/login', {
				method: 'POST',
				body: JSON.stringify({ email, password }),
				headers: { 'Content-Type': 'application/json' },
			});

			if (!response.ok) {
				throw new Error('There was an error logging in.');
			}

			document.location.replace('/employees');
		} catch (err) {
			console.log(err);
		}
	});
// signup handler

// Event listener for signup button
document
	.getElementById('signup-form')
	.addEventListener('submit', async (event) => {
		event.preventDefault();

		const form = document.getElementById('signup-form');
		const username = form.elements['username'].value;
		const password = form.elements['password'].value;
		const confirmPassword = form.elements['confirm_password'].value;

		try {
			const response = await fetch('/api/user/signup', {
				method: 'POST',
				body: JSON.stringify({ username, password, confirmPassword }),
				headers: { 'Content-Type': 'application/json' },
			});

			if (!response.ok) {
				throw new Error('There was an error signing up.');
			}

			document.location.replace('/employees');
		} catch (err) {
			console.log(err);
		}
	});
