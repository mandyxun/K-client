import _ from "lodash";
import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchProfiles, deleteProfile } from "../../actions";

class ProfileIndex extends Component {
  componentDidMount(){
      //GET one admin profiles
    this.props.fetchProfiles();
  /** 
    const mock_admin_profiles = [
      {'id':'admin001',
       'image':"image",
       'email':'admin.001@gmail.com',
       'password':'1234567',
       'name':'周小红',
       'eName':'Abi',
       'timeZone':'北京时间'
      },
       {'id':'admin002',
       'image':"image",
       'email':'admin.002@gmail.com',
       'password':'1234567',
       'name':'周小黄',
       'eName':'Andy',
       'timeZone':'北京时间'
      },
      {'id':'admin003',
       'image':'image',
       'email':'admin.003@gmail.com',
       'password':'1234567',
       'name':'周小白',
       'eName':'Sandy',
       'timeZone':'北京时间'
      }
    ];
    console.log(mock_admin_profiles);
    const isProfile = p => p.id ===id;
    console.log(isProfile);
    const profile = mock_admin_profiles.find(isProfile);
    this.setState({admin_profile: profile});
  */
  }

  onDeleteClick() {

    //refer toggle todo https://github.com/tayiorbeii/egghead.io_redux_course_notes/blob/master/13-React_Todo_List_Example_Toggling_a_Todo.md
    const { id } = this.props.match.params;

    this.props.deleteProfile(id, () => {
      this.props.history.push("/my-profile/");
    });
  }

  renderProfiles(){
    return _.map(this.props.profiles, profile =>{
      return (
        <li className="list-group-item" key={profile.id}>
          <Link to={`/my-profile/${profile.id}`}>
            {profile.email}
          </Link>
          <button
          className="btn btn-danger pull-xs-right"
          onClick={this.onDeleteClick.bind(this)}
          >
          Delete profile
          </button>
        </li>
      );
    });
  }

  render() {
    console.log(this.props.profiles);
    //const { profile } = this.props;

    return (
      <div>
        <div className="text-xs-right">
          <Link className="btn btn-primary" to="/my-profile/edit">
            Add a admin profile
          </Link>
        </div>
        <h3>Profiles</h3>
        <ul className="list-group">
          {this.renderProfiles()}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { profiles: state.profiles };
}

export default connect(mapStateToProps, { fetchProfiles, deleteProfile })(ProfileIndex);
