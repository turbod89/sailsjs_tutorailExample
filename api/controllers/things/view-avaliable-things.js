module.exports = {


  friendlyName: 'View avaliable things',


  description: 'Display "Avaliable things" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/things/avaliable-things'
    }

  },


  fn: async function (inputs, exits) {

    const me = await User.findOne({
      id: this.req.me.id
    })
    .populate('friends');

    const friendsIds = me.friends.map( friend => friend.id);

    let things = await Thing.find({
      or: [
        { owner: this.req.me.id },
        { owner: {in: friendsIds}}
      ]
    })
    .populate('owner')
    //.map(thing => thing.owner = thing.owner.fullName);
    ;

    _.each( things, thing => {
      thing.imageSrc = url.resolve(sails.config.custom.baseUrl, '/api/v1/things/' + thing.id);

      delete thing.imageUploadFd;
      delete thing.imageUploadMime;
    });


    // Respond with view.
    return exits.success({
      things: things,
    });

  }


};
