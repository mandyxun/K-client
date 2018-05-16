import {combineReducers} from 'redux';
import { reducer as formReducer } from "redux-form";
import ProfilesReducer from './reducer_admin_profile';

const rootReducer = combineReducers({
    profiles: ProfilesReducer,
    form: formReducer
});

export default rootReducer;