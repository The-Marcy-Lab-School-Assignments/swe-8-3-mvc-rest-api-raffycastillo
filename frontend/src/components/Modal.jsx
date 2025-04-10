
function Modal({ props }) {
  const {
    entries,
    type,
    textLabel,
    imgLabel,
    modalRef,
    formRef,
    handleFormSubmit,
    confirmDelete
  } = props;

  return (
    <dialog ref={modalRef}>
      {
        type === "Delete" ? (
          <>
            <h2>ARE YOU SURE???</h2>
            <button onClick={() => modalRef.current.close()} className='cancel-delete'>Cancel</button>
            <button
              onClick={confirmDelete}
              className='confirm-delete'
              style={{
                background: 'red'
              }}
            >Confirm</button>
          </>
        ) : (
          <>
            <form ref={formRef} onSubmit={handleFormSubmit} className="edit-form">
              <div className="form-text">
                <label htmlFor="text">{textLabel}</label>
                <textarea name="text" id="text" rows="4" columns="50" required autoFocus defaultValue={entries.length > 1 ? '' : entries[0].text} />
              </div>
              <div className="form-img-src">
                <label htmlFor="imgSrc">{imgLabel}</label>
                <input type="text" name="imgSrc" id="imgSrc"/>
              </div>
              <div className="form-submit">
                <input type="submit" value={`${type} Entry`} />
              </div>
              <div className="quit-modal-container">
                <input
                  type="button"
                  value="Cancel"
                  onClick={() => modalRef.current.close()}
                  className="quit-modal"
                  formNoValidate
                />
              </div>
            </form>
          </>
        )
      }
    </dialog>
  )
}

export default Modal;
