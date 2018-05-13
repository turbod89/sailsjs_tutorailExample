module.exports = {


  friendlyName: 'Upload one thing',


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

    return exits.success();

  }


};
