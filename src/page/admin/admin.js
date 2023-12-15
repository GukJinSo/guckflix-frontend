import React, { useEffect, useState } from 'react';
import { HoverbleClickableBtn } from '../../component/historyCatalog/HistoryCatalog';
import guckflixApi from '../../config/guckflixApi';

const Admin = () => {
  const container = {
    display: 'grid',
    color: 'white',
    top: '50%',
    left: '50%',
    height: '50vh',
    width: '50vw',
    transform: 'translate(-50%, -50%)',
    position: 'absolute',
    justifyContent: 'space-around',
    alignItems: 'center',
    alignContent: 'space-evenly',
  };

  const [contents, setContents] = useState([]);

  const getVideo = async (limit, page) => {
    const response = await guckflixApi.getPopular(limit, page);
    setContents(response.data);
    console.log(response.data);
  };

  useEffect(() => {
    getVideo(20, 1);
  }, []);

  return (
    <>
      <div style={container}>
        <table></table>
      </div>
    </>
  );
};

export default Admin;
