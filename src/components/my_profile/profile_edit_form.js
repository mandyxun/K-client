import React, { Component } from 'react';
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { createProfile } from "../../actions";

class ProfileEditForm extends Component {
  renderField(field) {
    const { meta: { touched, error } } = field;
    const className = `form-group row ${touched && error ? "has-danger" : ""}`;
    //const className = `form-group ${field.meta.touched && field.meta.error ? 'has-danger':''}`;

    return (
      <div className={className}>
        <label className="col-sm-2 col-form-label">{field.label}</label>
        <div className="col-sm-10">
          <input className="form-control" type={field.type} placeholder={field.placeholder} {...field.input} />
          <div className="text-help">
            {touched ? error : ""}
          </div>
        </div>
      </div>
    );
  }

  renderRadioField(field) {
    const { meta: { touched, error } } = field;
    const className = `form-group row ${touched && error ? "has-danger" : ""}`;
    //const className = `form-group ${field.meta.touched && field.meta.error ? 'has-danger':''}`;

    if (field && field.input && field.options) {
      const renderRadioButtons = (key, index) =>{
        return (
          <label className="sans-serif w-100" key={`${index}`} htmlFor={`${field.input.name}-${index}`}>
            <Field
              name={field.input.name}
              id={`${field.input.name}`}
              component="input"
              type="radio"
              value={key}
              className="mh2"
            />
          {field.options[key]}
          </label>
        );
      };
      return (
        <div className={className}>
          <label className="col-sm-2 col-form-label">{field.label}</label>
          <div className="col-sm-10">
            {field.options &&
              Object.keys(field.options).map(renderRadioButtons)}
            <div className="text-help">
              {touched ? error : ""}
            </div>
          </div>
        </div>
      );
    }
    return <div></div>
  }

  renderSelectField(field) {
    const { meta: { touched, error } } = field;
    const className = `form-group row ${touched && error ? "has-danger" : ""}`;
    //const className = `form-group ${field.meta.touched && field.meta.error ? 'has-danger':''}`;

    const renderSelectOptions = (key, index) => {
      return (
        <option key = {`${index}-${key}`}
        value={key}
        >
        {field.options[key]}
        </option>
      );
    }

    if (field && field.options){
      return (
        <div className={className}>
          <label className="col-sm-2 col-form-label">{field.label}</label>
          <div className="col-sm-10">
            <select className="pa2 input-reset ba b--black-40 w-100" {...field.input} >
              <option value="">选择时区</option>
              {Object.keys(field.options).map(renderSelectOptions)}
            </select>
            <div className="text-help">
              {touched ? error : ""}
            </div>
          </div>
        </div>
      );
    }
    return <div></div>;
  }

  onSubmit(values) {
    //this === component 
    console.log(values);
    this.props.createProfile(values, () => {
      this.props.history.push("/my-profile/");
    });
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          label="邮箱"
          name="email"
          type="email"
          component={this.renderField}
          placeholder="邮箱"
        />
        <Field
          label="姓名"
          name="name"
          type="text"
          component={this.renderField}
          placeholder="中文名"
        />
        <Field
          label="英文名"
          name="eName"
          type="text"
          component={this.renderField}
          placeholder="英文名"
        />
        <Field
          label="性别"
          name="gender"
          component={this.renderRadioField}
          options={{
            female:'女',
            male:'男'
          }}
        />
        <Field
          label="时区"
          name="timezone"
          options={{
            beijing:'Beijing',
            est:'est',
            cst:'cst'
          }}
          component={this.renderSelectField}
        />
        <button type="submit" className="btn btn-info">保存</button>
        <Link to="/" className="btn btn-danger">取消</Link>
      </form>
    );
  }
};
  
// validate : (value, allValues, props) => error [optional] #
function validate(values) {
  console.log(values); //-> { title: 'asdf', categories: 'asdf', content: 'asdf' }
  const errors = {};

  // Validate the inputs from 'values'
  if (!values.email) {
    errors.email = "请输入有效邮箱";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  if (!values.name) {
    errors.name = "请输入姓名";
  }
  if (!values.eName) {
    errors.eName = "请输入英文名";
  }
  if (!values.gender) {
    errors.gender = "请选择您的性别";
  }
  if (!values.timezone) {
    errors.timezone = "请选择您的时区";
  }
  // If errors is empty, the form is fine to submit
  // If errors has *any* properties, redux form assumes form is invalid
  return errors;
}

export default reduxForm({
  validate,
  form:'ProfileEditForm'
})(
  connect(null, {createProfile})(ProfileEditForm)
);
