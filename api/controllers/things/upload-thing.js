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
    badRequest: {
      description: 'No image upload was provided.',
      responseType: 'badRequest', 
    },
    success: {
      outputType: {
        id: 'number',
      },
      outputDescription: 'Information abount newly created record'

    },
  },


  fn: async function (inputs, exits) {


    const info = await sails.uploadOne(inputs.photo);

    if (!info) {
      throw 'badRequest';
    }

    const newThing = await Thing.create({
      imageUploadFd: info.fd,
      imageUploadMime: info.type,
      label: inputs.label,
      owner: this.req.me.id,
    }).fetch();

    return exits.success({
      id: newThing.id
    });

  }


};
