$(document).ready(function () {
  // Toggle hidden attribute of language elements
  $('input[name=language]').change(function (e) {
    $('.disclaimer').each(function () {
      this.hidden = !(this.hidden === true);
    });
  });
});
