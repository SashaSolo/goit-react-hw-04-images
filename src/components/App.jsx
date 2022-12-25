import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchPictures } from 'api/fetchPictures';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ButtonAPI } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { GlobalStyle } from './GlobalStyle';

export function App() {
  const [pictureName, setPictureName] = useState('');
  const [pictures, setPictures] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [showBtn, setShowBtn] = useState(false);
  const [ImageURL, setImageURL] = useState(' ');

  useEffect(() => {
    fetchPictures(pictureName, page)
      .then(data => {
        if (pictureName) {
          setLoading(true);
          setPage(page);
          setPictures(prevState => [...prevState, ...data.hits]);
          setShowBtn(true);
        }

        if (data.hits.lenght < 12) {
          setShowBtn(false);
        }
      })
      .catch(error => console.log(error))
      .finally(() => setLoading(false));
  }, [page, pictureName]);

  const handleFormSubmit = pictureName => {
    setPictureName(pictureName);
    setLoading(true);
    setPictures([]);
    setPage(1);
    setShowBtn(false);
  };

  const loadMore = () => {
    setPage(prevState => prevState + 1);
  };

  const toggleModal = largeImageURL => {
    setShowModal(!showModal);
    setImageURL(largeImageURL);
  };

  return (
    <div>
      <Searchbar dataForm={handleFormSubmit} />
      {pictureName && (
        <ImageGallery pictures={pictures} toggleModal={toggleModal} />
      )}

      {loading && <Loader />}

      {!loading && showBtn && pictures.lenght !== 0 && (
        <ButtonAPI onClick={loadMore} />
      )}

      {showModal && <Modal largeImageURL={ImageURL} onClick={toggleModal} />}
      <ToastContainer autoClose={2000} />
      <GlobalStyle />
    </div>
  );
}
