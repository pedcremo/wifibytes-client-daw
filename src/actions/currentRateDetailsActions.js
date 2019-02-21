import {Utils} from '../utils';

export const GET_CURRENT_RATE_BEGIN = 'GET_CURRENT_RATE_BEGIN';
export const GET_CURRENT_RATE_SUCCESS = 'GET_CURRENT_RATE_SUCCESS';
export const GET_CURRENT_RATE_FAILURE = 'GET_CURRENT_RATE_FAILURE';

export const getCurrentRateDetailsBegin = () => ({
  type: GET_CURRENT_RATE_BEGIN,
});

export const getCurrentRateDetailsSuccess = (currentRateDetails) => ({
  type: GET_CURRENT_RATE_SUCCESS,
  payload: {
    currentRateDetails,
  },
});

export const getCurrentRateDetailsFailure = (error) => ({
  type: GET_CURRENT_RATE_FAILURE,
  payload: {
    error,
  },
});


export function getCurrentRateDetails(id) {
  return (dispatch) => {
    dispatch(getCurrentRateDetailsBegin());
    return Promise.all([Utils.get('/tarifa/' + id), Utils.get('/tarifa_descriptor')])
        .then((response) => dispatch(getCurrentRateDetailsSuccess(response)))
        .catch((error) => dispatch(getCurrentRateDetailsFailure(error)));
  };
}

