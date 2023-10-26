import React, { useEffect, useState } from 'react';
import './movieForm.css';
import noImage from './../../img/w500_no_image.png';
import guckflixApi, { category } from '../../config/guckflixApi';
import { AutoCompleteBox } from '../../component/historyCatalog/HistoryCatalogEdit';
import { HoverbleClickableBtn } from '../../component/historyCatalog/HistoryCatalog';

const MovieForm = () => {
  const image = useState(noImage);

  useEffect(() => {}, [image]);

  useEffect(() => {
    getApiMovieGenres();
  }, []);

  const [genreList, setGenreList] = useState([]);
  const getApiMovieGenres = async () => {
    const response = await guckflixApi.getGenres();
    setGenreList(response.data);
  };

  const [checkedGenreList, setCheckedGenreList] = useState([]);
  const checkboxHandler = (genre) => {
    if (checkedGenreList.includes(genre)) {
      setCheckedGenreList([
        ...checkedGenreList.filter((num) => num !== genre.id),
      ]);
    } else {
      setCheckedGenreList([...checkedGenreList, genre]);
    }
  };

  const [overview, setOverview] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [title, setTitle] = useState('');

  const titleHandler = (e) => {
    setTitle(e.target.value);
  };
  const releaseDateHandler = (e) => {
    setReleaseDate(e.target.value);
  };
  const overviewHandler = (e) => {
    setOverview(e.target.value);
  };

  // 검색
  const [searchedItems, setSearchedItems] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  // 키보드나 마우스에 의해 선택된 자동완성 박스 변수
  const [isSelected, setIsSelected] = useState(false);
  const [focus, setFocus] = useState(-1);
  const [focusedActor, setFocusedActor] = useState({});
  // 버튼을 눌러 추가되어 리스트에 나타나는 Credits
  const [addedCredits, setAddedCredits] = useState([]);

  // const [characterName, setCharacterName] = useState('');
  // const [editingCreditId, setEditingCreditId] = useState(null);
  // const [editingContent, setEditingContent] = useState('');

  const searchInputHandle = (e) => {
    setSearchKeyword(e.target.value);
  };
  const search = async () => {
    const response = await guckflixApi.getSearchResult(category.actors, {
      params: {
        keyword: searchKeyword,
      },
    });
    setSearchedItems(response.data.results);
  };

  const [characterName, setCharacterName] = useState('');

  const addCreditHandler = () => {
    setAddedCredits([
      ...addedCredits,
      {
        id: focusedActor.id,
        name: focusedActor.name,
        casting: characterName,
      },
    ]);
    setSearchKeyword('');
  };

  const keydownHandler = (e) => {
    // 위쪽 화살표를 누른 경우, 포커스를 범위 내에서 -1
    if (e.keyCode === 38 && focus >= 1) setFocus(focus - 1);

    // 아래 화살표를 누른 경우, 포커스를 범위 내에서 +1
    if (e.keyCode === 40 && focus < searchedItems.length - 1)
      setFocus(focus + 1);

    // 엔터를 누른 경우, 사용자의 커서가 위치한 영화를 선택
    if (e.keyCode === 13 && focus >= 0 && focus <= searchedItems.length - 1) {
      setSearchKeyword(searchedItems[focus].name);
      setIsSelected(true);
      setFocusedActor(searchedItems[focus]);
    }
  };

  useEffect(() => {
    // 검색어가 존재할 때, 사용자가 선택한 것이 없으면 검색하고, 자동완성 박스를 보여줌
    if (searchKeyword !== '' && !isSelected) {
      search();
    }

    // 검색어가 존재할 때, 사용자가 선택한 것이 있으면 자동완성 박스를 보여줄 필요가 없음
    if (searchKeyword !== '' && isSelected) {
      setSearchedItems([]);
      setIsSelected(true);
      setFocus(-1);
    }

    // 검색어가 없으면 자동완성 박스를 보여줄 필요가 없음
    if (searchKeyword === '') {
      setSearchedItems([]);
      setIsSelected(false);
      setFocus(-1);
      setFocusedActor({});
      setCharacterName('');
    }
  }, [searchKeyword]);

  useEffect(() => {
    console.log(addedCredits);
  }, [addedCredits]);

  const deleteCreditHandle = (id) => {
    setAddedCredits([...addedCredits.filter((credit) => credit.id !== id)]);
  };

  const [w500File, setW500File] = useState(null);
  const [w500PrevImage, setW500PrevImage] = useState(null);
  const [backdropPathFile, setBackdropPathFile] = useState(null);
  const [backdropPrevImage, setBackdropPrevImage] = useState(null);

  // img src를 사용자가 업로드하려는 파일로 미리보기 (전송되는 것이 아님)
  const w500ImageHandle = (e) => {
    const file = e.target.files[0];
    setW500File(file);

    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setW500PrevImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const backdropImageHandle = (e) => {
    const file = e.target.files[0];
    setBackdropPathFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setBackdropPrevImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const formHandler = async () => {
    const formData = new FormData();

    formData.append(
      'form',
      new Blob(
        [
          JSON.stringify({
            title: title,
            overview: overview,
            genres: checkedGenreList,
            release_date: releaseDate,
            credits: addedCredits,
          }),
        ],
        { type: 'application/json' },
      ),
    );

    formData.append('originFile', backdropPathFile);
    formData.append('w500File', w500File);

    const response = await guckflixApi.postMovie(formData);

    console.log(response);
  };

  return (
    <>
      <div className="movieForm__wrapper">
        <div className="left">
          <h2>세로형 이미지</h2>
          <img src={w500PrevImage ? w500PrevImage : noImage} />
          <input type="file" accept="image/jpg" onChange={w500ImageHandle} />
          <h2>백그라운드 이미지</h2>
          <img src={backdropPrevImage ? backdropPrevImage : noImage} />
          <input
            type="file"
            accept="image/jpg"
            onChange={backdropImageHandle}
          />
        </div>
        <div className="right">
          <div className="title">
            <h2>제목</h2>
            <input
              className="shortTextInput"
              type="text"
              placeholder="제목"
              value={title}
              onChange={titleHandler}
            ></input>
          </div>
          <div>
            <h2>개봉일</h2>
            <input
              className="date"
              type="date"
              value={releaseDate}
              data-placeholder="날짜 선택"
              onChange={releaseDateHandler}
            />
          </div>
          <div>
            <h2>영화 소개</h2>
            <textarea
              className="overview"
              placeholder="영화 소개"
              value={overview}
              onChange={overviewHandler}
            ></textarea>
          </div>
          <div>
            <h2>장르 선택</h2>
            {genreList.map((genre) => (
              <div className="display-inline-block margin-10" key={genre.id}>
                <input
                  type="checkbox"
                  id={genre.id}
                  onChange={() => checkboxHandler(genre)}
                />
                <label htmlFor={genre.id}>{genre.genre}</label>
              </div>
            ))}
          </div>
          <div>
            <h2>출연진 등록</h2>
            <div className="historyCatalog__OutlineBox">
              <input
                className="search"
                type="text"
                onChange={searchInputHandle}
                value={searchKeyword}
                onKeyDown={keydownHandler}
                disabled={isSelected}
                placeholder="출연자를 추가하려면 배우명을 검색하세요"
              />
              <div className="relative">
                <AutoCompleteBox
                  items={searchedItems}
                  setIsSelected={setIsSelected}
                  setSearchKeyword={setSearchKeyword}
                  setSelectedItem={setFocusedActor}
                  setFocus={setFocus}
                  focus={focus}
                />
              </div>
              {isSelected ? (
                <>
                  <div className="margin-bottom-10px">
                    <input
                      type="text"
                      className="search"
                      value={characterName}
                      placeholder="배역 명을 입력하세요"
                      onChange={(e) => setCharacterName(e.target.value)}
                    />
                  </div>
                  <div>
                    <HoverbleClickableBtn
                      func={addCreditHandler}
                      btnName={'배역 추가'}
                      className={'margin-right-5px'}
                    />
                    <HoverbleClickableBtn
                      func={() => setSearchKeyword('')}
                      btnName={'배역 재선택'}
                      className={'margin-right-5px'}
                    />
                  </div>
                </>
              ) : (
                <></>
              )}
              <br />
              {addedCredits &&
                addedCredits.map((credit, index) => (
                  <div key={credit.id} className="historyCatalog__title">
                    <div className="flex align-items-center">
                      <span className="flex-grow-1">{credit.name}</span>
                      <HoverbleClickableBtn
                        className={'margin-right-5px'}
                        func={() => deleteCreditHandle(credit.id)}
                        btnName={'삭제'}
                      />
                    </div>
                    <div className="historyCatalog__casting">
                      {credit.casting}&nbsp;역
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      <div className="text-align-center background-color-black padding-bottom-3vh">
        <HoverbleClickableBtn func={formHandler} btnName={'등록'} />
      </div>
    </>
  );
};

export default MovieForm;
