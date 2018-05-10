const Mongoose = require('mongoose');
const config = require('../../config');

const helperClass = require('./controllerHelper');
const helper = new helperClass();

const Plan = Mongoose.model('Plan');

class PlanController {
  constructor() {
    this.get = this.get.bind(this);
    this.getPlan = this.getPlan.bind(this);
    this.post = this.post.bind(this);
    this.put = this.put.bind(this);
    this.delete = this.delete.bind(this);
  }

  //get all plan
  get(req, res) {
    Plan.find().then(plan => {
      if (!plan.length) return helper.retError(res, '400', true, '','No matching results get(planscontroller)',plan);
      return helper.retSuccess(res,'200',true,'','Sucess',plan);
    }).catch(err => {
      return helper.retError(res,'500',false,err,'Error get','');
    });
  }

  //get plan by id
  getPlan(req, res) {
    const planId = req.query.planId;

    Plan.findById(planId).then(plan => {
      if (!plan.length) return helper.retError(res, '400', true, '','No matching results getPlan',plan);
      return helper.retSuccess(res,'200',true,'','Sucess',plan);
    }).catch(err => {
      return helper.retError(res,'500',false,err,'Error getPlan','');
    });
  }

  post(req, res) {
    const { requesterId } = req.body;

    let planData = req.body;
    planData['createdBy'] = requesterId;
    planData['editedBy'] = requesterId;

    Plan.create(planData).then(plan => {
      return helper.retSuccess(res,'200',true,'','Sucess','');
    }).catch(err => {
      return helper.retError(res,'500',false,err,'Error post','');
    });
  }

  put(req, res) {
    const { requesterId } = req.body;
    const { planId } = req.body;

    let planData = req.body;
    delete planData['dateCreated'];
    planData['editedBy'] = requesterId;
    planData['lastEdited'] = new Date();

    Plan.findByIdAndUpdate(planId,planData).then(plan => {
      return helper.retSuccess(res,'200',true,'','Sucessfully updated plan : ' + planId,'');
    }).catch(err => {
      return helper.retError(res,'500',false,err,'Error put','');
    });
  }

  delete(req, res) {
    const { planId } = req.body;

    Plan.findByIdAndRemove(planId).then(plan => {
      return helper.retSuccess(res,'200',true,'','Sucessfully deleted plan : ' + planId,'');
    }).catch(err => {
      return helper.retError(res,'500',false,err,'Error delete','');
    });
  }

}

module.exports = PlanController;
