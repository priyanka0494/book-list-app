const TableField = ({ fieldName, removeBook, editBook, settingsField }) => {
    return (
        <div className="tableField">
            {fieldName}
            {settingsField &&
            <>
                <i onClick={editBook} className="fas fa-edit"></i>
                <i onClick={removeBook} className="fas fa-trash-alt"></i>
            </>
            }

        </div>
    );
}

export default TableField;