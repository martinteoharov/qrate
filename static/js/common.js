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
		if(res.status === 200){
			new Noty({
				theme: 'relax',
				type: 'success',
				layout: 'topRight',
				text: 'Saved'
			}).show();
		}
		else {
			new Noty({
				type: 'failure',
				layout: 'topRight',
				text: 'Sending failed'
			}).show();

		}
	})
}
