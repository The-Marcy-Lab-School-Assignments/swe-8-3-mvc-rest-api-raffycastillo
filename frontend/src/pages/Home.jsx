import {
  useState,
  useEffect,
  useRef
} from 'react'

import fetchData from '../utils/fetchData';
import { Link } from 'react-router-dom';
import Modal from '../components/Modal';

function Home() {
  const [entries, setEntries] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const addModalRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    const fetchEntries = async () => {
      const [data, error] = await fetchData(`/api/entries`);
      if (error) {
        setError(`Failed to fetch resource at '/api/entries'.`);
        return;
      }
      setEntries(data);
      setIsLoading(false);
    }
    if (entries) return;
    fetchEntries();
  }, []);

  const openAddModal = (e) => {
    e.preventDefault();
    addModalRef.current.showModal();
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // console.log(formRef.current);
    const formData = new FormData(formRef.current);
    const formProps = Object.fromEntries(formData);
    let { text, imgSrc } = formProps;

    // idk how to properly validate imageURLs so skip for now it's w/e
    if (!imgSrc.startsWith("http")) imgSrc = '';
    // send the request to our server
    const [data, error] = await fetchData(`/api/entries`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ text: text, imgSrc: imgSrc }),
    });

    // bruh so many validation schemes that WANTS feedback
    if (error) return;

    // just so we don't need to fetch anymore.
    // this isn't a multi-user app so ...
    const newEntries = entries.concat([data]);
    setEntries(newEntries);

    addModalRef.current.close();
  }


  if (isLoading) return <h2>Loading...</h2>;
  return (
    <>
      {/* honestly might be better to just not use dialog so that unmount can reset the placeholder (current) text properly lol */}
      <Modal
        className="add-modal"
        props={{
          entries,
          type: "Add",
          textLabel: "Yap away:",
          imgLabel: "Provide an img URL (if u even care): ",
          modalRef: addModalRef,
          formRef,
          handleFormSubmit,
        }}
      />
      <dialog ref={addModalRef}>
        <form ref={formRef} onSubmit={handleFormSubmit} className="add-form">
          <div className="form-text">
            <label htmlFor="text">Yap away:</label>
            <textarea name="text" id="text" rows="4" columns="50" required />
          </div>
          <div className="form-img-src">
            <label htmlFor="imgSrc">Provide an img url (or not):</label>
            <input type="text" name="imgSrc" id="imgSrc"/>
          </div>
          <div className="form-submit">
            <input type="submit" value="Add Entry" />
          </div>
          <div className="quit-modal-container">
            <input
              type="button"
              value="Cancel"
              onClick={() => addModalRef.current.close()}
              className="quit-modal"
              formNoValidate
            />
          </div>
        </form>
      </dialog>
      <h2>Journal Entries</h2>
      <button className='open-add-modal' onClick={openAddModal}>+</button>
      { error ? (
        <p>{error}</p>
      ) : (
        <>
          <ul className='entries-list'>
            {
              entries.map((entry) => {
                return (
                  <Link key={crypto.randomUUID()} to={`/entries/${entry.id}`}>
                    <li className='entries-list-item'>
                      <p>Entry #{entry.id}</p>
                      <p>{entry.lastUpdate.toString()}</p>
                    </li>
                  </Link>
                )
              })
            }
          </ul>
        </>
      )}
    </>
  )
}

export default Home;
