import React, { Component } from 'react';

class ProfileEditForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    console.log('submit profile...');
    e.preventDefault();
    const emailInput = this.refs.adminEmail.value;
    const nameInput = this.refs.adminName.value;
    const eNameInput = this.refs.adminEName.value;
    // alert("You submitted the form! " + authorInput + " " + tweetInput);
    // Do nothing if either input field is blank
    if (!emailInput || !nameInput || !eNameInput) {
      return;
    }
    // Send new input value up one level to MyProfile component
    // so updated profile can be passed down again into ProfileDetail component
    this.props.onProfileSubmit(emailInput,nameInput,eNameInput);

    // Set input fields back to empty
    this.refs.adminEmail.value = '';
    this.refs.adminName.value = '';
    this.refs.adminEName.value = '';
  }

  render(){
    return (
      <div>
        <form onSubmit={ this.handleSubmit }>
          <div className="form-group row">
            <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">邮箱</label>
            <div className="col-sm-10">
              <input type="email" className="form-control" id="inputEmail3" placeholder="邮箱" ref="adminEmail"/>
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="inputName3" className="col-sm-2 col-form-label">姓名</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="inputName3" placeholder="姓名" ref="adminName"/>
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="inputEName3" className="col-sm-2 col-form-label">英文名</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="inputEName3" placeholder="英文名" ref="adminEName"/>
            </div>
          </div>
          <button type="submit" className="btn btn-info">保存</button>  
        </form>
       </div>
     );
  }
  
};

export default ProfileEditForm;
