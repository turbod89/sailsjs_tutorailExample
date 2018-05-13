module.exports = {


  friendlyName: 'Destroy one thing',


  description: 'Delete one "thing" with specified ID from the database.',


  inputs: {
    id: {
      type: 'number',
      required: true
    }
  },


  exits: {
    forbidden: {
      description: 'The user making this request does not have the permissions to delete this thing.',
      //statusCode: 403,
      responseType: 'forbidden',
    }
  },


  fn: async function (inputs, exits) {

    const thing = await Thing.findOne({
      id: inputs.id
    });

    if (thing.owner !== this.req.me.id) {
      throw 'forbidden';
    }

    await Thing.destroy({ id: inputs.id });

    return exits.success();

  }


};
