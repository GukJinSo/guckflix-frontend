import React, { useEffect, useState } from 'react';
import { VideoCard } from '../../component/videoSlider/VideoSlider';
import apiConfig from '../../config/apiConfig';
import guckflixApi, {
  category,
  sortingType,
  VideoSliderActionType,
} from '../../config/guckflixApi';
import './catalog.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { HoverbleClickableBtn } from '../../component/historyCatalog/HistoryCatalog';

const Catalog = () => {
  const [videos, setVideos] = useState([]);
  const [params, setParams] = useState({
    page: 1,
    isQuery: false,
  });

  const [hasNext, setHasNext] = useState(false);

  const [query, setQuery] = useState('');

  let arr = [];

  const getVideo = async () => {
    let response;
    switch (params.isQuery) {
      // 페이지 로드 시 기본 동작
      case false:
        guckflixApi
          .getList(category.movies, sortingType.popular, {
            params: {
              page: params.page,
            },
          })
          .then((data) => {
            response = data;
            setHasNext(true);
            setPosters();
          })
          .catch((err) => console.log(err));
        break;

      // 검색어가 바뀔 때마다 동작
      case true:
        guckflixApi
          .getSearchResult(category.movies, {
            params: {
              page: params.page,
              keyword: query,
            },
          })
          .then((data) => {
            response = data;
            setPosters();
            console.log(response);
            setHasNext(response.data.hasNext);
          })
          .catch((err) => console.log(err));
        break;
      default:
    }

    const setPosters = () => {
      response.data.results.forEach((e) => {
        let vo = {
          category: category.movies,
          name: e.title,
          url: apiConfig.w500Image(e.poster_path),
          id: e.id,
        };
        arr.push(vo);
      });
      setVideos([...videos, ...arr]);
      arr = [];
    };
  };

  useEffect(() => {
    getVideo();
  }, [params]);

  const changeHandle = (e) => {
    setQuery(e.target.value);
    setParams({ ...params, page: 1, isQuery: true });
    setVideos([]);
  };

  const action = VideoSliderActionType.catalog;
  const text = {
    catalog: '카탈로그',
    search: '제목을 입력하고 엔터를 누르세요',
    loadMore: '더 찾기',
  };

  const navigate = useNavigate();

  const formHandle = () => {
    navigate(`/movies/form`);
  };

  const role = useSelector((state) => state.role);
  console.log(role);

  return (
    <div className="catalog">
      <div className="catalog__search">
        <input
          value={query}
          onChange={changeHandle}
          type="text"
          placeholder={`${text.search}`}
        />
        {role === 'ADMIN' ? (
          <HoverbleClickableBtn
            btnName={'등록'}
            className={'actorDetail__showingBtn'}
            func={formHandle}
          />
        ) : (
          <></>
        )}
      </div>
      <div className="catalog__videos__wrap">
        <div>
          <div className="catalog__videos">
            {videos.map((e, i) => (
              <VideoCard data={e} key={i} action={action} />
            ))}
          </div>
        </div>
      </div>
      <div className="catalog__loadMore">
        {hasNext ? (
          <button
            className="catalog__loadMore__button"
            onClick={() => {
              setParams({ ...params, page: params.page + 1 });
            }}
          >
            {text.loadMore}
          </button>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Catalog;
