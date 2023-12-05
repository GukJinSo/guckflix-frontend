import axiosJson, { axiosMultipart } from './axiosCustom.js';

export const category = {
  movies: 'movies',
  actors: 'actors',
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
  getUsernameCheck: (params) => {
    const url = '/members/usernameCheck?username=' + params.username;
    return axiosJson.get(url, { validateStatus: false });
  },
  getList: (cate, type, params) => {
    const url = category[cate] + '/' + sortingType[type];
    return axiosJson.get(url, params);
  },
  getVideos: (cate, id) => {
    const url = category[cate] + '/' + id + '/videos';
    return axiosJson.get(url, { params: {} });
  },
  getDetail: (cate, id, params) => {
    const url = category[cate] + '/' + id;
    return axiosJson.get(url, params);
  },
  getSimilar: (cate, id, params) => {
    const url = category[cate] + '/' + id + '/similar';
    return axiosJson.get(url, params);
  },
  getCredit: (cate, id) => {
    const url = category[cate] + '/' + id + '/credits';
    return axiosJson.get(url);
  },
  getSearchResult: (cate, params) => {
    const url = category[cate] + '/' + 'search';
    return axiosJson.get(url, params);
  },
  getActorDetail: (id, params) => {
    const url = '/actors/' + id;
    return axiosJson.get(url, params);
  },
  postSignUp: (params) => {
    const url = '/members';
    return axiosJson.post(url, params);
  },
  postMovie: (params) => {
    const url = '/movies';
    return axiosMultipart.post(url, params);
  },
  patchMovie: (params, id) => {
    const url = '/movies/' + id;
    return axiosMultipart.patch(url, params);
  },
  patchActorPhoto: (id, params) => {
    const url = '/actors/' + id + '/photo';
    return axiosJson.patch(url, params, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  patchMovieCredit: (movieId, creditId, params) => {
    const url = '/movies/' + movieId + '/credits/' + creditId;
    return axiosJson.patch(url, params);
  },
  deleteMovieCredit: (movieId, creditId) => {
    const url = '/movies/' + movieId + '/credits/' + creditId;
    return axiosJson.delete(url);
  },
  postMovieCredit: (movieId, params) => {
    const url = '/movies/' + movieId + '/credits/';
    return axiosJson.post(url, params);
  },
  getGenres: () => {
    const url = '/genres';
    return axiosJson.get(url);
  },
};

export default guckflixApi;
