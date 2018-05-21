/**
 * Thing.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝

    label: {
      type: 'string',
      defaultsTo: '',
      example: 'Mr. waffle maker',
      description: 'A label describing this thing',
    },

    imageUploadFd: {
      type: 'string',
      description: 'Thi Skipper file descriptor uniquely identifies this uploaded image.',
      required: true,
    },

    imageUploadMime: {
      type: 'string',
      description: 'The MIME type of the uploaded image',
      required: true,
    },

    expectedReturnAt: {
      type: 'number',
      description: 'The js timestamp of the expected moment item will be returned',
      example: 1526935486685,
    },

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

    borrowedBy: {
      model: 'User',
      required: false,
      description: 'The id of the user who has borrowed this item',
    },

    owner: {
      model: 'User',
      required: true,
    }

  },

};

