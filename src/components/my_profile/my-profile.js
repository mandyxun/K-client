import React, { Component } from 'react';
import ProfileDetail from './profile_detail';
import ProfileEditForm from './profile_edit_form';

export default class MyProfile extends Component {
  constructor() {
    super();
    this.state = {
      errors: {},
      admin_profile: {
        image: '',
        email: '',
        name: '',
        eName: '',
        timeZone: ''
      }   
    };
    this.handleProfileSubmit = this.handleProfileSubmit.bind(this);
  }

  componentDidMount(){
    this.loadAdminProfile('admin1');
  }

  loadAdminProfile(id) {
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
  //GET one admin profile
  const profile_url = 'http://' + window.location.hostname + ':3000/admin/admin-profiles/' + id;
  const request = new Request(profile_url, {
      method: 'GET',
      cache: false
    });

    fetch(request)
      .then((res) => res.json())//change ‘string’ from server to ‘json’
      .then((profile) => {
        this.setState({admin_profile: profile});
      });
  }

  handleProfileSubmit(email, name, eName){
    //POST one admin profile
    console.log('Posting request to Profiles API...');
    const new_profile = {
      email: email, 
      name: name, 
      eName: eName
    };
    const profiles_url = 'http://' + window.location.hostname + ':3000/admin/admin-profiles/';
    const request = new Request(profiles_url, 
      {
      method: 'POST',
      body: JSON.stringify(new_profile), // must match 'Content-Type' header
      cache: false, // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        'Accept': 'application/json',
        'content-type': 'application/json'
        },
      }
    );

    fetch(request)
      //then(res =>res.json())
      //.then((res) => {
      //console.log(res);})
    .then(res=>{
        if (res.status ===200){
          this.setState({
            errors:{}
          });
          res.json().then((currentProfile) => {this.setState({admin_profile: currentProfile});});
        } else {
          console.log('Post response failed...');
        }
      });
  }

  render() {
      return (
        <div>
          <h1>个人资料</h1>
          <ProfileDetail profile={this.state.admin_profile}/>
          <ProfileEditForm 
            profile={this.state.admin_profile}
            onProfileSubmit={this.handleProfileSubmit}/>
        </div>
      );
    
  }
}
