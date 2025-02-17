/* eslint-disable no-undef */
document.addEventListener('DOMContentLoaded', () => {
	chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
		chrome.scripting.executeScript(
			{
				target: { tabId: tabs[0].id },
				function: () => {
					const magnets = [...document.querySelectorAll('a[href^="magnet:"]')].map((a) => a.href);
					if (magnets.length > 0) {
						navigator.clipboard.writeText(magnets.join('\n'));
						console.log(`${magnets.length} magnets copied to clipboard 😎`);
						return magnets.length;
					}
					console.log('No magnets found 🙁');
					return 0;
				},
			},
			(results) => {
				const count = results[0].result;
				const message = count > 0 ? `${count} magnets copied to clipboard 😎` : 'No magnets found 🙁';
				document.getElementById('message').textContent = message;
				document.body.style.color = count > 0 ? 'black' : 'red';

				setTimeout(() => {
					window.close();
				}, 3000);
			}
		);
	});

	setTimeout(() => {
		document.getElementById('loader').style.display = 'none';
		document.getElementById('message').style.display = 'block';
	}, 500);
});
