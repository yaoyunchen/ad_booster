class ControllerHelper {
  constructor() {
    this.retError = this.retError.bind(this);
    this.retSuccess = this.retSuccess.bind(this);
  }

  retError(res,https,success,error,message,data){
    const ret = {
      success : success,
      error : error,
      message : message,
      data : data
    };
    return res.status(https).json(ret);
  }

  retSuccess(res,https,success,error,message,data){
    const ret = {
      success : success,
      error : error,
      message : message,
      data : data
    };
    return res.status(200).json(ret);
  }

}

module.exports = ControllerHelper;
