import {
  useState,
  useEffect,
  useRef
} from 'react'

import {
  useParams,
  useNavigate
} from 'react-router-dom'

import fetchData from '../utils/fetchData';
import Modal from '../components/Modal';

function EntryDetails() {
  // basic states
  const [entry, setEntry] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  // modals
  const editModalRef = useRef(null);
  const deleteModalRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    const fetchEntry = async() => {
      const [data, error] = await fetchData(`/api/entries/${id}`);
      if (error) {
        setError(`Failed to fetch resource at '/api/entries/${id}'.`);
        return;
      }
      setEntry(data);
      setIsLoading(false);
    }
    fetchEntry();
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // console.log(formRef.current);
    const formData = new FormData(formRef.current);
    const formProps = Object.fromEntries(formData);
    let { text, imgSrc } = formProps;

    // idk how to properly validate imageURLs so skip for now it's w/e
    if (!imgSrc.startsWith("http")) imgSrc = '';
    // send the request to our server
    const [data, error] = await fetchData(`/api/entries/${id}`, {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ text: text, imgSrc: imgSrc }),
    });

    // bruh so many validation schemes that WANTS feedback
    if (error) return;

    // just so we don't need to fetch anymore.
    // this isn't a multi-user app so ...
    setEntry(data);

    editModalRef.current.close();
  }

  const confirmDelete = async () => {
    await fetchData(`/api/entries/${id}`, {
      method: 'DELETE'
    });
    navigate(`/`)
  }


  if (isLoading) return <h2>Loading...</h2>;
  return (
    <>
      {/* honestly might be better to just not use dialog so that unmount can reset the placeholder (current) text properly lol */}
      <Modal
        className="edit-modal"
        props={{
          entries: [entry],
          type: "Edit",
          textLabel: "Change the yap: ",
          imgLabel: "Change the URL (if u even care): ",
          modalRef: editModalRef,
          formRef,
          handleFormSubmit,
        }}
      />
      <Modal
        className="delete-modal"
        props={{
          entries: [entry],
          type: "Delete",
          textLabel: "Change the yap: ",
          imgLabel: "Change the URL (if u even care): ",
          modalRef: deleteModalRef,
          formRef,
          handleFormSubmit,
          confirmDelete
        }}
      />
      <h2>Entry #{entry.id}</h2>
      <p>{entry.lastUpdate}</p>
      { error ? (
        <p>{error}</p>
      ) : (
        <>
          <p>{entry.text}</p>
          <img src={entry.imgSrc || ''} />
          <button onClick={() => editModalRef.current.showModal()} className='edit-entry'>Edit</button>
          <button onClick={() => deleteModalRef.current.showModal()} className='delete-entry'>Delete</button>
        </>
      )}
    </>
  )
}


export default EntryDetails;
