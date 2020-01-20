const Donations = {
  index: {
    handler: function(request, h) {
      return h.file('./app/views/main.html');
    }
  }
};

module.exports = Donations;
