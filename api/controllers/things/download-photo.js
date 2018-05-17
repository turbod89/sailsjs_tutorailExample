module.exports = {


  friendlyName: 'Download photo',


  description: 'Download the photo of the thing with the requested id',


  inputs: {
    id: {
      type: 'string',
      description: 'The id of the photo we want to download',
      required: true,
    }
  },


  exits: {
    success: {
      outputType: 'ref',
      outputDescription: 'The streaming bytes of the specified thing\'s photo.'
    },
    notFound: {
      responseType: 'notFound',
    },
    forbidden: {
      responseType: 'forbidden',
    }
  },


  fn: async function (inputs, exits) {

    const thing = await Thing.findOne({id: inputs.id});

    // check if this thing exists
    if (!thing) {
      throw 'notFound';
    }

    // check if you are allowed to see this
    const me = await User.findOne({id: this.req.me.id}).populate('friends');

    if (this.req.me.id !== thing.owner && !_.any(me.friends, {id: thing.owner})) {
      throw 'forbidden';
    }

    // return image
    this.res.type(thing.imageUploadMime);

    const downloading = await sails.startDownload(thing.imageUploadFd);



    return exits.success(downloading);

  }


};
