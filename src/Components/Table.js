import { useEffect, useState } from 'react';
import './Table.css'

const formatValue = (field, value) => {
	//console.log(field, value);
	switch (field) {
		case "date":
			const tempDateValue = new Date(value)

			return `${tempDateValue.toLocaleString('en-US', { day: '2-digit' })} ${tempDateValue.toLocaleString('en-US', { month: 'long' })} ${tempDateValue.getFullYear()}`;
		default:
			return value
	}
}

const changeSortIcon = (field, order) => {
	if (!field) return "Aa"

	if (order === 0) {
		return "Aa"
	} else if (order === 1) {
		return "↓ Aa"
	} else {
		return "↑ Aa"
	}
}

const sortByField = (data, field, order) => {
	return data && data.sort((a, b) => order * (field === 'date' ? (new Date(a[field]) - new Date(b[field])) : (a[field] - b[field])))
}

const Table = (props) => {
	const { data, selectedFields } = props;
	const [order, setOrder] = useState(0)
	const [sortedData, setSortedData] = useState(props.data)
	const [currSortedField, setCurrSortedField] = useState("")
	const isSelectedField = (name) => selectedFields.some((field) => field.active && field.name === name)

	console.log(sortedData);

	const handleSortClick = (field) => {
		const newOrder = order === 0 ? 1 : -1 * order
		setOrder(newOrder)
		setSortedData(sortByField(sortedData, field, newOrder))
		setCurrSortedField(field)
	}

	useEffect(() => {
		setSortedData(data)
	}, [data])


	return (
		<div >
			<table>
				<thead>
					{
						selectedFields.map((selectedField) =>
							selectedField.active && <th>{selectedField.name}
								<button onClick={() => handleSortClick(selectedField.name)} title='Sort' style={{ fontSize: 9 }}>{changeSortIcon(currSortedField === selectedField.name ? selectedField.name : "", order)}</button></th>
						)
					}
				</thead>
				{
					sortedData && sortedData.map((_data) =>
						<tbody>
							{
								Object.keys(_data).map((field) => isSelectedField(field) && <td>{formatValue(field, _data[field])}</td>)
							}
						</tbody>
					)
				}
			</table>
		</div >
	)
}

export default Table; 
