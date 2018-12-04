// creates an object that has the cells as the keys and the values as cellData
// 0: default, 1: ship, 2: hit, 3: miss
export const setCellData = (arr, data) =>
	arr.reduce((obj, item) => {
		obj[item] = data
		return obj
	}, {})