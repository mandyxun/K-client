import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchProfile } from "../../actions";

class ProfileDetail extends Component {
  componentDidMount() {
    if (!this.props.profile) {
      const { id } = this.props.match.params;
      this.props.fetchProfile(id);
      console.log("step 2 - detail page - if no profile, fetchProfile(id)");
    }
  }

  render() {
    const { profile } = this.props;

    if (!profile) {
      return <div>loading...</div>;
    }
    console.log("step 3 - detail page - profile detail", this.props.profile);
    return (
      <div>
        <Link to="/my-profile/">所有admins</Link>

        <h2>个人资料</h2>
        <dl className="row">
          <dt className="col-sm-3">照片头像</dt>
          <dd className="col-sm-9">{profile.image}</dd>

          <dt className="col-sm-3">邮箱</dt>
          <dd className="col-sm-9">
            {profile.email != null && <p>{profile.email}</p>}
            <button type="button" className="btn btn-link">修改密码</button>
          </dd>

          <dt className="col-sm-3">姓名</dt>
          <dd className="col-sm-9">
            {profile.name != null && <p>{profile.name}</p>}
          </dd>

          <dt className="col-sm-3 text-truncate">英文名</dt>
          <dd className="col-sm-9">
            {profile.eName != null && <p>{profile.eName}</p>}
          </dd>

          <dt className="col-sm-3">时区</dt>
          <dd className="col-sm-9">
            {profile.timeZone != null && <p>{profile.timeZone}</p>}
          </dd>
        </dl>
        
        <Link className="btn btn-primary" to={`/my-profile/${profile.id}/edit`}>
            更新个人资料
        </Link>
      </div>
    );
  }
}
//this.props ===ownProps
function mapStateToProps({ profiles }, ownProps) {
  console.log("step 1 - detail page - mapStateToProps profiles", profiles);
  return { profile: profiles[ownProps.match.params.id] 

  };
}


export default connect(mapStateToProps, { fetchProfile })(ProfileDetail);
