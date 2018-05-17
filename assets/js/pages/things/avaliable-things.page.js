parasails.registerPage('avaliable-things', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    things: [],
    confirmDeleteThingModalOpen: false,
    thingDeleteThingModal: null,
    uploadThingModalOpen: false,
    uploadThingImagePreview: null,

    uploadFormData: {
      label: '',
      photo: undefined,
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

    clickDeleteThing: async function (thingId) {
      this.confirmDeleteThingModalOpen = true;
      this.thingDeleteThingModal = this.things.find(thing => thing.id === thingId);
      console.log(this.thingDeleteThingModal)
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
        photo: undefined,
      };
      this.formErrors = {};
      this.cloudError = {};
    },

    submittedUploadThingForm: function (result) {
      console.log(result)
      this.things.push({
        label: this.uploadFormData.label,
        id: result.id,
        imageSrc: result.imageSrc,
        owner: {
          id: this.me.id,
          fullName: this.me.fullName,
          
        },
      });
      this.$forceUpdate()

      this._clearUploadThingModal();

    },

    changeFileInput: function (target) {
      const files = target.files;
      const selectedFile = files[0];

      if (!selectedFile) {
        this.uploadFormData.photo = undefined;
        return;
      }

      const reader = new FileReader();
      reader.onload = event => this.uploadThingImagePreview = event.target.result;
      reader.readAsDataURL(selectedFile);


      this.uploadFormData.photo = selectedFile;


    },

    changeUploadThingLabel: function (target) {
        this.uploadFormData.label = target.value;
    },


  }
});
