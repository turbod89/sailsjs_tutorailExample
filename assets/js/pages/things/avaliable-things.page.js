parasails.registerPage('avaliable-things', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    things: [],
    confirmDeleteThingModalOpen: false,
    thingDeleteThingModal: null,
    uploadThingModalOpen: false,

    uploadFormData: {
      label: '',
    },

    // Syncing / loading state
    syncing: false,

    // validation errors:
    formErrors: {},

    // server error state:
    cloudError: '',
  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function() {
    // Attach any initial data from the server.
	  _.extend(this, SAILS_LOCALS);

  },
  mounted: async function() {
    //…
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {

    //
    //  Delete modal
    //


    clickThing: async function (thingId) {
      console.log('You clicked a thing with id '+ thingId);
    },

    clickDeleteThing: async function (thingId) {
      this.confirmDeleteThingModalOpen = true;
      this.thingDeleteThingModal = this.things.find(thing => thing.id === thingId);
    },
    
    clickConfirmDeleteThingModal: async function () {
      this.confirmDeleteThingModalOpen = false;
      await Cloud.destroyOneThing.with({ id: this.thingDeleteThingModal.id });
      _.remove(this.things, { id: this.thingDeleteThingModal.id });
      this.thingDeleteThingModal = null;
      this.$forceUpdate();
    },
    
    closeDeleteThingModal: async function () {
      this.confirmDeleteThingModalOpen = false;
      this.thingDeleteThingModal = null;
    },

    //
    //  Upload thing modal
    //

    clickUploadThing: async function () {
      this.uploadThingModalOpen = true;
    },

    closeUploadThingModal: async function () {
      this._clearUploadThingModal();
    },

    handleParseUploadThingForm: function() {
      // clear out any pre-existing parsing errors
      this.formErrors = {};

      const argins = this.uploadFormData;


      if (Object.keys(this.formErrors).length > 0) {
        return;
      }

      return argins;
    },

    _clearUploadThingModal: function () {
      this.uploadThingModalOpen = false;
      this.uploadFormData = {
        label: '',
      };
      this.formErrors = {};
      this.cloudError = {};
    },

    submittedUploadThingForm: function () {

      this._clearUploadThingModal();
    },
  }
});
