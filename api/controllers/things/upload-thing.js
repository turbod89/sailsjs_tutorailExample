module.exports = {


  friendlyName: 'Upload thing',


  description: '',

  files: ['photo'],

  inputs: {
    photo: {
      type: 'ref',
      description: 'Uploaded file stream',
    },
    label: {
      type: 'string'
    },
  },


  exits: {

  },


  fn: async function (inputs, exits) {

    //sails.uploadOne()

    return exits.success();

  }


};
