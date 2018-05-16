import React from 'react';

const ProfileDetail = (props) => {

  if (props.profile){
    return (
      <div>
      <dl className="row">
        <dt className="col-sm-3">照片头像</dt>
        <dd className="col-sm-9">{props.profile.image}</dd>

        <dt className="col-sm-3">邮箱</dt>
        <dd className="col-sm-9">
          {props.profile.email != null && <p>{props.profile.email}</p>}
          <button type="button" className="btn btn-link">修改密码</button>
        </dd>

        <dt className="col-sm-3">姓名</dt>
        <dd className="col-sm-9">
        {props.profile.name != null && <p>{props.profile.name}</p>}
        </dd>

        <dt className="col-sm-3 text-truncate">英文名</dt>
        <dd className="col-sm-9">
        {props.profile.eName != null && <p>{props.profile.eName}</p>}
        </dd>

        <dt className="col-sm-3">时区</dt>
        <dd className="col-sm-9">
        {props.profile.timeZone != null && <p>{props.profile.timeZone}</p>}
        </dd>
      </dl>
      <button type="button" className="btn btn-info">更新个人信息</button>
    </div>
    );
  } else {
    return (
      <div>
        <button type="button" className="btn btn-info">添加个人信息</button>
      </div>
    );
  }
};

export default ProfileDetail;
