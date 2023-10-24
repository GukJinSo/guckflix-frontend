import axiosCustom from './axiosCustom.js';

export const category = {
  movies: 'movies',
};

export const videoType = {
  trailer: 'Trailer',
};

export const sortingType = {
  top_rated: 'top-rated',
  upcoming: 'upcoming',
  popular: 'popular',
  now_playing: 'now_playing',
};

export const VideoSliderActionType = {
  main: 'main',
  similar: 'similar',
  catalog: 'catalog',
  credit: 'credit',
  workedMovies: 'workedMovies',
};

export const VideoCardActionType = {
  clickable: 'clickable',
  none: '',
};

const guckflixApi = {
  getList: (cate, type, params) => {
    const url = category[cate] + '/' + sortingType[type];
    return axiosCustom.get(url, params);
  },
  getVideos: (cate, id) => {
    const url = category[cate] + '/' + id + '/videos';
    return axiosCustom.get(url, { params: {} });
  },
  getDetail: (cate, id, params) => {
    const url = category[cate] + '/' + id;
    return axiosCustom.get(url, params);
  },
  getSimilar: (cate, id, params) => {
    const url = category[cate] + '/' + id + '/similar';
    return axiosCustom.get(url, params);
  },
  getCredit: (cate, id, params) => {
    const url = category[cate] + '/' + id + '/credits';
    return axiosCustom.get(url, params);
  },
  getSearchResult: (cate, params) => {
    const url = category[cate] + '/' + 'search';
    return axiosCustom.get(url, params);
  },
  getActorDetail: (id, params) => {
    const url = '/actors/' + id;
    return axiosCustom.get(url, params);
  },
  patchActorPhoto: (id, params) => {
    const url = '/actors/' + id + '/photo';
    return axiosCustom.patch(url, params, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  patchMovieCredit: (movieId, creditId, params) => {
    const url = '/movies/' + movieId + '/credits/' + creditId;
    return axiosCustom.patch(url, params);
  },
  deleteMovieCredit: (movieId, creditId) => {
    const url = '/movies/' + movieId + '/credits/' + creditId;
    return axiosCustom.delete(url);
  },
  postMovieCredit: (movieId, params) => {
    const url = '/movies/' + movieId + '/credits/';
    return axiosCustom.post(url, params);
  },
};

export default guckflixApi;
