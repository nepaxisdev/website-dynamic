
export const POST = async ({ request, fetch }) => {
	let status = 200;
	const data = await request.json();
	console.log(data);
	return new Response(
		JSON.stringify({
			status: 400,
			message: "bad request",
		})
	)
	try {
		const response = await fetch("https://api.web3forms.com/submit", {
			method: "POST",
			body: data,
		})

	} catch (e: any) {
		status = e;

	}

	return new Response(
		JSON.stringify({
			status
		})
	)
}