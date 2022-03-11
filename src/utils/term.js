let size = { x: 0, y: 0 };

const setSize = () => {
	size = {
		x: process.stdout.columns,
		y: process.stdout.rows
	};
};

const getSize = () => size;

const getCurrentSize = () => ({
	x: process.stdout.columns,
	y: process.stdout.rows
});
export { setSize, getSize, getCurrentSize };
