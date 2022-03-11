import readline from 'readline';

const r = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

const qn = (q, cb) => {
	let resp;
	r.setPrompt(q);
	r.prompt();
	r.on('line', (userResp) => {
		resp = userResp;
		r.close();
	});
	r.on('close', () => {
		cb(resp);
	});
};

export default qn;
