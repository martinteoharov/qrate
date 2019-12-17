const fetchPost = (body, url) => {
	fetch(url, {
		method: "POST",
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(body)
	})
	.then((res) => {
		console.log(res);
	})
}
