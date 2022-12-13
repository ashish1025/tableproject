import './FieldSelection.css'


const FieldSelection = (props) => {
    const { selectedFields: currSelectedFields, handleFieldButtonClick } = props

    return (
        <div>
            <h5 style={{ marginBottom: "5px" }}>Dimensions and Metrics</h5>
            {currSelectedFields.map((currSelectedField) => currSelectedField.active ?
                <button onClick={() => handleFieldButtonClick(currSelectedField.name)} className="activeBtn">{currSelectedField.name}</button>
                : <button onClick={() => handleFieldButtonClick(currSelectedField.name)} className="inactiveBtn">{currSelectedField.name}</button>)}
        </div>
    )
}

export default FieldSelection
