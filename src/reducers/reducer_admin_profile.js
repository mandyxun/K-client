import _ from "lodash";
import {FETCH_PROFILES, FETCH_PROFILE, DELETE_PROFILE} from '../actions';

export default function(state = {}, action) {
    switch (action.type) {
      case DELETE_PROFILE:
        return _.omit(state, action.payload);//delete local state 
      case FETCH_PROFILE:
      //const post = action.payload.data;
      //const newState = {...state};
      //newState[post.id] = post;
      //return newState;
        return { ...state, [action.payload.data.id]: action.payload.data };
      case FETCH_PROFILES:
        //console.log(action.payload.data);//[post1, post2]
        //{4:post}
        return _.mapKeys(action.payload.data, "id");//turns array of objects into object
      default:
        return state;
    }
  }
  